import { ReactNode, forwardRef } from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput as Input, Text, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  rightComponent?: ReactNode;
  label: string;
  name: string;
  control: Control<any>;
};

export const TextInput = ({
  rightComponent,
  label,
  name,
  control,
  style,
  ...props
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, ref, onChange, ...fieldProps },
        fieldState: { error },
      }) => (
        <View className="gap-2" style={style}>
          <Text className="text-md text-black">{label}</Text>
          <View
            className={`flex-row items-center p-4 rounded-md ${
              !error ? "bg-gray-200" : "bg-red-100 border-[1px] border-red-500"
            }`}
          >
            <Input
              ref={ref}
              placeholderTextColor="gray"
              className="flex-1"
              value={value}
              onChangeText={onChange}
              {...props}
              {...fieldProps}
            />
            {rightComponent}
          </View>
          {error?.message ? (
            <Text className="text-red-500">{error?.message}</Text>
          ) : null}
        </View>
      )}
    />
  );
};
