import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileHeader({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  const card = useThemeColor({}, "surface");
  const primary = useThemeColor({}, "primary");
  const onPrimary = useThemeColor({}, "onPrimary");
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <View style={[styles.card, { backgroundColor: card }]}>
      <View style={[styles.avatar, { backgroundColor: primary }]}>
        <Text style={[styles.avatarTxt, { color: onPrimary }]}>{initials}</Text>
      </View>
      <View style={{ gap: 4 }}>
        <Text style={[styles.name]}>{name}</Text>
        <Text style={[styles.role]}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
  },
  avatarTxt: {
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  role: {
    fontSize: 12,
  },
});
