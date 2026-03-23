export type Suggestion = {
  id: string;
  title: string;
  subtitle?: string;
  emoji?: string;
  priority: "low" | "medium" | "high";
};

const CATALOG: Record<string, Omit<Suggestion, "id">> = {
  "water-energy": {
    title: "Drink water",
    subtitle: "205 ml",
    emoji: "💧",
    priority: "low",
  },
  "walk-energy": {
    title: "Walk for 10 minutes",
    subtitle: "Fresh air",
    emoji: "🍃",
    priority: "medium",
  },
  "breathe-energy": {
    title: "Breathe for 1 minute",
    subtitle: "4-7-8 technique",
    emoji: "😮‍💨",
    priority: "low",
  },
  "reading-focus": {
    title: "Read for 10 minutes",
    subtitle: "Relevant topic",
    emoji: "📚",
    priority: "low",
  },
  "pomodoro-focus": {
    title: "Pomodoro 25",
    subtitle: "1 deep block",
    emoji: "🕑",
    priority: "medium",
  },
  "notification-focus": {
    title: "Silence for 1 hour",
    subtitle: "Stay focused",
    emoji: "🔕",
    priority: "medium",
  },
};

export type CategoryKey =
  | "water-energy"
  | "walk-energy"
  | "breathe-energy"
  | "reading-focus"
  | "pomodoro-focus"
  | "notification-focus";

export async function getSuggestions(
  category: CategoryKey,
  context: { habitsCount: number; profileName?: string },
): Promise<Suggestion[]> {
  const endpoint = process.env.EXPO_PUBLIC_SUGGESTIONS_API_URL;
  if (!endpoint) {
    return suggestFor(category);
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, context }),
    });

    if (!res.ok) {
      throw new Error("Failed to get suggestions");
    }

    const data = await res.json();
    return data.suggestions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function suggestFor(category: CategoryKey): Promise<Suggestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const keys = Object.keys(CATALOG).filter((key) => key.startsWith(category));
  return keys.map((k, i) => ({
    id: `${category}-${i}`,
    ...CATALOG[k],
  }));
}
