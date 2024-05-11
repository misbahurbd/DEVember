import { StyleSheet, Text, View } from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"
const OnboardingDots = ({ data, screenWidth, x }) => {
  return (
    <View
      style={{
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        top: 10,
      }}
    >
      {data.map((_, index) => {
        const animatedWidth = useAnimatedStyle(() => ({
          width: interpolate(
            x.value,
            [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            [10, 50, 10],
            Extrapolation.CLAMP
          ),
        }))

        return (
          <Animated.View
            key={index}
            style={[
              { height: 10, backgroundColor: "white", borderRadius: 20 },
              animatedWidth,
            ]}
          />
        )
      })}
    </View>
  )
}
export default OnboardingDots
const styles = StyleSheet.create({})
