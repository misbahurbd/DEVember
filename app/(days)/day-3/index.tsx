import { Stack, router } from "expo-router"
import { Button, StyleSheet, Text, View } from "react-native"
const Day3Screen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Day 3: Markdown" }} />
      <Text style={styles.text}>Day 3 : Markdown</Text>

      <Button
        title="Go to editor"
        onPress={() => router.push("/day-3/editor")}
      />
    </View>
  )
}
export default Day3Screen
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
