import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center">
          <Image
            source={require("@/assets/images/dinetimelogo.png")}
            style={{ height: 300, width: 300 }}
          />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="bg-[#f49b33] text-black rounded-lg p-4 my-2"
            >
              <Text className="text-lg font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="bg-[#2b2b2b] border border-[#f49b33] rounded-lg p-4 my-2"
            >
              <Text className="text-lg text-[#f49b33] font-semibold text-center">Guest User</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4">
              <Text className="text-lg text-white">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Text className="text-[#f49b33] text-lg font-semibold"> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-1">
          <Image
            source={require("@/assets/images/Frame.png")}
            className="w-full h-full"
            resizeMode="contain"
          ></Image>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
