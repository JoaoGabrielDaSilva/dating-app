import { Alert, Text } from "react-native";
import { KeyboardAvoidingView, View } from "react-native";
import { Button } from "../src/components/button";
import { VerificationCodeInput } from "../src/components/verification-code-input";
import { useForm } from "react-hook-form";

export default function TwoFactorAuth() {
  const { control, handleSubmit, setFocus } = useForm();

  const onSubmit = (data) => {
    const convertedValues = Object.values(data).join("");

    Alert.alert(convertedValues);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View className="flex-1 light:bg-white justify-center">
        <View>
          <Text className="text-center text-3xl">Verify Code</Text>
          <Text className="text-center mt-4 text-md text-gray-500">
            Please enter the code just sent to email
          </Text>
          <Text className="text-center mt-4 text-md text-primary">
            example@gmail.com
          </Text>
        </View>

        <View className="mx-4 mt-10">
          <VerificationCodeInput control={control} setFocus={setFocus} />
        </View>

        <Button
          testID="sign-in-button"
          className="m-4 mt-6"
          onPress={handleSubmit(onSubmit)}
        >
          Verify
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
