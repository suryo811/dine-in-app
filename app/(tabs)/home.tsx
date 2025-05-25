import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b" }}>
      <View className="items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg p-4 shadow-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-white text-2xl font-bold">Welcome to </Text>
              <LinearGradient
                colors={["#FF5F6D", "#FFC371"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 5, padding: 3 }}
              >
                <Text className="text-2xl font-bold">Dine Time</Text>
              </LinearGradient>
            </View>
            <Image className="w-10 h-10" source={require("../../assets/images/icon.png")} />
          </View>
        </View>
      </View>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/homeBanner.png")}
          className="h-52 my-4 w-full items-center justify-center"
        ></ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
