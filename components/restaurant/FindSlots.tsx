import { db } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function FindSlots({
  date,
  selectedNumber,
  slotsData,
  selectedSlot,
  setSelectedSlot,
  restaurantName,
}: any) {
  const [slotsVisible, setSlotsVisible] = useState(false);

  const handleSlotPress = (slot: any) => {
    let prevSlot = selectedSlot;
    if (prevSlot == slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleBookSlot = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        Alert.alert("Please login to book a slot");
        return;
      }
      const userDataObj = JSON.parse(userData);
      const userEmail = userDataObj.email;

      if (!userEmail) {
        Alert.alert("Please login to book a slot");
        return;
      }

      const docRef = await addDoc(collection(db, "bookings"), {
        userEmail,
        slot: selectedSlot,
        date: date.toISOString(),
        guestCount: selectedNumber,
        restaurantName: restaurantName,
      });

      Alert.alert("Slot booked successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 ">
      <View className={`flex-1 ${selectedSlot !== null && "flex-row"}`}>
        <View className={`${selectedSlot !== null && "flex-1"}`}>
          <TouchableOpacity onPress={() => setSlotsVisible(!slotsVisible)}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 m-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>

        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity onPress={handleBookSlot}>
              <Text className="text-center text-white text-lg font-semibold bg-[#f49b33] p-2 m-2 rounded-lg">
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {slotsVisible && (
        <View className="flex-wrap flex-row mx-4 p-4 bg-[#474747] rounded-lg">
          {slotsData.map((slot: any, index: any) => (
            <TouchableOpacity
              key={index}
              className={`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${
                selectedSlot && selectedSlot !== slot ? "opacity-50" : "opacity-100"
              }`}
              onPress={() => handleSlotPress(slot)}
              disabled={selectedSlot == slot || selectedSlot == null ? false : true}
            >
              <Text className="text-white font-bold">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
