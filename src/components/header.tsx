import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export const Header = () => {
  const router = useRouter();

  return (
    <View className="flex-row p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <View className="border-[1px] border-gray-500 rounded-full p-2">
          <Ionicons name="arrow-back" color={colors.black} size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
