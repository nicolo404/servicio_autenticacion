import Location from "../Models/LocationModel.js";

export const newLocation = async (req, res) => {
  const { name, description, image } = req.body;
  const newLocation = new Location({
    name,
    description,
    image,
  });
  newLocation
    .save()
    .then(res.status(201).json({ msg: "Ubicación creada correctamente" }))
    .catch((error) => {
      res
        .status(400)
        .json({ msg: "Error al crear la ubicación", error: error });
    });
};

export const getLocations = async (req, res) => {
  const locations = await Location.find();
  if (!locations || locations.length === 0) {
    return res.status(404).json({ msg: "No hay ubicaciones" });
  }
  res.json(locations);
};
