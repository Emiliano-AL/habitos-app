import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const STORAGE_KEY = "profile:v1";

export type Profile = {
  name: string;
  role: string;
  avatarUri?: string | null;
};

type Ctx = {
  loading: boolean;
  profile: Profile;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
  setAvatar: (uri: string | null) => Promise<void>;
};

const defaultProfile: Profile = {
  name: "John Doe",
  role: "Software Engineer",
  avatarUri: null,
};

const ProfileContext = createContext<Ctx>({
  loading: true,
  profile: defaultProfile,
  updateProfile: async () => {},
  setAvatar: async (_uri: string | null) => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (p: Profile) => {
    setProfile(p);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      await persist({ ...profile, ...patch });
    },
    [profile, persist],
  );

  const setAvatar = useCallback(
    async (uri: string | null) => {
      await persist({ ...profile, avatarUri: uri });
    },
    [profile, persist],
  );

  const value = useMemo(
    () => ({
      loading,
      profile,
      updateProfile,
      setAvatar,
    }),
    [loading, profile, updateProfile, setAvatar],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
