import { Stack, router } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync()

  const [loaded, error] = useFonts({
    JosefinSans: require("@assets/fonts/JosefinSans-Regular.ttf"),
    JosefinSansSemiBold: require("@assets/fonts/JosefinSans-SemiBold.ttf"),
    JosefinSansBold: require("@assets/fonts/JosefinSans-Bold.ttf"),
    Montserrat: require("@assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("@assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("@assets/fonts/Montserrat-Bold.ttf"),
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded && !error) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "DEVember" }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}
export default RootLayout
