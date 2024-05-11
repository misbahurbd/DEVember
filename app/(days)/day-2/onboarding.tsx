import { Stack, router } from "expo-router"
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated"
import OnboardingSlide from "@/components/onboarding/onboarding-slide"
import OnboardingDots from "@/components/onboarding/onboarding-dots"
import * as SecureStore from "expo-secure-store"

const onboardingSteps = [
  {
    id: 1,
    icon: "arrow-right-arrow-left",
    title: "Track every transaction",
    description:
      "Monitor your spending and contributions, ensuring every penny aligns with your family's aspirations.",
  },
  {
    id: 2,
    icon: "person-arrow-up-from-line",
    title: "Learn and grow together",
    description:
      "Engage in interactive lessons designed to enhance your financial literacy and teamwork skills.",
  },
  {
    id: 3,
    icon: "arrows-to-circle",
    title: "Set achievable goals",
    description:
      "Define clear, realistic objectives that empower your family to pursue its dreams with confidence.",
  },
]

const OnboardingScreen = () => {
  const { width: ScreenWidth } = useWindowDimensions()
  const x = useSharedValue(0)
  const flatListRef = useAnimatedRef<Animated.FlatList<any>>()
  const flatListItem = useSharedValue(0)
  const onViewChanged = ({ viewableItems }) => {
    flatListItem.value = viewableItems[0].index
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    },
  })

  const onContinue = async () => {
    if (flatListItem.value >= onboardingSteps.length - 1) {
      await SecureStore.setItemAsync("onboarding", "true")
      onSkip()
    } else {
      flatListRef.current.scrollToIndex({ index: flatListItem.value + 1 })
    }
  }

  const onSkip = () => {
    router.back()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#15141A" }}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar style={"light"} />

        <OnboardingDots
          data={onboardingSteps}
          screenWidth={ScreenWidth}
          x={x}
        />

        <Animated.FlatList
          ref={flatListRef}
          onScroll={onScroll}
          style={{ flex: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={onboardingSteps}
          onViewableItemsChanged={onViewChanged}
          renderItem={({ item, index }) => (
            <OnboardingSlide
              index={index}
              item={item}
              x={x}
            />
          )}
        />

        <View style={styles.btnRow}>
          <Pressable
            style={styles.btn}
            onPress={onSkip}
          >
            <Text style={styles.btnText}>Skip</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.primaryBtn]}
            onPress={onContinue}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default OnboardingScreen
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,

    alignItems: "center",
    backgroundColor: "#15141A",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 60,
    paddingHorizontal: 16,
  },
  btn: {
    borderWidth: 2,
    borderColor: "#302E38",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 40,
  },
  primaryBtn: {
    backgroundColor: "#302E38",
    flex: 1,
  },
  btnText: {
    color: "#FEFEFE",
    fontWeight: 800,
    textAlign: "center",
  },
})
