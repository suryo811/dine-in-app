import { auth } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Formik } from "formik";
import { Alert, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const handleSignUp = async (values: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Set display name
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      // get id token
      const idToken = await userCredential.user.getIdToken();

      // Store user data in AsyncStorage
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: values.name,
        idToken: idToken,
        loginTime: new Date().toISOString(),
      };

      await AsyncStorage.setItem("userToken", idToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("isLoggedIn", "true");

      console.log(await AsyncStorage.getItem("userData"));

      // Navigate to home
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-[#2b2b2b] flex-1">
      <KeyboardAwareScrollView
        extraHeight={120}
        extraScrollHeight={Platform.OS === "android" ? 100 : 0}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 50,
          paddingTop: 60,
          minHeight: "100%",
        }}
      >
        <View className="items-center justify-center">
          <Image
            source={require("@/assets/images/signup.png")}
            style={{
              height: 220,
              width: 220,
              borderRadius: 100,
            }}
          />
          <Formik initialValues={{ email: "", password: "", name: "" }} onSubmit={handleSignUp}>
            {({ handleChange, handleSubmit, handleBlur, values }) => {
              return (
                <View className="w-3/4 mt-10">
                  {/* Name */}
                  <Text className="text-[#f49b33] text-xl font-bold mt-1">Name</Text>
                  <TextInput
                    className="bg-gray-500 p-3 rounded-md mt-1 text-lg"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholder="Enter your name"
                  />

                  {/* Email */}
                  <Text className="text-[#f49b33] text-xl font-bold mt-4">Email</Text>
                  <TextInput
                    className="bg-gray-500 p-3 rounded-md mt-1 text-lg"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Enter your email"
                  />

                  {/* Password */}
                  <Text className="text-[#f49b33] text-xl font-bold mt-4">Password</Text>
                  <TextInput
                    className="bg-gray-500 p-3 rounded-md mt-1 text-lg"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Enter your password"
                  />

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    className="bg-[#f49b33] p-3 rounded-md mt-10 "
                    onPress={() => handleSubmit()}
                  >
                    <Text className="text-center text-lg font-bold">Sign Up</Text>
                  </TouchableOpacity>

                  {/* Already have an account? */}
                  <View className="flex-row justify-center mt-3">
                    <Text className="text-lg text-white">Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/signin")}>
                      <Text className="text-[#f49b33] text-lg font-semibold"> Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
