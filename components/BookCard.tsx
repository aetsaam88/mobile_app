import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Book, getPageUrl } from "../constants/books";
import { COLORS, RADIUS, SPACING } from "../constants/theme";

interface Props {
  book: Book;
  onPress: (book: Book) => void;
}

export default function BookCard({ book, onPress }: Props) {
  const coverUri = book.coverUrl ?? getPageUrl(book, 1);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={() => onPress(book)}
    >
      <Image source={{ uri: coverUri }} style={styles.cover} resizeMode="cover" />
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {book.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {book.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: COLORS.creamAlt,
  },
  textWrap: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
