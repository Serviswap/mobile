import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Button, Dimensions } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native";

function AppPicker({
  placeholder,
  icon,
  onSelectItem,
  items,
  name,
  PickerItemComponent,
  selectedItem,
  numberOfColumns = 3,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.displayContainer}>
        <Text style={styles.headerText}>
          Category
        </Text>
        <View style={styles.iconsContainer}>
          <FlatList
            scrollEnabled={false}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                selectedItem={selectedItem}
                setModalVisible={setModalVisible}
                onSelectItem={onSelectItem}
                name={name}
              />
            )}
          />
        </View>
      </View>
    </> 
  );
}

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  displayContainer: {
    backgroundColor: "#FCF8D5",
    marginHorizontal: 0,
    height: "100%",
  },
  headerText: {
    fontSize: window.height * 0.018,
    marginTop: 10,
    marginLeft: 30,
    fontWeight: "700",
    color: "#6F6B56",
    letterSpacing: 1.5
  },
  iconsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },
  container: {
    backgroundColor: "#f8f4f4",
    borderRadius: 0,
    flexDirection: "row",
    width: "50%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
});

export default AppPicker;
