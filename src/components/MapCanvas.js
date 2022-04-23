import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import Draggable from "react-draggable";

const MAX_ZOOM = 10;
const MIN_ZOOM = 0.3;
const ZOOM_SPEED = 10;
const OUTLINE_COLOR = "rgb(168, 190, 219)";
const COUNTRY_COLORS = {
  0: "#9feb6c",
  1: "#e8c433",
  2: "#e8c433",
  3: "#ed4637",
};
const OUTLINE_WIDTH = 0;
const ERROR_COLOR = "#ed4637";
const DEFAULT_COLOR = "rgb(113, 116, 129)";

class MapCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = { mapData: null };
    this.coordsMinMax = { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
  }

  renderMaps = () => {
    let polygons = [];
    if (!this.state.mapData) {
      console.log("returning");
      return;
    }
    this.state.mapData.features.forEach((feature, idx) => {
      let areas;
      if (feature.geometry.type === "MultiPolygon") {
        areas = feature.geometry.coordinates;
      } else {
        areas = [feature.geometry.coordinates];
      }
      for (let i = 0; i < areas.length; i++) {
        let coordsString = "";
        for (let j = 0; j < areas[i].length; j++) {
          areas[i][j].forEach((coords) => {
            let x = (coords[0] + 180) * 0.3;
            let y = (-coords[1] + 100) * 0.3;
            coordsString += `${x},${y} `;
            if (x < this.coordsMinMax.xMin) this.coordsMinMax.xMin = x;
            if (y < this.coordsMinMax.yMin) this.coordsMinMax.yMin = y;
            if (x > this.coordsMinMax.xMax) this.coordsMinMax.xMax = x;
            if (y > this.coordsMinMax.yMax) this.coordsMinMax.yMax = y;
          });
        }
        this.getFill(idx);
        polygons.push(
          <Polygon
            points={coordsString}
            fill={
              idx in this.props.activeCountries
                ? COUNTRY_COLORS[this.props.activeCountries[idx]]
                : DEFAULT_COLOR
            }
            stroke={OUTLINE_COLOR}
            strokeWidth={OUTLINE_WIDTH}
            key={`${idx},${i}`}
            onPress={() => this.props.onSelectCountry(idx)}
          />
        );
      }
    });
    return polygons;
  };

  getFill = (idx) => {
    if (idx in this.props.activeCountries) {
      return COUNTRY_COLORS[this.props.activeCountries[idx]];
    } else if (this.props.errorCountries.has(idx)) {
      return ERROR_COLOR;
    } else {
      return DEFAULT_COLOR;
    }
  };

  getMapData = async (map) => {
    const mapData = require(`../../assets/maps/world-large.json`);
    this.setState({ mapData: mapData });
  };

  componentDidMount = async () => {
    this.getMapData(this.props.map);
  };

  render() {
    return (
      <ReactNativeZoomableView
        maxZoom={3}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={false}
        onZoomAfter={this.logOutZoomState}
      >
        <Svg
          height="100%"
          preserveAspectRatio="xMinYMin slice"
          width="200%"
          viewBox="0 0 100 100"
          canvasHeight={500}
          canvasWidth={500}
          minScale={0.5}
          initialZoom={1.5}
          translateY={0.5}
          maxScale={100}
        >
          {this.renderMaps()}
        </Svg>
      </ReactNativeZoomableView>
      // </Draggable>
    );
  }
}

export default MapCanvas;
