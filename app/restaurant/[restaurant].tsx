import DatePicker from "@/components/restaurant/DatePicker";
import FindSlots from "@/components/restaurant/FindSlots";
import GuestPicker from "@/components/restaurant/GuestPicker";
import { db } from "@/config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Linking, ScrollView, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Restaurant() {
  const { restaurantInfo } = useLocalSearchParams();
  const restaurant = JSON.parse(restaurantInfo as string);

  const [restaurantData, setRestaurantData] = useState<any>(restaurant);
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [slotsData, setSlotsData] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Date and number of guests
  const [date, setDate] = useState<Date>(new Date());
  const [selectedNumber, setSelectedNumber] = useState(2);

  const carouselRef = useRef<any>(null);

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenMap = async () => {
    try {
      const url = `https://maps.app.goo.gl/Q2zaTkKceEGQYWxn6`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Cannot open URL");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSlotsData = async () => {
    try {
      const slotsRef = collection(db, "slots");
      const q = query(slotsRef, where("ref_id", "==", restaurantDocRef));
      const snapshot = await getDocs(q);
      const slotsData = snapshot.docs.map((doc) => doc.data());
      setSlotsData(slotsData[0]?.slot);
    } catch (error) {
      console.error(error);
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
          source={{ uri: item }}
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

  // Add pagination dots component
  const renderPaginationDots = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? "#f49b33" : "#666",
              marginHorizontal: 4,
            }}
          />
        ))}
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

              {/* Carousel */}
              <View style={{ position: "relative" }}>
                <Carousel
                  ref={carouselRef}
                  loop
                  width={width - 20}
                  height={200}
                  autoPlay={false}
                  data={carouselData}
                  scrollAnimationDuration={1000}
                  autoPlayInterval={3000}
                  renderItem={renderCarouselItem}
                  onSnapToItem={(index) => setCurrentIndex(index)}
                  style={{
                    width: width,
                    alignSelf: "center",
                  }}
                />
              </View>
              {/* Pagination Dots */}
              {renderPaginationDots()}
            </View>
          )}
        </View>

        <View className="flex-1 flex-row mt-2 p-2 gap-2">
          <Ionicons onPress={handleOpenMap} name="location-sharp" size={25} color="#f49b33" />
          <Text onPress={handleOpenMap} className=" text-white underline">
            {restaurantData.address}
          </Text>
        </View>

        <View className="flex-1 flex-row p-2 gap-2">
          <Ionicons name="time" size={24} color="#f49b33" />
          <Text className="text-white font-semibold">
            {restaurantData.opening} - {restaurantData.closing}
          </Text>
        </View>

        <View className="flex-1 border-2 border-[#f49b33] rounded-lg m-2 p-4">
          {/* Date Picker */}
          <View className="flex-row justify-between items-center gap-2">
            <Ionicons name="calendar" size={24} color="#f49b33" />
            <Text className="text-white font-semibold">Select Date</Text>
            <View className="flex-1" />
            <DatePicker date={date} setDate={setDate} />
          </View>

          {/* Number of guests */}
          <View className="flex-row  mt-4 py-2 rounded-lg items-center gap-2">
            <Ionicons name="people" size={24} color="#f49b33" />
            <Text className="text-white font-semibold">Select number of guests</Text>
            <View className="flex-1" />
            <GuestPicker selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
          </View>
        </View>

        <View className="flex-1">
          <FindSlots
            date={date}
            selectedNumber={selectedNumber}
            slotsData={slotsData}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
