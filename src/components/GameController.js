import React, { useState } from "react";
import Game from "./Game";
import MainMenu from "./MainMenu";
import { API_URL } from "react-native-dotenv";
import { Text } from "react-native";

function GameController() {
  const [targetCountries, setTargetCountries] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [map, setMap] = useState(null);

  const handlePressPlay = async (map) => {
    try {
      await getDailyNumbers();
    } catch (err) {
      console.err(err);
    }
    setMap(map);
    setShowMenu(false);
  };

  const handlePressBack = () => {
    setShowMenu(true);
  };

  const getDailyNumbers = async () => {
    let countryIndices;
    try {
      let res = await fetch(API_URL + "daily-numbers");
      countryIndices = await res.json();
    } catch (err) {
      console.error(err);
    }
    setTargetCountries(countryIndices);
  };

  if (showMenu) {
    return <MainMenu onPressPlay={handlePressPlay} />;
  } else {
    return (
      <Game
        onPressBack={handlePressBack}
        targetCountries={targetCountries}
        map={map}
        dailyChallenge={map === "world" ? true : false}
      />
    );
  }
}

export default GameController;
