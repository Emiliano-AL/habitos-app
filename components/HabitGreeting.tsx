import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import { ThemedText } from "./themed-text";

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
        <ThemedText style={styles.greeting}>
          {greeting}, {name}!
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {dateNow.toLocaleDateString()}
        </ThemedText>
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
