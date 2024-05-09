import { StatusBar } from "expo-status-bar"
import { FlatList, StyleSheet, View } from "react-native"
import DayListItem from "../components/core/day-list-item"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { useEffect } from "react"

const days = [...Array(28)].map((item, index) => index + 1)

export default function App() {
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
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        columnWrapperStyle={{ gap: 10 }}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        data={days}
        renderItem={({ item }) => <DayListItem item={item} />}
      />

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
})
