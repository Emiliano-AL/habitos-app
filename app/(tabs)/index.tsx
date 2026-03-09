import HabitCard from "@/components/HabitCard";
import HabitGreeting from "@/components/HabitGreeting";
import ProfileHeader from "@/components/ProfileHeader";
import PrimaryButton from "@/components/PrymaryButton";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { useHabits } from "@/context/HabitsContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// type Habit = {
//   id: string;
//   title: string;
//   streak: number;
//   isCompleted: boolean;
//   priority: "low" | "medium" | "high";
// };

// const initialHabits: Habit[] = [
//   {
//     id: `h${Date.now()}`,
//     title: "Read 10 pages",
//     streak: 10,
//     isCompleted: true,
//     priority: "low",
//   },
//   {
//     id: `h${Date.now()}`,
//     title: "Exercise 30 minutes",
//     streak: 10,
//     isCompleted: false,
//     priority: "medium",
//   },
//   {
//     id: `h${Date.now()}`,
//     title: "Drink 2 liters of water",
//     streak: 10,
//     isCompleted: true,
//     priority: "high",
//   },
// ];

export default function HomeScreen() {
  const { loading, habits, addHabit, toggleHabit } = useHabits();

  // const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabit, setNewHabit] = useState<string>("");
  const insets = useSafeAreaInsets();
  // const [clicks, setClicks] = useState(0);
  // const [text, setText] = useState("Hello, world!");
  // const [visible, setVisible] = useState(true);

  const border = useThemeColor({}, "border");
  const surface = useThemeColor({}, "surface");
  const primary = useThemeColor({}, "primary");
  // const onPrimary = useThemeColor({}, "onPrimary");
  const muted = useThemeColor({}, "muted");
  const text = useThemeColor({}, "text");
  // const muted = useThemeColor({}, "muted");

  // const toggle = useCallback((id: string) => {
  //   setHabits(
  //     habits.map((h) => {
  //       if (h.id !== id) return h;
  //       const completed = !h.isCompleted;
  //       return {
  //         ...h,
  //         isCompleted: completed,
  //         streak: completed ? h.streak + 1 : Math.max(0, h.streak - 1),
  //       };
  //     }),
  //   );
  // }, []);

  const handleAddHabit = useCallback(() => {
    const title = newHabit.trim();
    if (!title) return;
    addHabit(newHabit);
    setNewHabit("");
  }, [newHabit, addHabit]);

  // const handleAddHabit = useCallback(() => {
  //   const title = newHabit.trim();
  //   if (!title) return;
  //   setHabits((prev) => [
  //     {
  //       id: `h${Date.now()}`,
  //       title,
  //       streak: 0,
  //       isCompleted: false,
  //       priority: "low",
  //     },
  //     ...prev,
  //   ]);
  //   setNewHabit("");
  // }, [newHabit]);

  const total = habits.length;
  const completed = useMemo(() => {
    const today = new Date().toDateString();
    return habits.filter(
      (h) => h.lastDoneAt && new Date(h.lastDoneAt).toDateString() === today,
    ).length;
  }, [habits]);

  // const keyExtractor = useCallback((item: Habit) => item.id, []);
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      const isToday = item.lastDoneAt
        ? isSameDay(new Date(item.lastDoneAt), new Date())
        : false;
      return (
        <HabitCard
          key={item.id}
          title={item.title}
          streak={item.streak}
          isCompleted={item.isCompleted}
          priority={item.priority}
          onToggle={() => toggleHabit(item.id, new Date())}
        />
      );
    },
    [toggleHabit],
  );

  const itemSeparator = () => <View style={{ height: 12 }} />;
  const ListEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>No habits found</ThemedText>
    </View>
  );

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={primary} />
      </Screen>
    );
  }

  const isSameDay = (a: string | number | Date, b: string | number | Date) => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    return aDate.toDateString() === bDate.toDateString();
  };

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
        <PrimaryButton
          title="Add"
          onPress={handleAddHabit}
          disabled={!newHabit.trim()}
        />
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 22, gap: 12 }}
      >
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
      </ScrollView> */}
      <FlatList
        data={habits}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ paddingBottom: insets.bottom + 22, gap: 12 }}
        initialNumToRender={8}
        windowSize={10}
        showsVerticalScrollIndicator={false}
      />
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
