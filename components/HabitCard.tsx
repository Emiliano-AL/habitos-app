import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HabitCardProps = {
  title: string;
  streak: number;
  isCompleted?: boolean;
  priority: "low" | "medium" | "high";
  onToggle?: () => void;
};

const priorityStyles = {
  low: {
    backgroundColor: "#ECFCCB",
    color: "#3f6212",
  },
  medium: {
    backgroundColor: "#FEF9C3",
    color: "#854d0e",
  },
  high: {
    backgroundColor: "#FEE7E8",
    color: "#9f1239",
  },
};

export default function HabitCard({
  title,
  streak,
  isCompleted,
  priority = "low",
  onToggle,
}: HabitCardProps) {
  const surface = useThemeColor({}, "surface");
  const success = useThemeColor({}, "success");
  const border = useThemeColor({}, "border");

  const p = priorityStyles[priority];
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: surface,
          opacity: pressed ? 0.8 : 1,
          borderColor: isCompleted ? success : border,
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>

        <Text
          style={[
            styles.badge,
            { backgroundColor: p.backgroundColor, color: p.color },
          ]}
        >
          {priority}
        </Text>
      </View>
      <View style={styles.row}>
        {isCompleted ? (
          <Text style={styles.badge}>Done</Text>
        ) : (
          <Text style={styles.badge}>Not Done</Text>
        )}
        <Text style={styles.streak}>{streak} days</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDone: {
    backgroundColor: "#E2F9E1",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  badge: {
    fontSize: 12,
    color: "#fff",
  },
  streak: {
    fontSize: 12,
    color: "#64748B",
  },
});
