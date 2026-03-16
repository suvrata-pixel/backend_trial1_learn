const Pet = require("../models/Pet");

// GET all pets
exports.getItems = async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
        query.name = { $regex : name, $options : "i"};
    }
    const pets = await Pet.find(query);
    res.json(pets);
    }
    catch (error) {
        res.status(500).json({message : error.message})
    }
};

// CREATE pet
exports.createItem = async (req, res) => {
  try {
    const { name, type } = req.body;

    const newPet = await Pet.create({ name,
        type,
        image : req.file ? req.file.filename : null });

    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE pet
exports.updateItem = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE pet
exports.deleteItem = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);

    if (!deletedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};