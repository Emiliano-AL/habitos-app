import { useHabits } from "@/context/HabitsContext";
import { Alert, FlatList, View } from "react-native";

// import { Collapsible } from '@/components/ui/collapsible';
// import { ExternalLink } from '@/components/external-link';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedView } from '@/components/themed-view';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Fonts } from '@/constants/theme';

import ExploreCard from "@/components/ExploreCard";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { suggestFor, Suggestion } from "@/services/suggest";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  // const [picked, setPicked] = useState<string[]>([]);
  // const onPick = (habit: string) => {
  //   setPicked((prev) => [...prev, habit]);
  // };

  const { addHabit } = useHabits();

  const text = useThemeColor({}, "text");
  const muted = useThemeColor({}, "muted");

  const [walkEnergy, setWalkEnergy] = useState<Suggestion[] | null>(null);
  const [breatheEnergy, setBreatheEnergy] = useState<Suggestion[] | null>(null);

  useEffect(() => {
    let mounted = false;
    (async () => {
      try {
        const [a, b] = await Promise.all([
          suggestFor("walk-energy"),
          suggestFor("breathe-energy"),
        ]);
        if (!mounted) return;
        setWalkEnergy(a);
        setBreatheEnergy(b);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const onPick = (s: Suggestion) => {
    addHabit(s.title, s.priority);
    Alert.alert("Habit added", s.title);
  };

  const renderItem = ({ item }: { item: Suggestion }) => (
    <ExploreCard
      emoji={item.emoji}
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => onPick(item)}
    />
  );

  const keyExtractor = (item: Suggestion) => item.id;

  const Section = ({
    title,
    data,
  }: {
    title: string;
    data: Suggestion[] | null;
  }) => (
    <View style={{ gap: 16 }}>
      <ThemedText style={{ fontWeight: "700", fontSize: 18 }}>
        {title}
      </ThemedText>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingRight: 16 }}
        />
      ) : (
        <ThemedText style={{ fontSize: 14 }}>No suggestions</ThemedText>
      )}
    </View>
  );

  return (
    <Screen>
      <View>
        <ThemedText style={{ fontWeight: "700", fontSize: 18 }}>
          Fast add habits
        </ThemedText>

        <Section title="Walk energy" data={walkEnergy} />
        <Section title="Breathe energy" data={breatheEnergy} />
        {/* <QuickAddChips onPick={onPick} /> */}
        {/* <ThemedText style={{ fontSize: 14 }}>Your picked habits</ThemedText>
        <FlatList
          style={{ marginTop: 16 }}
          data={picked}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ThemedText>-{item}</ThemedText>}
          ListEmptyComponent={<ThemedText>No picked habits</ThemedText>}
        /> */}
      </View>
    </Screen>
  );
}
