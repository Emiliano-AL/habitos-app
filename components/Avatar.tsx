import { useThemeColor } from "@/hooks/use-theme-color";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function initialsFrom(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

type AvatarProps = {
  name: string;
  size?: number;
  uri?: string | null;
  onPress?: () => void;
};

export default function Avatar({ size = 72, name, uri, onPress }: AvatarProps) {
  const surface = useThemeColor({}, "surface");
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="imagebutton"
      accessibilityLabel="Change profile picture"
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: border,
          }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: border,
            backgroundColor: surface,
          }}
        >
          <Text
            style={[styles.initials, { color: text, fontSize: size * 0.5 }]}
          >
            {initialsFrom(name) || "?"}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  initials: {
    fontWeight: "700",
    fontSize: 24,
  },
});
