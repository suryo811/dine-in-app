import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FindSlots({
  date,
  selectedNumber,
  slotsData,
  selectedSlot,
  setSelectedSlot,
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
            <TouchableOpacity onPress={() => setSlotsVisible(!slotsVisible)}>
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
