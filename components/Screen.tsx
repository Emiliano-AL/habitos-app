import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./themed-view";

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  const bg = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();
  return (
    <ThemedView
      style={[
        styles.screen,
        {
          backgroundColor: bg,
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 16,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {children}
    </ThemedView>
  );
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
