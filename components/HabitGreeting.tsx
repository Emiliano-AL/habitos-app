import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";

export default function HabitGreeting({ name = "sample" }) {
  const dateNow = new Date();
  const hours = dateNow.getHours();
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
        ? "Good Afternoon"
        : "Good Evening";
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          {greeting}, {name}!
        </Text>
        <Text style={styles.subtitle}>{dateNow.toLocaleDateString()}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
  },
});
