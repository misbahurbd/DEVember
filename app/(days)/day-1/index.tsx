import { Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
const Day1Screen = () => {
  return (
    <View>
      <Stack.Screen options={{ headerTitle: "Day 1" }} />
      <Text>Day1Screen</Text>
    </View>
  )
}
export default Day1Screen
const styles = StyleSheet.create({})
