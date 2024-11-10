export enum Items {
  Point,
  LinePoint,
  PolygonPoint,
}
export type GeoDBRecord = {
  /** unique id */
  id: number;
  /**  if refers to another id, means same group */
  groupId: number;

  /** horizontal coordinate */
  x: number;

  /** vertical coordinate */
  y: number;

  /** z coordinate */
  z: number;

  /** z of ground */
  gz: number;
  type: Items;
  meta: Record<string, any>;
};

export const data: GeoDBRecord[] = [
  {
    id: 1,
    groupId: 1,
    x: 435172.47,
    y: 4537427.13,
    gz: 31.7,
    z: 30.7,
    meta: {},
    type: Items.LinePoint,
  },

  {
    id: 2,
    groupId: 1,
    x: 435142.58,
    y: 4537442.46,
    gz: 31.7,
    z: 30.7,
    meta: {},
    type: Items.LinePoint,
  },
  {
    id: 3,
    groupId: 1,
    x: 435164.04,
    y: 4537485.96,
    gz: 31.7,
    z: 30.7,
    meta: {},
    type: Items.LinePoint,
  },
];

export const dataToGeoJSON = (
  data: GeoDBRecord[]
): GeoJSON.FeatureCollection => {
  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  const groups: Record<number, GeoDBRecord[]> = {};

  data.forEach((record) => {
    if (record.type === Items.Point) {
      const feature: GeoJSON.Feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [record.x, record.y],
        },
        properties: {
          id: record.id,
          groupId: record.groupId,
          meta: record.meta,
        },
      };
      geojson.features.push(feature);
    } else if ([Items.LinePoint, Items.PolygonPoint].includes(record.type)) {
      if (!groups[record.groupId]) groups[record.groupId] = [record];
      else groups[record.groupId].push(record);
    }
  });

  Object.values(groups).forEach((group) => {
    const feature: GeoJSON.Feature = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: group.map((record) => [record.x, record.y]),
      },
      properties: {
        id: group[0].id,
        groupId: group[0].groupId,
        meta: group[0].meta,
      },
    };
    geojson.features.push(feature);
  });

  return geojson;
};
