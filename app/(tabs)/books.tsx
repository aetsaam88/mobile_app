import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppHeader from "../../components/AppHeader";
import BookCard from "../../components/BookCard";
import { BOOKS, Book } from "../../constants/books";
import { COLORS, SPACING } from "../../constants/theme";

export default function BooksScreen() {
  const router = useRouter();

  const openBook = (book: Book) => {
    // Navigates into the reader; page counter always starts at 1.
    router.push(`/reader/${book.id}`);
  };

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <AppHeader title="All Books" />

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* Grid View (1 Row me 2 Books) */}
        <View style={styles.grid}>
          {BOOKS.map((book) => (
            <View key={book.id} style={styles.gridItem}>
              <BookCard book={book} onPress={openBook} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  body: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: SPACING.md,
  },
});