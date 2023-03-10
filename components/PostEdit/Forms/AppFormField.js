import React, { useState } from "react";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import PostTextInput from "../PostTextInput";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

function AppFormField({
  name,
  width,
  style,
  onDoneButton,
  errorStyle,
  ...props
}) {
  const {
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
  const [userInput, setUserInput] = useState("");
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PostTextInput
          name={name}
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => {
            setFieldValue(name, text), setUserInput(text);
          }}
          value={values[name]}
          style={style}
          userInput={userInput}
          onDoneButton={onDoneButton}
          {...props}
        />
      </TouchableWithoutFeedback>
      <View style={[errorStyle, { margintop: 100 }]}>
        <AppErrorMessage
          style={errorStyle}
          error={errors[name]}
          visible={touched[name]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default AppFormField;
