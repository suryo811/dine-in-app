import { auth } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const userDataObj = JSON.parse(userData || "{}");
      setUserEmail(userDataObj.email);
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("isLoggedIn");
    await signOut(auth);
    router.replace("/(auth)/signin");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2b2b2b]">
      {userEmail ? (
        <View className="flex-1 justify-center gap-4">
          <Text className="text-white text-2xl font-bold">Email: {userEmail}</Text>
          <TouchableOpacity onPress={handleLogout} className="bg-red-500 p-2 rounded-md">
            <Text className="text-white text-2xl font-bold text-center">Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-center gap-4">
          <Text className="text-white text-2xl font-bold">Please login to continue</Text>
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/signin")}
            className="bg-[#f49b33] p-2 rounded-md"
          >
            <Text className="text-white text-2xl font-bold text-center">Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
