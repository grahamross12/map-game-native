import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapCanvas from "./MapCanvas";

function MapCanvasWrapper(props) {
  const wrapperRef = useRef();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  // useEffect(() => {
  //   setHeight(wrapperRef.current.scrollHeight);
  //   setWidth(wrapperRef.current.scrollWidth);
  // }, []);

  return (
    <View ref={wrapperRef} style={styles.canvasWrapper}>
      <MapCanvas
        height={height}
        width={width}
        onSelectCountry={props.onSelectCountry}
        setCountryNames={props.setCountryNames}
        activeCountries={props.activeCountries}
        errorCountries={props.errorCountries}
        map={props.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  canvasWrapper: {
    top: "10%",
    height: "80%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgb(168, 190, 219)",
  },
});

export default MapCanvasWrapper;
