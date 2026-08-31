import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getBookById, getPageUrl } from "../../constants/books";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";

export default function ReaderScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const book = getBookById(bookId);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.missingText}>Book not found.</Text>
      </View>
    );
  }

  const isFirstPage = page <= 1;
  const knownLastPage = book.pageCount ? page >= book.pageCount : false;
  const isLastPage = knownLastPage || reachedEnd;

  const goNext = () => {
    if (isLastPage) return;
    setLoading(true);
    setPage((p) => p + 1);
  };

  const goPrevious = () => {
    if (isFirstPage) return;
    setReachedEnd(false);
    setLoading(true);
    setPage((p) => p - 1);
  };

  const goNextRef = useRef(goNext);
  const goPreviousRef = useRef(goPrevious);
  goNextRef.current = goNext;
  goPreviousRef.current = goPrevious;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          goNextRef.current();
        } else if (gestureState.dx > 50) {
          goPreviousRef.current();
        }
      },
    })
  ).current;

  const handlePageSearch = () => {
    const pageNum = parseInt(searchInput.trim(), 10);
    if (!isNaN(pageNum) && pageNum >= 1) {
      if (book.pageCount && pageNum > book.pageCount) return;
      setReachedEnd(false);
      setLoading(true);
      setPage(pageNum);
      setSearchInput("");
    }
  };

  const pageUrl = getPageUrl(book, page);

  if (isLastPage && !loading && reachedEnd) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: book.title }} />
        <View style={styles.endWrap}>
          <Ionicons name="book" size={48} color={COLORS.gold} />
          <Text style={styles.endTitle}>The End</Text>
          <Text style={styles.endSubtitle}>
            You've completed {book.title}
          </Text>
        </View>
        <View style={styles.footer}>
          <Pressable onPress={goPrevious} style={styles.navButton}>
            <Ionicons name="chevron-back" size={20} color={COLORS.cream} />
            <Text style={styles.navText}>Previous</Text>
          </Pressable>
          <Text style={styles.counter}>Page {page - 1}</Text>
          <View style={[styles.navButton, styles.navButtonDisabled]}>
            <Text style={styles.navText}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.cream} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: book.title }} />

      {/* Top Page Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={16} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Go to page number..."
          placeholderTextColor={COLORS.textMuted}
          keyboardType="number-pad"
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handlePageSearch}
        />
        {searchInput.length > 0 && (
          <Pressable onPress={handlePageSearch} style={styles.goButton}>
            <Text style={styles.goButtonText}>Go</Text>
          </Pressable>
        )}
      </View>

      {/* Main Image Container - Height reduced */}
      <View style={styles.imageWrap} {...panResponder.panHandlers}>
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
          onError={() => {
            setLoading(false);
            setReachedEnd(true);
            setPage((p) => Math.max(p - 1, 1));
          }}
        />
      </View>

      {/* Bottom Footer */}
      <View style={styles.footer}>
        <Pressable
          onPress={goPrevious}
          disabled={isFirstPage}
          style={[styles.navButton, isFirstPage && styles.navButtonDisabled]}
        >
          <Ionicons name="chevron-back" size={18} color={COLORS.cream} />
          <Text style={styles.navText}>Previous</Text>
        </Pressable>

        <Text style={styles.counter}>
          Page {page}
          {book.pageCount ? ` / ${book.pageCount}` : ""}
        </Text>

        <Pressable
          onPress={goNext}
          disabled={isLastPage}
          style={[styles.navButton, isLastPage && styles.navButtonDisabled]}
        >
          <Text style={styles.navText}>Next</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.cream} />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
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
  searchContainer: {
        marginTop:20,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    margin:5,
    fontSize: 13,
    color: COLORS.textDark,
    paddingVertical: 2,
  },
  goButton: {
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  goButtonText: {
    color: COLORS.cream,
    fontSize: 11,
    fontWeight: "700",
  },
  imageWrap: {
    marginTop:20,
    height: "78%", 
    alignSelf: "center",
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    overflow: "hidden",
  },
  pageImage: {
    width: "100%",
    height: "100%",
  },
  endWrap: {
    flex: 1,
    margin: SPACING.md,
    marginTop: 0,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  endTitle: {
    color: COLORS.gold,
    fontSize: 26,
    fontWeight: "800",
  },
  endSubtitle: {
    color: COLORS.cream,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    marginTop:20,

    paddingVertical: 6,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 6,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.pill,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navText: {
    color: COLORS.cream,
    fontWeight: "700",
    fontSize: 12,
  },
  counter: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textDark,
  },
});