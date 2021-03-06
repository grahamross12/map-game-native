import { StyleSheet, Text, View } from "react-native";

function MapUiBottom(props) {
  const renderCountryTag = () => {
    let countryTag = props.targetCountry;
    if (props.selectedCountry) {
      countryTag += " (" + props.selectedCountry + ")";
    }
    return countryTag;
  };
  return (
    <View style={styles.uiBottom}>
      <View>
        <Text style={styles.countryTag}>Africa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  uiBottom: {
    height: "10%",
    backgroundColor: "rgba(10, 10, 80, 0.4)",
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  countryTag: {
    color: "white",
    fontSize: 20,
  },
});

export default MapUiBottom;
