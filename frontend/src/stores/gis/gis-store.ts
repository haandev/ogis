import { create } from "zustand";
import { GisStore, LayerItem } from "./types";
import View from "ol/View";
import { viewOptions } from "@/util";
export const useGisStore = create<GisStore>((set, get) => {
  const hideLayer = (name: string) => {
    set((state) => {
      return {
        layers: state.layers.map((layer) => {
          if (layer.name === name) {
            return {
              ...layer,
              visible: false,
            };
          }
          return layer;
        }),
      };
    });
  };
  const removeLayer = (name: string) => {
    set((state) => {
      return {
        layers: state.layers.filter((layer) => layer.name !== name),
      };
    });
  };
  const showLayer = (name: string) => {
    set((state) => {
      return {
        layers: state.layers.map((layer) => {
          if (layer.name === name) {
            return {
              ...layer,
              visible: true,
            };
          }
          return layer;
        }),
      };
    });
  };
  const addLayer = (config: LayerItem) => {
    const layer = get().layers.find((layer) => layer.name === config.name);
    if (!layer)
      set((state) => {
        return {
          layers: [...state.layers, config],
        };
      });
    else showLayer(config.name);
  };

  const setView = (view: View) => {
    set({ view });
  };

  //initialize first view from db
  viewOptions().then((view) => {
    setView(new View(view));
    return view;
  });

  return {
    layers: [],
    addLayer,
    hideLayer,
    removeLayer,
    showLayer,
    view: new View(),
    setView,
  };
});
