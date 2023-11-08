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

const variantStyles = {
  default: "items-center justify-center bg-primary py-4 rounded-2xl",
  disabled: "opacity-50",
};

export const Button = ({ children, isLoading, disabled, ...props }: Props) => {
  return (
    <TouchableOpacity
      className={`
        ${variantStyles.default}
        ${disabled ? variantStyles.disabled : ""}
        `}
      disabled={isLoading || disabled}
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
