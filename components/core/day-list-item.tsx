import { StyleSheet, Text, View } from "react-native"
const DayListItem = ({ item }: { item: number }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{item}</Text>
    </View>
  )
}
export default DayListItem
const styles = StyleSheet.create({
  box: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: "#F9EDE3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#9B4521",
    borderWidth: 1,
  },
  text: {
    fontSize: 70,
    color: "#9B4521",
    fontFamily: "JosefinSansSemiBold",
  },
})
