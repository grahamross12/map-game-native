import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import MenuButton from "./MenuButton";

const CONTINENTS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function MainMenu(props) {
  const [showPractice, setShowPractice] = useState(false);

  const renderMainMenu = () => {
    return (
      <View>
        <Text style={styles.title}>Map Game</Text>
        <MenuButton name={"World"} onPress={() => props.onPressPlay("world")} />
        <MenuButton name="Practice" onPress={() => setShowPractice(true)} />
      </View>
    );
  };

  const renderContinentButtons = () => {
    let continentButtons = [];
    for (let i = 0; i < CONTINENTS.length; i++) {
      continentButtons.push(
        <MenuButton
          name={CONTINENTS[i]}
          onPress={() => props.onPressPlay(CONTINENTS[i].toLowerCase())}
          key={i}
        />
      );
    }
    return continentButtons;
  };

  const renderPractice = () => {
    return (
      <View>
        {renderContinentButtons()}
        <MenuButton onPress={() => setShowPractice(false)} name="Back" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {showPractice ? renderPractice() : renderMainMenu()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default MainMenu;
