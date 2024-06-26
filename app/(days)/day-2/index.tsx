import { Stack, router } from "expo-router"
import { Button, StyleSheet, Text, View } from "react-native"
const Day2Screen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Day 2: Onboarding" }} />
      <Text style={styles.text}>Day 2 Screen</Text>

      <Button
        title="Go to onboarding"
        onPress={() => router.push("/day-2/onboarding")}
      />
    </View>
  )
}
export default Day2Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    color: "#9B4521",
    fontFamily: "JosefinSansSemiBold",
  },
})
