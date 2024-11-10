import { useGisStore } from "@/stores/gis/gis-store";

const Layers = () => {
  const gis = useGisStore();
  return (
    <div className="fixed bottom-4 left-4 p-4 bg-white shadow-md z-50">
      Layers
      {gis.layers.map((layer) => (
        <div key={layer.name} className="flex items-center space-x-2">
          <label>
            <input
            className="mr-2"
              type="checkbox"
              checked={layer.visible}
              onChange={() =>
                layer.visible
                  ? gis.hideLayer(layer.name)
                  : gis.showLayer(layer.name)
              }
            />
            <span>{layer.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Layers;
