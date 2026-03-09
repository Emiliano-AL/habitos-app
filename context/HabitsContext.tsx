import { Habit, Priority } from "@/types/habit";
import { isSameDay, isYesterday, toISO } from "@/utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from "react";

type State = { loading: boolean; habits: Habit[] };

type Action =
  | { type: "HYDRATE"; payload: Habit[] }
  | { type: "ADD"; title: string; priority?: Priority }
  | { type: "TOGGLE"; id: string; today: Date };

const STORAGE_KEY = "habits:v1";

const initialState: State = { loading: true, habits: [] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, habits: action.payload };
    case "ADD":
      const now = new Date();
      const habit: Habit = {
        id: `h${Date.now()}`,
        title: action.title,
        priority: action.priority || "low",
        createdAt: now.toISOString(),
        lastDoneAt: null,
        streak: 0,
        isCompleted: false,
      };
      return { ...state, habits: [habit, ...state.habits] };
    case "TOGGLE":
      const { id, today } = action;
      const todayISO = toISO(today);
      const updated = state.habits.map((h) => {
        if (h.id !== id) return h;
        const last = h.lastDoneAt ? new Date(h.lastDoneAt) : null;
        const alreadyDoneToday = last && isSameDay(last, today);

        if (alreadyDoneToday) {
          return {
            ...h,
            isCompleted: false,
            streak: Math.max(0, h.streak - 1),
            lastDoneAt: null,
          };
        }

        let newStreak = 1;
        if (last && isYesterday(last, today)) {
          newStreak = h.streak + 1;
        }
        return {
          ...h,
          isCompleted: true,
          streak: newStreak,
          lastDoneAt: todayISO,
        };
      });

      return { ...state, habits: updated };
    default:
      return state;
  }
};

type HabitsCtx = {
  loading: boolean;
  habits: Habit[];
  addHabit: (title: string, priority?: Priority) => void;
  toggleHabit: (id: string, today: Date) => void;
};

const HabitsContext = createContext<HabitsCtx | null>(null);

export const HabitsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
        } else {
          dispatch({ type: "HYDRATE", payload: [] });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "HYDRATE", payload: [] });
      }
    })();
  }, []);

  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    if (state.loading) return;
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.habits));
      } catch (error) {
        console.error(error);
      }
    }, 250);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [state.habits, state.loading]);

  const addHabit = useCallback((title: string, priority?: Priority) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    dispatch({ type: "ADD", title: cleanTitle, priority });
  }, []);

  const toggleHabit = useCallback((id: string, today: Date) => {
    dispatch({ type: "TOGGLE", id, today });
  }, []);

  const value = useMemo(
    () => ({
      loading: state.loading,
      habits: state.habits,
      addHabit,
      toggleHabit,
    }),
    [state.loading, state.habits, addHabit, toggleHabit],
  );

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
  //return <HabitsContext.Provider value={{ ...state, addHabit, toggleHabit }}>{children}</HabitsContext.Provider>;
};

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
};
