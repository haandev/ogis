import { ViewOptions } from "ol/View";
import { getProj4DefsByEpsg } from "./services/settings";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";

export const viewOptions = async () => {
  const viewOptions: ViewOptions = {
    projection: "EPSG:5254",
    center: [435172.47, 4537427.13],
    zoom: 18,
  };
  const projection = viewOptions.projection;
  if (typeof projection === "string" && projection.startsWith("EPSG:")) {
    const epsg = parseInt(projection.split(":")[1]);
    const proj4def = await getProj4DefsByEpsg(epsg);
    const defArray = proj4def.split('"');
    proj4.defs(defArray[1], defArray[3]);
  }
  register(proj4);
  return viewOptions;
};
