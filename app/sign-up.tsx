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
import { signUp } from "../src/services/auth/sign-up";

const formSchema = z
  .object({
    name: z
      .string({ required_error: "Informe um nome" })
      .min(3, { message: "O nome deve conter pelo menos 3 caractéres" }),
    email: z
      .string({ required_error: "Informe um e-mail" })
      .email({ message: "Informe um e-mail válido" }),
    password: z
      .string({ required_error: "Informe uma senha" })
      .min(6, { message: "A senha deve conter pelo menos 6 caractéres" }),
    confirmPassword: z.string({
      required_error: "Informe a confirmação da senha",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "A senha de confirmação é divergente da senha informada",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function SignUp() {
  const { control, handleSubmit, setFocus } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async ({ name, email, password }: FormData) => {
    setIsLoading(true);
    await signUp({
      name,
      email,
      password,
    });
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
            <Text className="text-center text-2xl">Create Account</Text>
            <Text className="text-center m-4 text-md text-gray-500">
              Fill your information below or register with your social account
            </Text>
          </View>

          <View className="mx-6 mt-10 gap-y-2">
            <TextInput
              name="name"
              control={control}
              placeholder="John Doe"
              label="Name"
              editable={!isLoading}
              returnKeyType="next"
              onSubmitEditing={() => setFocus("email")}
            />
            <TextInput
              name="email"
              control={control}
              placeholder="example@gmail.com"
              label="E-mail"
              editable={!isLoading}
              returnKeyType="next"
              onSubmitEditing={() => setFocus("password")}
              autoComplete="off"
              autoCapitalize="none"
            />
            <TextInput
              name="password"
              aria-label="password"
              control={control}
              placeholder="******"
              label="Password"
              keyboardType="visible-password"
              returnKeyType="next"
              onSubmitEditing={() => setFocus("confirmPassword")}
              autoComplete="off"
              autoCapitalize="none"
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
            <TextInput
              name="confirmPassword"
              aria-label="confirmPassword"
              control={control}
              placeholder="******"
              label="Confirm Password"
              keyboardType="visible-password"
              autoComplete="off"
              autoCapitalize="none"
              blurOnSubmit
              editable={!isLoading}
              secureTextEntry={secureTextEntry}
            />
          </View>
        </View>

        <Button
          testID="sign-in-button"
          className="m-4 mt-6"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          Sign Up
        </Button>
        <View className="flex-row items-center mt-4 self-center">
          <Text className="text-center text-md text-gray-500">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("login")}>
            <Text className="text-primary text-right underline">Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
