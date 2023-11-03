import {
  Pressable,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "../src/components/text-input";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Button } from "../src/components/button";
import { useRouter } from "expo-router";
import { login } from "../src/services/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "Informe um e-mail" })
    .email({ message: "Informe um e-mail válido" }),
  password: z
    .string({ required_error: "Informe uma senha" })
    .min(6, { message: "A senha deve conter pelo menos 6 caractéres" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await login(data);
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View className="flex-1 light:bg-white justify-center">
          <View>
            <Text className="text-center text-2xl">Sign In</Text>
            <Text className="text-center mt-4 text-md text-gray-500">
              Hi! Welcome back, you've been missed
            </Text>
          </View>

          <View className="mx-4 mt-10">
            <TextInput
              name="email"
              control={control}
              placeholder="example@gmail.com"
              label="E-mail"
              keyboardType="email-address"
              editable={!isLoading}
            />
            <View className="mt-4">
              <TextInput
                name="password"
                control={control}
                placeholder="******"
                label="Password"
                keyboardType="visible-password"
                rightComponent={
                  <Pressable
                    onPress={() => setSecureTextEntry((state) => !state)}
                  >
                    <Ionicons
                      testID="password-eye-icon"
                      name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                      color={colors.black}
                      size={18}
                    />
                  </Pressable>
                }
                editable={!isLoading}
                secureTextEntry={secureTextEntry}
              />
            </View>
            <Pressable onPress={() => router.push("forgot-password")}>
              <Text className="text-primary mt-4 text-right underline">
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <Button
            testID="sign-in-button"
            className="m-4 mt-6"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            Sign In
          </Button>
          <View className="flex-row items-center mt-4 self-center">
            <Text className="text-center text-md text-gray-500">
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("sign-up")}>
              <Text
                className="text-primary text-right underline"
                testID="sign-up-button"
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
