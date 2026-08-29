import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getBookById, getPageUrl } from "../../constants/books";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";

export default function ReaderScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const book = getBookById(bookId);

  // The page counter. 1-based, starts at page 1 whenever the book opens.
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.missingText}>Book not found.</Text>
      </View>
    );
  }

  const isFirstPage = page <= 1;
  const isLastPage = page >= book.pageCount;

  const goNext = () => {
    if (isLastPage) return;
    setLoading(true);
    setPage((p) => p + 1); // counter++
  };

  const goPrevious = () => {
    if (isFirstPage) return;
    setLoading(true);
    setPage((p) => p - 1); // counter--
  };

  const pageUrl = getPageUrl(book, page);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: book.title }} />

      <View style={styles.imageWrap}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={COLORS.gold}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <Image
          key={pageUrl}
          source={{ uri: pageUrl }}
          style={styles.pageImage}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={goPrevious}
          disabled={isFirstPage}
          style={[styles.navButton, isFirstPage && styles.navButtonDisabled]}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.cream} />
          <Text style={styles.navText}>Previous</Text>
        </Pressable>

        <Text style={styles.counter}>
          Page {page} / {book.pageCount}
        </Text>

        <Pressable
          onPress={goNext}
          disabled={isLastPage}
          style={[styles.navButton, isLastPage && styles.navButtonDisabled]}
        >
          <Text style={styles.navText}>Next</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.cream} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.creamAlt,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.creamAlt,
  },
  missingText: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  imageWrap: {
    flex: 1,
    margin: SPACING.md,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pageImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navText: {
    color: COLORS.cream,
    fontWeight: "700",
    fontSize: 13,
  },
  counter: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
  },
});
