import { Stack, router } from "expo-router"
import { Button, StyleSheet, Text, View } from "react-native"
const Day3Screen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Day 3: Camera" }} />
      <Text style={styles.text}>Day 3 : Camera</Text>

      <Button
        title="Go to camera"
        onPress={() => router.push("/day-4/camera")}
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
