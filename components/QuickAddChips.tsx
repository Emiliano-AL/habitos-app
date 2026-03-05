import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

const SUGGESTED_HABITS = [
  "Read 10 pages",
  "Exercise 30 minutes",
  "Drink 2 liters of water",
  "Sleep 8 hours",
  "Meditate 10 minutes",
  "Read 10 pages",
  "Exercise 30 minutes",
  "Drink 2 liters of water",
  "Sleep 8 hours",
];

export default function QuickAddChips({
  onPick,
}: {
  onPick: (habit: string) => void;
}) {
  const surface = useThemeColor({}, "surface");
  const border = useThemeColor({}, "border");
  const primary = useThemeColor({}, "primary");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
    >
      {SUGGESTED_HABITS.map((habit) => (
        <Pressable
          key={habit}
          onPress={() => onPick(habit)}
          style={({ pressed }) => [
            styles.chip,
            {
              backgroundColor: surface,
              borderColor: border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          android_ripple={{ color: primary, borderless: true }}
        >
          <ThemedText type="defaultSemiBold">{habit}</ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
});
