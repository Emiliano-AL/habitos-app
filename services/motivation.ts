const LOCAL = [
  "You are amazing",
  "You are strong",
  "You are brave",
  "You are kind",
  "You are smart",
  "You are funny",
  "You are creative",
  "You are a great parent",
  "You are a great partner",
  "You are a great friend",
  "You are a great employee",
];

export async function getMotivation(name: string, habitTitle: string) {
  const endpoint = process.env.EXPO_PUBLIC_MOTIVATION_API_URL;
  if (!endpoint) {
    return LOCAL[Math.floor(Math.random() * LOCAL.length)];
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, habitTitle }),
    });

    if (!res.ok) {
      throw new Error("Failed to get motivation");
    }

    const data = await res.json();
    const text = (data?.text as string) || "";

    return (
      text.slice(0, 100) || LOCAL[Math.floor(Math.random() * LOCAL.length)]
    );
  } catch (error) {
    console.error(error);
    return LOCAL[Math.floor(Math.random() * LOCAL.length)];
  }
}
