import { db } from "@/config/firebase";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Restaurant() {
  const { restaurantInfo } = useLocalSearchParams();
  const restaurant = JSON.parse(restaurantInfo as string);

  const [restaurantData, setRestaurantData] = useState<any>(restaurant);
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [slotsData, setSlotsData] = useState<any[]>([]);

  const width = Dimensions.get("window").width;
  const restaurantDocRef = doc(db, "restaurants", restaurantData.docId);
  const getCarouselData = async () => {
    try {
      const carouselRef = collection(db, "carousel");
      // const allCarouselData = await getDocs(carouselRef);
      // const carouselData = allCarouselData.docs.map((doc) => doc.data());
      // console.log(carouselData);

      const q = query(carouselRef, where("res_id", "==", restaurantDocRef));
      const snapshot = await getDocs(q);
      const carouselData = snapshot.docs.map((doc) => doc.data());
      const carouselDataImages = carouselData[0].images;
      setCarouselData(carouselDataImages);
      console.log(carouselDataImages);
    } catch (error) {
      console.log(error);
    }
  };

  const getSlotsData = async () => {
    try {
      const slotsRef = collection(db, "slots");
      const q = query(slotsRef, where("ref_id", "==", restaurantDocRef));
      const snapshot = await getDocs(q);
      const slotsData = snapshot.docs.map((doc) => doc.data());

      setSlotsData(slotsData);
      console.log(slotsData);
    } catch (error) {
      console.log(error);
    }
  };

  // Render function for carousel items
  const renderCarouselItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 8,
          overflow: "hidden",
          marginHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: item }} // adjust based on your data structure
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  useEffect(() => {
    getCarouselData();
    getSlotsData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b", flex: 1 }}>
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-3">
          <Text className="text-2xl text-[#f49b33] font-semibold mr-2">{restaurantData.name}</Text>
          <View className="border-b border-[#f49b33]" />

          {/* Carousel Section */}
          {carouselData.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text className="text-lg text-white font-semibold mb-3">Gallery</Text>
              <Carousel
                loop
                width={width - 20}
                height={200}
                autoPlay={true}
                data={carouselData}
                scrollAnimationDuration={1000}
                autoPlayInterval={3000}
                renderItem={renderCarouselItem}
                style={{
                  width: width,
                  alignSelf: "center",
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
