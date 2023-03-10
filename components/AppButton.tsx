import { StyleSheet, TouchableOpacity, Text } from "react-native";

function AppButton({
  name,
  onPress,
  style,
  textStyle,
}: {
  name: String;
  onPress: () => void;
  style: {};
  textStyle: {};
}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[textStyle, styles.loginText]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginText: {
    color: "#6F6B56",
    textAlign: "center",
    alignItems: "center",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E1DCB0",
    width: 130,
    height: 35,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
});

export default AppButton;
