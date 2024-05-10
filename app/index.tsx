import { StatusBar } from "expo-status-bar"
import { FlatList, StyleSheet, View } from "react-native"
import DayListItem from "@components/core/day-list-item"

const days = [...Array(27)].map((item, index) => index + 1)

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        columnWrapperStyle={{ gap: 10 }}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        data={days}
        renderItem={({ item }) => <DayListItem day={item} />}
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
