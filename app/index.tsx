import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-purple-500 text-4xl font-bold">Jingalala.</Text>

      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
