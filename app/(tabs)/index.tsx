import HabitCard from "@/components/HabitCard";
import HabitGreeting from "@/components/HabitGreeting";
import ProfileHeader from "@/components/ProfileHeader";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type Habit = {
  id: string;
  title: string;
  streak: number;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
};

const initialHabits: Habit[] = [
  {
    id: 1,
    title: "Read 10 pages",
    streak: 10,
    isCompleted: true,
    priority: "low",
  },
  {
    id: 2,
    title: "Exercise 30 minutes",
    streak: 10,
    isCompleted: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Drink 2 liters of water",
    streak: 10,
    isCompleted: true,
    priority: "high",
  },
];
export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabit, setNewHabit] = useState<string>("");

  // const [clicks, setClicks] = useState(0);
  // const [text, setText] = useState("Hello, world!");
  // const [visible, setVisible] = useState(true);

  const border = useThemeColor({}, "border");
  const surface = useThemeColor({}, "surface");
  const primary = useThemeColor({}, "primary");
  const onPrimary = useThemeColor({}, "onPrimary");
  const muted = useThemeColor({}, "muted");
  const text = useThemeColor({}, "text");
  // const muted = useThemeColor({}, "muted");

  const toggle = useCallback((id: string) => {
    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h;
        const completed = !h.isCompleted;
        return {
          ...h,
          isCompleted: completed,
          streak: completed ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      }),
    );
  }, []);

  const handleAddHabit = useCallback(() => {
    const title = newHabit.trim();
    if (!title) return;
    setHabits((prev) => [
      {
        id: `h${Date.now()}`,
        title,
        streak: 0,
        isCompleted: false,
        priority: "low",
      },
      ...prev,
    ]);
    setNewHabit("");
  }, [newHabit]);

  const total = habits.length;
  const completed = useMemo(
    () => habits.filter((h) => h.isCompleted).length,
    [habits],
  );

  return (
    <Screen>
      <ProfileHeader name="John Doe" role="Software Engineer" />
      <HabitGreeting name="John" />
      <View style={[styles.row, { alignItems: "center" }]}>
        <TextInput
          value={newHabit}
          onChangeText={setNewHabit}
          placeholderTextColor={muted}
          onSubmitEditing={handleAddHabit}
          placeholder="Add a new habit"
          style={[
            styles.input,
            { borderColor: border, color: text, backgroundColor: surface },
          ]}
        />
        <Pressable
          style={[styles.addButton, { backgroundColor: primary }]}
          onPress={handleAddHabit}
          disabled={!newHabit.trim()}
        >
          <ThemedText type="defaultSemiBold">Add</ThemedText>
        </Pressable>
      </View>
      <View style={{ gap: 12 }}>
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            title={habit.title}
            streak={habit.streak}
            isCompleted={habit.isCompleted}
            priority={habit.priority}
            onToggle={() => toggle(habit.id)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  image: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
