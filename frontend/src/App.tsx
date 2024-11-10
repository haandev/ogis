import "./App.css";
import { useEffect, useRef } from "react";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { data, dataToGeoJSON } from "./data";
import Layout from "./app/Layout";
import { useGisStore } from "./stores/gis/gis-store";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import Layers from "./app/Layers";
import { LayerType } from "./stores/gis/types";
function App() {
  const gis = useGisStore();

  const mapRef = useRef(new Map());
  const map = mapRef.current;
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    map.setTarget(hostRef.current!);
  }, []);

  useEffect(() => {
    map.setView(gis.view);
  }, [gis.view]);

  useEffect(() => {
    map.setLayers(
      gis.layers.filter((layer) => layer.visible).map((layer) => layer.layer)
    );
  }, [gis.layers]);

  const addOsmLayer = () => {
    gis.addLayer({
      layer: new TileLayer({
        source: new OSM(),
      }),
      name: "OSM",
      visible: true,
      type: LayerType.Background,
    });
  };

  const initialize = () => {
    addOsmLayer();
    const geojson = dataToGeoJSON(data);
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojson),
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: {
        "fill-color": ["string", ["get", "COLOR"], "#eee"],
        "stroke-color": ["string", ["get", "COLOR"], "#000"],
        "stroke-width": 2,
      },
    });
    gis.addLayer({
      layer: vectorLayer,
      name: "Current",
      visible: true,
      type: LayerType.Constructed,
    });
  };

  return (
    <Layout>
      <div className="w-screen h-screen">
        <Layers />
        <button onClick={initialize}>init</button>
        <div
          ref={hostRef}
          className="w-full h-full"
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        ></div>
      </div>
    </Layout>
  );
}

export default App;
