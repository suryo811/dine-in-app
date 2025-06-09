import { db } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const [userEmail, setUserEmail] = useState("");
  const [bookings, setBookings] = useState([]);

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

    // fetch bookings of the user
    const fetchBookings = async () => {
      try {
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
      }
    };

    fetchUserEmail();
    fetchBookings();
  }, [userEmail]);

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {userEmail ? (
        <View>
          <Text className="text-white text-2xl font-bold">hi</Text>
        </View>
      ) : (
        <View>
          <Text>Please login to continue</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
