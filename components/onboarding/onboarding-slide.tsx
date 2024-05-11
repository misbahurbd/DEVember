import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"

interface OnboardingSlideProps {
  item: {
    id: number
    icon: string
    title: string
    description: string
  }
  index: number
  x: SharedValue<number>
}

const OnboardingSlide = ({ item, index, x }) => {
  const { width: ScreenWidth } = useWindowDimensions()

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * ScreenWidth,
        index * ScreenWidth,
        (index + 1) * ScreenWidth,
      ],
      [-1, 1, -1],
      Extrapolation.CLAMP
    )
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * ScreenWidth,
        index * ScreenWidth,
        (index + 1) * ScreenWidth,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    )
    return {
      transform: [{ translateY: translateYAnimation }],
      opacity: opacityAnimation,
    }
  })
  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * ScreenWidth,
        index * ScreenWidth,
        (index + 1) * ScreenWidth,
      ],
      [-1, 1, -1],
      Extrapolation.CLAMP
    )
    return {
      opacity: opacityAnimation,
    }
  })

  return (
    <View
      style={{
        width: ScreenWidth,
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Animated.View style={[styles.image, imageAnimatedStyle]}>
        <FontAwesome6
          name={item.icon}
          size={120}
          color="white"
        />
      </Animated.View>
      <Animated.View style={textAnimatedStyle}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    </View>
  )
}
export default OnboardingSlide
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    color: "grey",
    textAlign: "center",
    fontSize: 20,
  },
})
