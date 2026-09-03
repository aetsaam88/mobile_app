import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppHeader from "../../components/AppHeader";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";

interface Bookmark {
  id: string;
  bookTitle: string;
  pageNumber: string;
  note: string;
}

export default function ProfileScreen() {
  // User Profile States
  const [userName, setUserName] = useState("Muhammad Ahmed");
  const [userEmail, setUserEmail] = useState("ahmed@example.com");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Bookmark / Page Note States
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [note, setNote] = useState("");

  // Load Saved Data from Storage
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem("@user_profile");
      const savedBookmarks = await AsyncStorage.getItem("@user_bookmarks");

      if (savedProfile) {
        const { name, email } = JSON.parse(savedProfile);
        setUserName(name);
        setUserEmail(email);
      }

      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (e) {
      console.error("Failed to load profile data", e);
    }
  };

  // Save User Profile
  const handleSaveProfile = async () => {
    try {
      const profileData = { name: userName, email: userEmail };
      await AsyncStorage.setItem("@user_profile", JSON.stringify(profileData));
      setIsEditingProfile(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (e) {
      Alert.alert("Error", "Could not save profile details.");
    }
  };

  // Add New Bookmark / Page Note
  const handleAddBookmark = async () => {
    if (!bookTitle.trim() || !pageNumber.trim()) {
      Alert.alert("Missing Info", "Please enter book name and page number.");
      return;
    }

    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      bookTitle: bookTitle.trim(),
      pageNumber: pageNumber.trim(),
      note: note.trim(),
    };

    const updatedList = [newBookmark, ...bookmarks];
    setBookmarks(updatedList);

    try {
      await AsyncStorage.setItem("@user_bookmarks", JSON.stringify(updatedList));
      setBookTitle("");
      setPageNumber("");
      setNote("");
    } catch (e) {
      Alert.alert("Error", "Could not save bookmark.");
    }
  };

  // Delete Bookmark
  const handleDeleteBookmark = async (id: string) => {
    const updatedList = bookmarks.filter((item) => item.id !== id);
    setBookmarks(updatedList);
    await AsyncStorage.setItem("@user_bookmarks", JSON.stringify(updatedList));
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Profile & Notes" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Profile Section */}
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={36} color={COLORS.gold} />
            </View>
            <Text style={styles.sectionTitle}>User Details</Text>
          </View>

          {isEditingProfile ? (
            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your name"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={userEmail}
                onChangeText={setUserEmail}
                keyboardType="email-address"
                placeholder="Enter your email"
              />

              <Pressable style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.btnText}>Save Details</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.detailsView}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>

              <Pressable
                style={styles.editBtn}
                onPress={() => setIsEditingProfile(true)}
              >
                <Ionicons name="create-outline" size={16} color={COLORS.cream} />
                <Text style={styles.btnText}>Edit Profile</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* 2. Page Note / Bookmark Add Form */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Note Book Page Number</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Book Name (e.g. Sahih Bukhari)"
            placeholderTextColor={COLORS.textMuted}
            value={bookTitle}
            onChangeText={setBookTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Page Number (e.g. 45)"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="number-pad"
            value={pageNumber}
            onChangeText={setPageNumber}
          />

          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Short Note (Optional)"
            placeholderTextColor={COLORS.textMuted}
            multiline
            value={note}
            onChangeText={setNote}
          />

          <Pressable style={styles.addBtn} onPress={handleAddBookmark}>
            <Ionicons name="bookmark" size={18} color={COLORS.cream} />
            <Text style={styles.btnText}>Save Page Note</Text>
          </Pressable>
        </View>

        {/* 3. Saved Bookmarks List */}
        <Text style={styles.listHeader}>My Saved Page Notes</Text>

        {bookmarks.length === 0 ? (
          <Text style={styles.emptyText}>No saved page notes yet.</Text>
        ) : (
          bookmarks.map((item) => (
            <View key={item.id} style={styles.bookmarkCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bookmarkBook}>{item.bookTitle}</Text>
                <Text style={styles.bookmarkPage}>Page #: {item.pageNumber}</Text>
                {item.note ? (
                  <Text style={styles.bookmarkNote}>"{item.note}"</Text>
                ) : null}
              </View>

              <Pressable onPress={() => handleDeleteBookmark(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#e74c3c" />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  container: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: COLORS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.darkGreen,
  },
  detailsView: {
    marginTop: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  form: {
    marginTop: SPACING.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.creamAlt,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  saveBtn: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    alignItems: "center",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    marginTop: 4,
  },
  btnText: {
    color: COLORS.cream,
    fontWeight: "700",
    fontSize: 14,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    marginVertical: SPACING.xs,
  },
  bookmarkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookmarkBook: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.darkGreen,
  },
  bookmarkPage: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gold,
    marginTop: 2,
  },
  bookmarkNote: {
    fontSize: 12,
    fontStyle: "italic",
    color: COLORS.textMuted,
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
    fontSize: 13,
  },
});