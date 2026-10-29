import { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function Settings({ isDark, setIsDark }) {
  // const [isDark, setIsDark] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Choose color theme:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Light</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#cc5dd6" }}
          thumbColor={isDark ? "#6200ee" : "#f4f3f4"}
          value={isDark}
          onValueChange={setIsDark}
        />
        <Text style={styles.switchText}>Dark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  switch: {
    transform: [{ scale: 2 }],
  },
  text: {
    fontSize: 24,
  },
  switchText: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
});
