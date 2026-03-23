import { useThemeColor } from "@/hooks/use-theme-color";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type ExploreCardProps = {
  emoji?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export default function ExploreCard({
  emoji = "🚀",
  title,
  subtitle,
  onPress,
}: ExploreCardProps) {
  const surface = useThemeColor({}, "surface");
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const muted = useThemeColor({}, "muted");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !onPress }}
      style={({ pressed }) => [
        styles.base,
        Platform.OS === "ios" ? styles.ios : styles.android,
        {
          backgroundColor: pressed ? surface : surface,
          borderColor: border,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 20 }} selectable={false}>
          {emoji}
        </Text>

        <View>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>{title}</Text>
          {subtitle && <Text style={{ fontSize: 12 }}>{subtitle}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 180,
    gap: 4,
  },
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  android: {
    elevation: 1,
  },
  title: { fontSize: 14, fontWeight: "600" },
  subtitle: { fontSize: 12 },
});
