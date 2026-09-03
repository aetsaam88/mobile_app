import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppHeader from "../../components/AppHeader";
import BookCard from "../../components/BookCard";
import { BOOKS, Book } from "../../constants/books";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDER_WIDTH = SCREEN_WIDTH - SPACING.md * 2;

// Local assets folder se images require ki gayi hain
const SLIDES = [
  {
    id: "1",
    title: "Assalamu Alaikum",
    subtitle: "Continue your journey of Islamic knowledge",
    image: require("../../assets/slide1.png"), 
  },
  {
    id: "2",
    title: "Daily Inspiration",
    subtitle: "Explore Quranic insights and Authentic Hadiths",
    image: require("../../assets/slide2.png"),
  },
  {
    id: "3",
    title: "Track Progress",
    subtitle: "Bookmark your favorite books and read daily",
    image: require("../../assets/slide3.png"),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextSlide = activeSlide + 1;
      if (nextSlide >= SLIDES.length) {
        nextSlide = 0;
      }
      setActiveSlide(nextSlide);
      sliderRef.current?.scrollTo({
        x: nextSlide * SLIDER_WIDTH,
        animated: true,
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SLIDER_WIDTH
    );
    if (slideIndex !== activeSlide) {
      setActiveSlide(slideIndex);
    }
  };

  const openBook = (book: Book) => {
    router.push(`/reader/${book.id}`);
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Eman Quran Islamic Books" />

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Local Image Auto Slider */}
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={sliderRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            decelerationRate="fast"
            snapToInterval={SLIDER_WIDTH}
          >
            {SLIDES.map((slide) => (
              <ImageBackground
                key={slide.id}
                source={slide.image}
                style={styles.slideCard}
                imageStyle={{ borderRadius: RADIUS.lg }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.welcomeTitle}>{slide.title}</Text>
                  <Text style={styles.welcomeSubtitle}>{slide.subtitle}</Text>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>

          {/* Dots Indicator */}
          <View style={styles.pagination}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeSlide === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 2. Featured Books */}
        <Text style={styles.sectionLabel}>Featured Books</Text>
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
  sliderContainer: {
    marginBottom: SPACING.lg,
  },
  slideCard: {
    width: SLIDER_WIDTH,
    height: 180,
    overflow: "hidden",
    borderRadius: RADIUS.lg,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    justifyContent: "center",
  },
  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  welcomeSubtitle: {
    color: "#E0E0E0",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: COLORS.darkGreen,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: COLORS.darkGreen + "40",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
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