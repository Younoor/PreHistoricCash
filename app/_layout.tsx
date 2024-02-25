import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import MyKeyboard from "@/src/components/MyKeyboard";
import { myColors } from "@/src/styles/Colors";

import { useColorScheme } from "@/components/useColorScheme";
import { SafeAreaView, StyleSheet, Switch, Text, Image } from "react-native";
import TabLayout from "./(tabs)/_layout";
import NumericKeyboard from "@/components/NumericKeyboard";
import EditScreenInfo from "@/components/EditScreenInfo";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [amount, setAmount] = useState<string>("");
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState("light");
  const handleKeyPress = (input: string) => {
    console.log("Input:", input);
    // You can handle the input value here, e.g., update state or perform further processing
    setAmount(input);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={
          theme === "dark"
            ? styles.container
            : [styles.container, { backgroundColor: "black" }]
        }
      >
        <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        />
        <Switch
          value={theme === "dark"}
          onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{ position: 'relative', top: -80, right: 150 }}
        />
        <MyKeyboard />
        {/* <NumericKeyboard style={
          styles.middle
        } onKeyPress={handleKeyPress} /> */}
        {/* <TabLayout = (tabs) /> */}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  middle: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 90, // Adjust the width and height according to your logo size
    height: 150,
    resizeMode: 'contain',
    justifyContent: 'center',
  }
});

//        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
