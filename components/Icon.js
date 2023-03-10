import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

function Icon({
  label,
  selected
}) {
  return (
    <>
    {selected==true ? (
      <View style={styles.selectedContainer}>
      {label=="Food" ? (
        <Image source = {require('../assets/foodCategory.png')} style={styles.iconSelected}/>
      ) : label=="Career" ? (
        <Image source = {require('../assets/careerCategory.png')} style={styles.iconSelected}/> 
      ) : label=="Fun" ? (
        <Image source = {require('../assets/funCategory.png')} style={styles.iconSelected}/> 
      ) : label=="Sports" ? (
        <Image source = {require('../assets/sportsCategory.png')} style={styles.iconSelected}/> 
      ) : label=="Academic" ? (
        <Image source = {require('../assets/academicsCategory.png')} style={styles.iconSelected}/>
      ) : label=="Others" ? (
        <Image source = {require('../assets/otherCategory.png')} style={styles.iconSelected}/> 
      ) : null}
      </View>
    ) : 
      <View style={styles.container}>
      {label=="Food" ? (
        <Image source = {require('../assets/foodCategory.png')} style={styles.iconUnselected}/>
      ) : label=="Career" ? (
        <Image source = {require('../assets/careerCategory.png')} style={styles.iconUnselected}/> 
      ) : label=="Fun" ? (
        <Image source = {require('../assets/funCategory.png')} style={styles.iconUnselected}/> 
      ) : label=="Sports" ? (
        <Image source = {require('../assets/sportsCategory.png')} style={styles.iconUnselected}/> 
      ) : label=="Academic" ? (
        <Image source = {require('../assets/academicsCategory.png')} style={styles.iconUnselected}/>
      ) : label=="Others" ? (
        <Image source = {require('../assets/otherCategory.png')} style={styles.iconUnselected}/> 
      ) : null}
      </View>
    }
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  academicIcon: {
    flexDirection: "row",
  },
  iconSelected: {
    width: "40%",
    height: "60%",
    tintColor: '#FFFFFF',
  },
  iconUnselected: {
    width: "40%",
    height: "60%",
    tintColor: '#76C7F5',
  },
  container: {
    width: screenWidth / 6,
    height: screenHeight / 18.5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#76C7F5',
    backgroundColor: `white`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  selectedContainer: {
    width: screenWidth / 6,
    height: screenHeight / 18.5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#76C7F5',
    backgroundColor: '#76C7F5',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  }
});

export default Icon;
