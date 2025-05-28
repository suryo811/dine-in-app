import { db } from "@/config/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    const data: any[] = res.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setRestaurants(data);
  };

  const RestaurantItem = React.memo(({ item }: any) => {
    return (
      <TouchableOpacity
        className="bg-[#5f5f5f] w-70 h-70 p-4 rounded-lg m-2"
        style={{ elevation: 6 }}
      >
        <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg" resizeMode="cover" />
        <Text className="text-white text-xl font-bold mt-2 truncate">{item.name}</Text>
        <Text className="text-white text-sm mt-1 truncate">{item.address}</Text>
        <Text className="text-white text-sm mt-1">
          {item.opening} - {item.closing}
        </Text>
      </TouchableOpacity>
    );
  });

  const renderItem = ({ item }: any) => <RestaurantItem item={item} />;

  // filter restaurants with id > 2
  const filteredRestaurants = restaurants.filter((restaurant) => restaurant.id > 2);

  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b" }}>
      <View className="items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg p-4" style={{ elevation: 6 }}>
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
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/homeBanner.png")}
          className="h-52 mt-1 mb-4 w-full bg-[#2b2b2b] items-center justify-center"
        />

        <View className="px-4 py-2 items-start ">
          <Text className="text-white text-3xl font-bold">Special Offers</Text>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={filteredRestaurants}
            horizontal
            keyExtractor={(item) => item.docId}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={renderItem}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            windowSize={10}
          />
        ) : (
          <ActivityIndicator animating={true} size="large" color="#fb9b33" />
        )}

        <View className="px-4 py-2 items-start mt-4">
          <Text className="text-[#fb9b33] text-3xl font-bold">Our Restaurants</Text>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            horizontal
            keyExtractor={(item) => item.docId}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
            renderItem={renderItem}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            windowSize={10}
          />
        ) : (
          <ActivityIndicator animating={true} size="large" color="#fb9b33" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
