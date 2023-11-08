import {
  Control,
  Controller,
  FieldValues,
  UseFormSetFocus,
  useController,
  useForm,
} from "react-hook-form";
import { TextInput, View } from "react-native";

export type VerificationCodeInputSchema = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

type Props = {
  control: Control<VerificationCodeInputSchema>;
  setFocus: UseFormSetFocus<FieldValues>;
};

export const VerificationCodeInput = ({ control, setFocus }: Props) => {
  return (
    <View className="gap-x-4 flex-row justify-center">
      {Array.from({ length: 4 }).map((_, index) => (
        <View className="bg-gray-200 rounded-lg overflow-hidden justify-center items-center">
          <Controller
            name={String(index) as keyof VerificationCodeInputSchema}
            rules={{
              required: "Required",
              pattern: {
                value: /[0-9]/g,
                message: "Field is invalid",
              },
            }}
            control={control}
            render={({ field: { ref, value, onChange } }) => (
              <TextInput
                className="px-5 py-2 pb-4 text-lg border-2 border-transparent focus:border-primary rounded-lg "
                ref={ref}
                textAlign="center"
                keyboardType="number-pad"
                caretHidden
                maxLength={1}
                defaultValue="-"
                returnKeyType="done"
                value={value}
                onKeyPress={(e) => {
                  const value = e.nativeEvent.key;
                  if (value.match(/[0-9]/)) {
                    onChange(value);
                    if (index < 3) {
                      setFocus(String(index + 1));
                    }
                  } else {
                    onChange("-");
                  }
                }}
              />
            )}
          />
        </View>
      ))}
    </View>
  );
};
