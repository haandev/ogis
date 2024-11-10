import axios from "axios";

export const getProj4DefsByEpsg = async (epsg: number): Promise<string> => {
  const proj4def = await axios.get(`https://epsg.io/${epsg}.js`);
  return proj4def.data;
};

export const getStyles = async () => {};
