import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

function MapUiTop(props) {
  return (
    <View style={styles.uiTop}>
      <TouchableHighlight style={styles.backButton} onPress={props.onPressBack}>
        <Image
          style={styles.backButtonImage}
          source={require("../../assets/left-arrow-icon.png")}
        />
      </TouchableHighlight>
      <Text style={styles.countryCounter}>
        {props.targetCountryIdx + 1} of {props.lenTargetCountries}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonImage: {
    width: "100%",
    height: "100%",
  },
  countryCounter: {
    right: 10,
    top: 10,
    position: "absolute",
  },
  backButton: {
    top: 10,
    left: 10,
    padding: 9,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
  uiTop: {
    height: "10%",
    backgroundColor: "rgba(10, 10, 80, 0.4)",
    width: "100%",
    position: "absolute",
    zIndex: 10,
    shadowColor: "transparent",
    elevation: Platform.OS === "android" ? 1 : 0,
  },
});

export default MapUiTop;
