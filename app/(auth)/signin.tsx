import { router } from "expo-router";
import { Formik } from "formik";
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const handleSignUp = (values: any) => {
    console.log(values);
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
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
          <Formik initialValues={{ email: "", password: "", name: "" }} onSubmit={handleSignUp}>
            {({ handleChange, handleSubmit, handleBlur, values }) => {
              return (
                <View className="w-3/4 mt-12">
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
                    <Text className="text-center text-lg font-bold">Sign In</Text>
                  </TouchableOpacity>

                  {/* Already have an account? */}
                  <View className="flex-row justify-center mt-3">
                    <Text className="text-lg text-white">Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                      <Text className="text-[#f49b33] text-lg font-semibold"> Sign Up</Text>
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
export default SignIn;
