import { ReactNode } from "react";
import { TextInput as Input, Text, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  rightComponent?: ReactNode;
  label: string;
};

export const TextInput = ({
  rightComponent,
  label,
  className,
  ...props
}: Props) => {
  return (
    <View className="gap-2">
      <Text className="text-md text-black">{label}</Text>
      <View className="flex-row items-center bg-gray-200 p-4 rounded-md ">
        <Input placeholderTextColor="gray" className="flex-1" {...props} />
        {rightComponent}
      </View>
    </View>
  );
};
