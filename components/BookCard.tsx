import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Book, getPageUrl } from "../constants/books";
import { COLORS, RADIUS, SPACING } from "../constants/theme";

interface Props {
  book: Book;
  onPress: (book: Book) => void;
}

export default function BookCard({ book, onPress }: Props) {
  const imageSource = book.localCover
    ? book.localCover
    : { uri: book.coverUrl ?? getPageUrl(book, 1) };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
      onPress={() => onPress(book)}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={imageSource} 
          style={styles.cover} 
          resizeMode="cover" 
        />
      </View>

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
    backgroundColor: "#FDFBF7",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: "#EAE6DF",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1 / 1.1,
    borderRadius: RADIUS.sm,
    overflow: "hidden",
    backgroundColor: "#F4F0E8",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  textWrap: {
    paddingTop: SPACING.sm,
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});