import React from "react";
import { View } from "react-native";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import ImageInputList from "../ImageInputList";

function FormImagePicker({ name }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const imageUri = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUri, ...uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUri.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUri}
        addImage={handleAdd}
        removeImage={handleRemove}
      />
      <View style={{ width: "100%", marginTop: 20, marginLeft: 15 }}>
        <AppErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
}

export default FormImagePicker;
