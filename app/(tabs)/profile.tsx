import Avatar from "@/components/Avatar";
import PrimaryButton from "@/components/PrymaryButton";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { useProfile } from "@/context/ProfileContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { getAvatar } from "@/services/avatar";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function Profile() {
  // const { loading, profile, updateProfile, setAvatar } = useProfile();
  const { loading, profile, updateProfile, setAvatar } = useProfile();

  const surface = useThemeColor({}, "surface");
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const muted = useThemeColor({}, "muted");

  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [busy, setBusy] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setName(profile.name);
    setRole(profile.role);
    // setImage(profile.avatarUri);
  }, [profile]);

  async function handleSave() {
    setBusy(true);
    await updateProfile({ name: name.trim(), role: role.trim() });
    setBusy(false);
    Alert.alert("Profile updated");
  }

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) await setAvatar(result.assets[0].uri);
    // setImage(result.assets[0].uri);
    setBusy(false);
    Alert.alert("Image selected");
  }

  async function takePhoto() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission denied");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) await setAvatar(result.assets[0].uri);
    setBusy(false);
    Alert.alert("Photo taken");
  }

  async function makeAIImage() {
    setBusy(true);
    const url = await getAvatar(name);
    await setAvatar(url);
    setBusy(false);
    Alert.alert("AI image created");
  }

  if (loading) {
    return (
      <Screen>
        <ThemedText>Loading...</ThemedText>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Avatar name={name} uri={image} onPress={pickFromGallery} />
            <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
              Touch to change profile picture
            </ThemedText>
          </View>
          <View style={{ gap: 12 }}>
            <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
              Name
            </ThemedText>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={{
                borderWidth: 1,
                borderColor: border,
                borderRadius: 8,
                padding: 12,
              }}
              returnKeyType="next"
            />
            <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
              Profession
            </ThemedText>
            <TextInput
              value={role}
              onChangeText={setRole}
              placeholder="Enter your profession"
              style={{
                borderWidth: 1,
                borderColor: border,
                borderRadius: 8,
                padding: 12,
              }}
              returnKeyType="done"
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
              <PrimaryButton
                title="Pick from gallery"
                onPress={pickFromGallery}
                disabled={busy}
              />
              <PrimaryButton
                title="Take photo"
                onPress={takePhoto}
                disabled={busy}
              />
            </View>
            <PrimaryButton
              title="Make AI image"
              onPress={makeAIImage}
              disabled={busy}
            />
            <PrimaryButton title="Save" onPress={handleSave} disabled={busy} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  description: {
    fontSize: 16,
    color: "#64748B",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
