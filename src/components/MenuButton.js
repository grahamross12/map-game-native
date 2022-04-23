import { TouchableHighlight, View, Text, StyleSheet } from "react-native";

function MenuButton(props) {
  return (
    <TouchableHighlight style={styles.menuButton} onPress={props.onPress}>
      <Text style={styles.menuButtonText}>{props.name}</Text>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  menuButton: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    height: 50,
    paddingLeft: 40,
  },
  menuButtonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MenuButton;
