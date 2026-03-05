import { useState } from "react";
import { FlatList, View } from "react-native";

// import { Collapsible } from '@/components/ui/collapsible';
// import { ExternalLink } from '@/components/external-link';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedView } from '@/components/themed-view';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Fonts } from '@/constants/theme';

import QuickAddChips from "@/components/QuickAddChips";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";

export default function TabTwoScreen() {
  const [picked, setPicked] = useState<string[]>([]);
  const onPick = (habit: string) => {
    setPicked((prev) => [...prev, habit]);
  };

  return (
    <Screen>
      <View>
        <ThemedText style={{ fontWeight: "700", fontSize: 18 }}>
          Fast add habits
        </ThemedText>

        <QuickAddChips onPick={onPick} />
        <ThemedText style={{ fontSize: 14 }}>Your picked habits</ThemedText>
        <FlatList
          style={{ marginTop: 16 }}
          data={picked}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ThemedText>-{item}</ThemedText>}
          ListEmptyComponent={<ThemedText>No picked habits</ThemedText>}
        />
      </View>
    </Screen>
  );
}
