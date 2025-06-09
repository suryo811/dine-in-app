import { db } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const [userEmail, setUserEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const userDataObj = JSON.parse(userData || "{}");
        setUserEmail(userDataObj.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    // fetch bookings of the user
    const fetchBookings = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);
        const bookingCollectionRef = collection(db, "bookings");
        const q = query(bookingCollectionRef, where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const bookingList: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const renderBookingItem = ({ item }: { item: any }) => {
    const bookingDate = new Date(item.date);

    return (
      <View className="bg-[#474747] p-4 m-2 rounded-lg">
        <Text className="text-[#f49b33] text-xl font-bold mb-2">{item.restaurantName}</Text>
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-white font-semibold">Date:</Text>
          <Text className="text-white">{bookingDate.toDateString()}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-white font-semibold">Time:</Text>
          <Text className="text-white">{item.slot}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-white font-semibold">Guests:</Text>
          <Text className="text-white">{item.guestCount} people</Text>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View className="flex-1 justify-center items-center mt-20">
      <Text className="text-white text-lg text-center">No bookings found</Text>
      <Text className="text-gray-400 text-center mt-2">Your booking history will appear here</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {userEmail ? (
        <View className="flex-1">
          <Text className="text-[#f49b33] text-2xl font-bold text-center py-4">
            Booking History
          </Text>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg">Loading bookings...</Text>
            </View>
          ) : (
            <FlatList
              data={bookings}
              renderItem={renderBookingItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={renderEmptyComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg text-center">Please login to continue</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
