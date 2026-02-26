import { StyleSheet, View } from "react-native";

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
});
