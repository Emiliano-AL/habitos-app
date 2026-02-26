import HabitCard from "@/components/HabitCard";
import HabitGreeting from "@/components/HabitGreeting";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const habits = [
    {
      id: 1,
      title: "Read 10 pages",
      streak: 10,
      isCompleted: true,
    },
    {
      id: 2,
      title: "Exercise 30 minutes",
      streak: 10,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Drink 2 liters of water",
      streak: 10,
      isCompleted: true,
    },
  ];

  return (
    <View style={styles.container}>
      <HabitGreeting name="John" />
      <View style={{ gap: 12 }}>
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            title={habit.title}
            streak={habit.streak}
            isCompleted={habit.isCompleted}
          />
        ))}
      </View>
    </View>
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
});
