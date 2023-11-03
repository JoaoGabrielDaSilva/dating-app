import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "tailwindcss/colors";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
};

export const Button = ({ children, isLoading, ...props }: Props) => {
  return (
    <TouchableOpacity
      className="items-center justify-center bg-primary py-4 rounded-2xl"
      disabled={isLoading}
      {...props}
    >
      {!isLoading ? (
        <Text className="text-white font-medium">{children}</Text>
      ) : (
        <ActivityIndicator size="small" color={colors.white} />
      )}
    </TouchableOpacity>
  );
};
