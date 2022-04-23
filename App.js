import { StatusBar } from "react-native";
import GameController from "./src/components/GameController";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <GameController />
    </>
  );
}
