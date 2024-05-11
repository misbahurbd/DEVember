import { Link } from "expo-router"
import { Pressable, StyleSheet, Text } from "react-native"
const DayListItem = ({ day }: { day: number }) => {
  return (
    <Link
      href={`/(days)/day-${day}`}
      asChild
    >
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
  )
}
export default DayListItem
const styles = StyleSheet.create({
  box: {
    flexBasis: "49%",
    flexShrink: 1,
    aspectRatio: 1,
    backgroundColor: "#F9EDE3",
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
