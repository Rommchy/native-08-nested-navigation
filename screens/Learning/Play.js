import { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { playSound } from "../../services/soundHandler";
import { dummyWords } from "../../dummyData";

export default function Play({ words }) {
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  const [wordsList, setWordsList] = useState(words ?? dummyWords);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toLearn = wordsList.filter((w) => w.status < 2);
  const current = toLearn[index];

  if (toLearn.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Congrats!</Text>
        <Text style={styles.text}>For now you have learned all the words</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Pressable style={styles.card} onPress={() => setIsOpen(true)}>
        <View style={styles.wordInfoContainer}>
          <Text style={styles.word}>{current.word}</Text>
          {isOpen && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {current.audio && (
                  <Pressable
                    style={styles.playPressable}
                    onPress={() => playSound(current.audio)}
                  >
                    <Ionicons
                      name="volume-medium-outline"
                      size={28}
                      color={palette.primary900}
                    />
                  </Pressable>
                )}
                <Text style={styles.text}>{current.phonetics}</Text>
              </View>
              <Text style={styles.text}>{current.partOfSpeech}</Text>
              <Text style={styles.text}>{current.meaning}</Text>
            </>
          )}
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: palette.secondary800 }]}
            onPress={() => {
              setIndex((index + 1) % toLearn.length);
              setIsOpen(false);
            }}
          >
            <Text style={[styles.buttonText, ,]}>Didn’t know it</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: palette.primary900 }]}
            onPress={() => {
              setWordsList(
                wordsList.map((w) =>
                  w.id === current.id ? { ...w, status: w.status + 1 } : w,
                ),
              );
              setIndex(0);
              setIsOpen(false);
            }}
          >
            <Text style={[styles.buttonText, ,]}>Knew it</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const makeStyles = (c) =>
  StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    card: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      borderWidth: 1,
      width: "95%",
      margin: 5,
      borderRadius: 5,
    },
    word: { fontSize: 32, color: c.fontMain },
    text: { fontSize: 18, color: c.fontMain },
    button: {
      borderRadius: 4,
      height: 40,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    buttonText: { fontSize: 18, color: c.fontInverse },
    wordInfoContainer: {
      flexDirection: "column",
      gap: 5,
      textAlign: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      margin: 10,
      gap: 10,
    },
  });
