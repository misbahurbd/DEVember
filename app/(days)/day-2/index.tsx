import { Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
const Day2Screen = () => {
  return (
    <View>
      <Stack.Screen options={{ headerTitle: "Day 2" }} />
      <Text>Day2Screen</Text>
    </View>
  )
}
export default Day2Screen
const styles = StyleSheet.create({})
