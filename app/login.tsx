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

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChangeFormText = (key: keyof typeof form, value: string) =>
    setForm((state) => ({ ...state, [key]: value }));

  const onSubmit = async () => {
    setIsLoading(true);
    await login(form);
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
              placeholder="example@gmail.com"
              label="E-mail"
              value={form.email}
              onChangeText={(value) => handleChangeFormText("email", value)}
              keyboardType="email-address"
              editable={!isLoading}
            />
            <View className="mt-4">
              <TextInput
                placeholder="******"
                label="Password"
                value={form.password}
                onChangeText={(value) =>
                  handleChangeFormText("password", value)
                }
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
            onPress={onSubmit}
            isLoading={isLoading}
          >
            Sign In
          </Button>
          <View>
            <Text className="text-center mt-4 text-md text-gray-500">
              Don't have an account?{" "}
              <Pressable onPress={() => router.push("sign-up")}>
                <Text
                  className="text-primary mt-4 text-right underline"
                  testID="sign-up-button"
                >
                  Sign Up
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
