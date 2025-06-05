import { Text, TouchableOpacity, View } from "react-native";

export default function GuestPicker({ selectedNumber, setSelectedNumber }: any) {
  const decrement = () => {
    if (selectedNumber > 1) {
      setSelectedNumber(selectedNumber - 1);
    }
  };

  const increment = () => {
    if (selectedNumber < 9) {
      setSelectedNumber(selectedNumber + 1);
    }
  };

  return (
    <View className="flex-row rounded-lg overflow-hidden">
      <TouchableOpacity
        onPress={decrement}
        className="bg-[#f49b33] px-4 p-2 active:bg-[#e8892d] rounded-l-lg border border-[#f49b33]"
        disabled={selectedNumber <= 1}
        accessibilityLabel="Decrease guest count"
      >
        <Text className="text-white text-lg font-semibold">-</Text>
      </TouchableOpacity>

      <View className="bg-[#2a2a2a] px-6 p-2 justify-center border-t border-b border-[#f49b33]">
        <Text className="text-white text-lg font-medium text-center">{selectedNumber}</Text>
      </View>

      <TouchableOpacity
        onPress={increment}
        className="bg-[#f49b33] px-4 p-2 active:bg-[#e8892d] rounded-r-lg border border-[#f49b33]"
        disabled={selectedNumber >= 9}
        accessibilityLabel="Increase guest count"
      >
        <Text className="text-white text-lg font-semibold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
