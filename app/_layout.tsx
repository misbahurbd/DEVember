import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { useEffect } from "react"

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync()

  const [loaded, error] = useFonts({
    JosefinSans: require("../assets/fonts/JosefinSans-Regular.ttf"),
    JosefinSansSemiBold: require("../assets/fonts/JosefinSans-SemiBold.ttf"),
    JosefinSansBold: require("../assets/fonts/JosefinSans-Bold.ttf"),
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaded) {
        SplashScreen.hideAsync()
      }
    }, 200)
    return () => {
      clearTimeout(timer)
    }
  }, [loaded])

  if (!loaded && !error) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "DEVember" }}
      />
    </Stack>
  )
}
export default RootLayout
