import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Markdown from "react-native-markdown-display"
import { Feather } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"

const MarkdownContent = ({ content }) => {
  const rules = {
    fence: (node, children, parent, styles) => {
      const onCopy = async () => {
        await Clipboard.setStringAsync(node.content)
        Alert.alert("Copy to clipboard")
      }

      return (
        <View
          key={node.key}
          style={[
            styles.fence,
            {
              borderRadius: 10,
              padding: 0,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: "#CDCDCD",
            },
          ]}
        >
          <View style={styles.fenceHeader}>
            <Text
              style={{
                fontSize: 14,
                color: "#CDCDCD",
                fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
              }}
            >
              {node.sourceInfo}
            </Text>
            <TouchableOpacity onPress={onCopy}>
              <Feather
                name="copy"
                size={20}
                color="#CDCDCD"
              />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16 }}>
            <Text>{node.content}</Text>
          </View>
        </View>
      )
    },
  }

  return (
    <ScrollView style={styles.container}>
      <Markdown
        rules={rules}
        style={markdownStyle}
      >
        {content}
      </Markdown>
    </ScrollView>
  )
}
export default MarkdownContent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
const markdownStyle = StyleSheet.create({
  // General Text Styles
  body: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Montserrat",
  },
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  s: {
    textDecorationLine: "line-through",
  },

  // Headings
  heading1: {
    fontSize: 28, // Adjusted font size for heading 1
    lineHeight: 36, // Adjusted line height for heading 1
    fontFamily: "MontserratBold",
  },
  heading2: {
    fontSize: 22, // Adjusted font size for heading 2
    lineHeight: 28, // Adjusted line height for heading 2
    fontFamily: "MontserratSemiBold",
  },
  heading3: {
    fontSize: 18, // Adjusted font size for heading 3
    lineHeight: 24, // Adjusted line height for heading 3
    fontFamily: "MontserratSemiBold",
  },
  heading4: {
    fontSize: 16, // Adjusted font size for heading 4
    lineHeight: 22, // Adjusted line height for heading 4
    fontFamily: "MontserratSemiBold",
  },
  heading5: {
    fontSize: 14, // Adjusted font size for heading 5
    lineHeight: 20, // Adjusted line height for heading 5
    fontFamily: "Montserrat",
  },
  heading6: {
    fontSize: 12, // Adjusted font size for heading 6
    lineHeight: 18, // Adjusted line height for heading 6
    fontFamily: "Montserrat",
  },

  image: {
    borderRadius: 20,
    overflow: "hidden",
  },

  // Blockquotes
  blockquote: {
    backgroundColor: "#F5F5F5",
    borderColor: "#CCC",
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },

  // Lists
  bullet_list: {
    marginBottom: 10,
  },
  ordered_list: {
    marginBottom: 10,
  },
  list_item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet_list_icon: {
    marginRight: 10,
    fontSize: 12, // Adjust font size for bullet list icon
    lineHeight: 20, // Adjust line height for bullet list icon
  },
  ordered_list_icon: {
    marginRight: 10,
    fontSize: 12, // Adjust font size for ordered list icon
    lineHeight: 20, // Adjust line height for ordered list icon
  },
  bullet_list_content: {
    flex: 1,
  },
  ordered_list_content: {
    flex: 1,
  },

  // Code
  code_inline: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    ...Platform.select({
      ["ios"]: {
        fontFamily: "Courier",
      },
      ["android"]: {
        fontFamily: "monospace",
      },
    }),
  },
  code_block: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    ...Platform.select({
      ["ios"]: {
        fontFamily: "Courier",
      },
      ["android"]: {
        fontFamily: "monospace",
      },
    }),
  },
  fence: {
    borderWidth: 2,
    borderColor: "whitesmoke",
    backgroundColor: "whitesmoke",
    lineHeight: 28,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    ...Platform.select({
      ["ios"]: {
        fontFamily: "Courier",
      },
      ["android"]: {
        fontFamily: "monospace",
      },
    }),
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: "#000000",
    flexDirection: "row",
  },
  td: {
    flex: 1,
    padding: 5,
  },

  // Links
  link: {
    textDecorationLine: "underline",
  },
  blocklink: {
    flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 1,
  },

  // Text Output
  text: {},
  textgroup: {},
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  hardbreak: {
    width: "100%",
    height: 1,
  },
  fenceHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#2f2f2f",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
