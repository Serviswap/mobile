import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { TextInput, KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Separator from "../Separator";

function PostTextInput({
  name,
  icon,
  style,
  width,
  textStyle,
  userInput,
  onDoneButton,
  ...otherProps
}) {
  return (
    <>
      {name=="title" ? (
        <View style={styles.titleContainer}>
          {icon && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={icon}
            size="20"
            color="lightgrey"
          />
          )}
          <TextInput
            placeholderTextColor={'lightgray'}
            style={style}
            multiline={true}
            editable={true}
            {...otherProps}
          >
          </TextInput>
          <View style={styles.separator}>
            <Separator/>
          </View>
        </View>
      ) :
         <KeyboardAvoidingView
      style={styles.bodyContainer}
      behavior="padding"
     >
          {icon && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={icon}
              size="20"
              color="lightgrey"
            />
          )}
          <TextInput
            placeholderTextColor={'lightgray'}
            style={style}
            multiline={true}
            editable={true}
            {...otherProps}
          >
          </TextInput> 
        </KeyboardAvoidingView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    borderRadius: 20,
    padding: 10,
    width: "100%",
  },
  separator: {
    marginTop: 10
  },
  bodyContainer: {
    flexDirection: "column",
    padding: 10,
    height: "100%",
  },

  icon: { marginRight: 10, color: "#0c0c0c" },
});
export default PostTextInput;
