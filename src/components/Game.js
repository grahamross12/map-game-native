import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapCanvasWrapper from "./MapCanvasWrapper";
import MapUiTop from "./MapUiTop";
import MapUiBottom from "./MapUiBottom";

function Game(props) {
  const [targetCountryIdx, setTargetCountryIdx] = useState(0);
  const [activeCountries, setActiveCountries] = useState({});
  const [countryNames, setCountryNames] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorCountries, setErrorCountries] = useState(new Set());
  const numTries = useRef(0);

  const handleSelectCountry = (id) => {
    if (id in activeCountries || errorCountries.has(id)) return;
    setSelectedCountry(id);
    if (props.targetCountries[targetCountryIdx] !== id) {
      if (numTries.current < 2) {
        setErrorCountries(new Set([id]));
        numTries.current = numTries.current + 1;
      } else {
        selectTargetCountry(3);
        setTargetCountryIdx(targetCountryIdx + 1);
        setSelectedCountry(null);
        setErrorCountries(new Set());
        numTries.current = 0;
      }
    } else {
      selectTargetCountry(numTries.current);
      setTargetCountryIdx(targetCountryIdx + 1);
      setSelectedCountry(null);
      setErrorCountries(new Set());
      numTries.current = 0;
    }
  };

  const selectTargetCountry = (colorIdx) => {
    let activeCountries_ = { ...activeCountries };
    activeCountries_[props.targetCountries[targetCountryIdx]] = colorIdx;
    setActiveCountries(activeCountries_);
  };

  return (
    <View style={styles.gameWrapper}>
      <MapUiTop
        onPressBack={props.onPressBack}
        lenTargetCountries={props.targetCountries.length}
        targetCountryIdx={targetCountryIdx}
      />
      <MapCanvasWrapper
        onSelectCountry={handleSelectCountry}
        setCountryNames={setCountryNames}
        activeCountries={activeCountries}
        errorCountries={errorCountries}
        map={props.map}
      />
      <MapUiBottom
        targetCountry={countryNames[props.targetCountries[targetCountryIdx]]}
        selectedCountry={countryNames[selectedCountry]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gameWrapper: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});

export default Game;
