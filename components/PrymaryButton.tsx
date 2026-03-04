import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}: PrimaryButtonProps) {
  const bg = useThemeColor({}, "primary");
  const onBg = useThemeColor({}, "onPrimary");
  const border = useThemeColor({}, "border");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: pressed ? bg : bg },
        { borderColor: border },
        style,
        pressed && { transform: [{ scale: 0.98 }], elevation: 2 },
      ]}
    >
      <ThemedText type="defaultSemiBold" style={styles.label}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    minWidth: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
});
