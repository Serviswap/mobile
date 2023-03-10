import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  items,
  name,
  PickerItemComponent,
  numberOfColumns,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        placeholder="Category"
        numberOfColumns={numberOfColumns}
        icon="apps"
        selectedItem={values[name]}
        onSelectItem={(item) => {
          setFieldValue(name, item);
        }}
        name={name}
        items={items}
        PickerItemComponent={PickerItemComponent}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFormPicker;
