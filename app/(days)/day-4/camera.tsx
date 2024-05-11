import { Stack, router, useFocusEffect } from "expo-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import {
  Camera,
  PhotoFile,
  VideoFile,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera"
import { useAppState } from "@react-native-community/hooks"
import { Video } from "expo-av"

const CameraScreen = () => {
  const [mode, setMode] = useState<"photo" | "video">("photo")
  const [camera, setCamera] = useState<"front" | "back">("back")
  const [flash, setFlash] = useState<number>(0)
  const [isProsessing, setIsProsessing] = useState(false)
  const [media, setMedia] = useState<{
    data: PhotoFile | VideoFile
    type: "photo" | "video"
  }>(null)
  const [active, setActive] = useState(false)

  const { top, bottom } = useSafeAreaInsets()
  const appState = useAppState()
  const cameraRef = useRef<Camera>()
  const flashOptions: ("on" | "off" | "auto")[] = ["on", "off", "auto"]
  const flashIcons: ("flash" | "flash-off" | "flash-outline")[] = [
    "flash",
    "flash-off",
    "flash-outline",
  ]

  const { hasPermission, requestPermission } = useCameraPermission()
  const {
    hasPermission: hasMicPermission,
    requestPermission: reqMicPermission,
  } = useMicrophonePermission()

  const device = useCameraDevice(camera)
  const format = useCameraFormat(device, [
    { photoResolution: "max" },
    { videoResolution: "max" },
  ])

  // toggle photo to video mode
  const toggleMode = useCallback(() => {
    setMode(mode === "photo" ? "video" : "photo")
  }, [mode])

  // toggle front and back camera
  const toggleCamera = useCallback(() => {
    setCamera(camera === "back" ? "front" : "back")
  }, [camera])

  const toggleFlash = useCallback(() => {
    setFlash(flash === flashOptions.length - 1 ? 0 : flash + 1)
  }, [flash])

  // on primary btn press
  const onPress = useCallback(async () => {
    setIsProsessing(true)
    try {
      // capture photo
      if (mode === "photo" && cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({
          flash: flashOptions[flash],
        })
        setMedia({ data: photo, type: "photo" })
        setIsProsessing(false)
        const timer = setTimeout(() => {
          setMedia(null)
          clearTimeout(timer)
        }, 2000)
        return
      }

      // stop recording
      if (mode === "video" && cameraRef.current && isProsessing) {
        cameraRef.current.stopRecording()
        setIsProsessing(false)
        return
      }

      // capture video
      if (mode === "video" && cameraRef.current) {
        setIsProsessing(true)
        cameraRef.current.startRecording({
          onRecordingFinished: video => {
            setIsProsessing(false)
            setMedia({ data: video, type: "video" })
          },
          onRecordingError: error => console.error(error),
        })
        return
      }
    } catch (error) {}
  }, [mode, flash, isProsessing])

  useEffect(() => {
    const init = async () => {
      if (!hasPermission) {
        await requestPermission()
      }
      if (!hasMicPermission) {
        await reqMicPermission()
      }
    }
    init()
  }, [hasPermission, hasMicPermission])

  useFocusEffect(
    useCallback(() => {
      setActive(true)
      return () => {
        setActive(false)
      }
    }, [])
  )

  if (!hasPermission || !hasMicPermission) {
    return null
  }

  console.log({ isProsessing })

  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={26}
              color="white"
              onPress={() => {
                media ? setMedia(null) : router.back()
              }}
            />
          ),
          headerRight: () =>
            media ? null : (
              <Pressable
                style={styles.modeContainer}
                onPress={toggleMode}
              >
                <Ionicons
                  style={[
                    styles.modeItem,
                    mode == "photo" && styles.activeMode,
                  ]}
                  name="camera-outline"
                  size={18}
                />
                <Ionicons
                  style={[
                    styles.modeItem,
                    mode == "video" && styles.activeMode,
                  ]}
                  name="videocam-outline"
                  size={18}
                />
              </Pressable>
            ),
        }}
      />
      <View style={styles.innerContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          format={format}
          isActive={active && appState === "active" && !media}
          photo
          video
          audio
        />
        {media ? (
          <View style={[StyleSheet.absoluteFill, { zIndex: 10 }]}>
            {media.type === "photo" ? (
              <Image
                source={{ uri: media.data.path }}
                style={StyleSheet.absoluteFill}
              />
            ) : (
              <Video
                style={[StyleSheet.absoluteFill, { zIndex: 20 }]}
                source={{ uri: media.data.path }}
                useNativeControls
                isLooping
              />
            )}
          </View>
        ) : (
          <>
            <View style={styles.topPanel}>
              <Pressable style={styles.panelBtn}>
                <Ionicons
                  name={flashIcons[flash]}
                  size={32}
                  color={"white"}
                  onPress={toggleFlash}
                />
              </Pressable>
            </View>
            <View style={styles.bottomPanel}>
              <View style={styles.leftBlock}>
                <Pressable>
                  <Ionicons
                    name="images-outline"
                    size={32}
                    color={"white"}
                  />
                </Pressable>
              </View>
              <Pressable
                style={[styles.recBtn, { zIndex: 20 }]}
                onPress={onPress}
              >
                <Ionicons
                  name={
                    !isProsessing
                      ? mode === "photo"
                        ? "aperture-outline"
                        : "videocam"
                      : "stop"
                  }
                  size={38}
                  color={!isProsessing ? "white" : "orangered"}
                />
              </Pressable>

              <View style={styles.rightBlock}>
                <Pressable onPress={toggleCamera}>
                  <Ionicons
                    name="camera-reverse-outline"
                    size={32}
                    color={"white"}
                  />
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "lightblue",
  },
  camera: {
    flex: 1,
  },
  modeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  modeItem: {
    color: "gray",
    padding: 4,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  },
  activeMode: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomPanel: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topPanel: {
    position: "absolute",
    right: 10,
    top: 50,
    alignItems: "center",
    gap: 5,
  },
  panelBtn: {
    width: 40,
    aspectRatio: "1/1",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  leftBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  recBtn: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
})
