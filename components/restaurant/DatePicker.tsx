import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handlePress = () => {
    setShowPicker(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View className="flex-1 w-1/2 rounded-lg">
      <TouchableOpacity onPress={handlePress} className="bg-[#f49b33] p-2 rounded-lg">
        <Text className="text-white text-center font-semibold">{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          accentColor="#f49b33"
          value={date}
          mode="date"
          display="default"
          minimumDate={new Date()}
          maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          onChange={onChange}
        />
      )}
    </View>
  );
}
