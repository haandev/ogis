import Layer from "ol/layer/Layer";
import View from "ol/View";

export enum LayerType {
  Background,
  Constructed,
  Draft,
}
export type LayerItem = {
  layer: Layer;
  name: string;
  visible: boolean;
  type: LayerType;
};

export interface GisStore {
  //layers and layer operations
  layers: LayerItem[];
  addLayer: (config: LayerItem) => void;
  hideLayer: (name: string) => void;
  removeLayer: (name: string) => void;
  showLayer: (name: string) => void;

  //view and view operations
  view: View;
  setView: (view: View) => void;
}
