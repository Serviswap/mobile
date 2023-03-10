import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "../Icon";
import { useFormikContext } from "formik";

function CategoryPicker({
  item,
  selectedItem,
  setModalVisible,
  name,
}) {
  const { setFieldValue } = useFormikContext();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFieldValue(name, item), setModalVisible(false);
      }}
    >
      <View style={styles.container}>
        {selectedItem && selectedItem.value==item.value ? (
          <Icon
            backgroundColor={item.backGroundColor}
            label={item.label}
            size={40}
            selected={true}
          />
        ) : 
          <Icon
            backgroundColor={item.backGroundColor}
            label={item.label}
            size={40}
            selected={false}
          />
        }
        
        <Text style={styles.label}>{item.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "7%",
    marginTop: 9,
    alignItems: "center",
  },
  label: { 
    marginTop: 2, 
    textAlign: "center",
    fontSize: 14,
    fontWeight: "300" 
  },
});

export default CategoryPicker;
