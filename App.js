import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Settings from "./screens/Settings";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS_LIGHT, COLORS } from "./constants";
import { StatusBar } from "expo-status-bar";
import AllWords from "./screens/Words/AllWords";
import AddWord from "./screens/Words/AddWord";
import EditWord from "./screens/Words/EditWord";
import Play from "./screens/Learning/Play";
import Statistics from "./screens/Learning/Statistics";
import { useState } from "react";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function WordsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllWords"
        component={AllWords}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddWord"
        component={AddWord}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen name="EditWord" component={EditWord} />
    </Stack.Navigator>
  );
}

function LearningNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="Play"
        component={Play}
        options={{ headerTitleAlign: "center" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const col = isDark ? COLORS : COLORS_LIGHT;

  const theme = {
    dark: isDark,
    colors: {
      primary: col.primary900,
      background: col.appBackground,
      card: col.primary200,
      text: col.fontMain,
      border: col.grey300,
      notification: col.secondary800,
    },
    palette: col,
  };
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: col.primary900,
            tabBarInactiveTintColor: col.fontMain,
            tabBarStyle: {
              elevation: 8,
              paddingBottom: 8,
              paddingTop: 8,
              height: 64,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
          }}
        >
          <Tab.Screen
            name="Words"
            component={WordsNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Learning"
            component={LearningNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="book-open-blank-variant"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            options={{
              headerTitleAlign: "center",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              ),
            }}
          >
            {() => <Settings isDark={isDark} setIsDark={setIsDark} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
