import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BookCard from "../../components/BookCard";
import { BOOKS, Book } from "../../constants/books";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";

export default function BookshelfScreen() {
  const router = useRouter();

  const openBook = (book: Book) => {
    // Navigates into the reader; page counter always starts at 1.
    router.push(`/reader/${book.id}`);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Confido Islamic Books</Text>

      {/* Featured banner for the first book, matches the mockup */}
      {BOOKS[0] && (
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>{BOOKS[0].title}</Text>
          <Text style={styles.bannerSubtitle}>{BOOKS[0].subtitle}</Text>
        </View>
      )}

      <Text style={styles.sectionLabel}>All Books</Text>

      <FlatList
        data={BOOKS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: SPACING.md }}
        contentContainerStyle={{ gap: SPACING.md, paddingBottom: SPACING.xl }}
        renderItem={({ item }) => <BookCard book={item} onPress={openBook} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  banner: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  bannerTitle: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: "800",
  },
  bannerSubtitle: {
    color: COLORS.cream,
    fontSize: 13,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },
});
