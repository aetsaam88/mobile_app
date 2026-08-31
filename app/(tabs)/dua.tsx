import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AppHeader from "../../components/AppHeader";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";

interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

const STATIC_DUAS: Dua[] = [
  {
    id: "1",
    title: "Dua Before Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live.",
    reference: "Sahih al-Bukhari 6312",
  },
  {
    id: "2",
    title: "Dua Upon Waking Up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration:
      "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilaihin-nushur",
    translation:
      "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    reference: "Sahih al-Bukhari 6312",
  },
  {
    id: "3",
    title: "Dua Before Eating",
    arabic: "بِسْمِ اللهِ",
    transliteration: "Bismillah",
    translation: "In the Name of Allah.",
    reference: "Sunan Abi Dawud 3767",
  },
  {
    id: "4",
    title: "Dua After Eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration:
      "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    translation:
      "All praise is due to Allah who has given us food and drink and made us Muslims.",
    reference: "Sunan Abi Dawud 3850",
  },
  {
    id: "5",
    title: "Dua For Increasing Knowledge",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "O my Lord, increase me in knowledge.",
    reference: "Surah Taha (20:114)",
  },
];

export default function DuaScreen() {
  const renderDuaCard = ({ item }: { item: Dua }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.arabicText}>{item.arabic}</Text>
      <Text style={styles.transliterationText}>{item.transliteration}</Text>
      <Text style={styles.translationText}>"{item.translation}"</Text>

      <View style={styles.footer}>
        <Text style={styles.referenceText}>{item.reference}</Text>
        <Ionicons name="heart-outline" size={20} color={COLORS.darkGreen} />
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <AppHeader title="Daily Duas" />

      <FlatList
        data={STATIC_DUAS}
        keyExtractor={(item) => item.id}
        renderItem={renderDuaCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  listContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: SPACING.sm,
  },
  arabicText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textDark,
    textAlign: "right",
    marginVertical: SPACING.sm,
    lineHeight: 38,
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: "italic",
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  translationText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.md,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  referenceText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.gold,
  },
});