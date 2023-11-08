import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { KeyboardAvoidingView, View } from "react-native";
import { Button } from "../src/components/button";
import { VerificationCodeInput } from "../src/components/verification-code-input";
import { useForm } from "react-hook-form";
import { Header } from "../src/components/header";

export default function TwoFactorAuth() {
  const { control, handleSubmit, setFocus } = useForm();

  const onSubmit = (data) => {
    const convertedValues = Object.values(data).join("");

    Alert.alert(convertedValues);
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
      <Header />
      <ScrollView contentContainerStyle={{ paddingTop: 48 }} bounces={false}>
        <View className="flex-1 bg-white">
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
          <View className="my-4">
            <Text className="text-center mt-4 text-md text-gray-500">
              Didn't receive OTP?
            </Text>
            <TouchableOpacity>
              <Text className="underline text-center">Resend code</Text>
            </TouchableOpacity>
          </View>
          <Button
            testID="sign-in-button"
            className="m-4 mt-6"
            onPress={handleSubmit(onSubmit)}
          >
            Verify
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
