const Technology = require("../../models/techModel");

const getTech = async () => {
  try {
    const technologies = await Technology.find();
    return technologies;
  } catch (error) {
    console.log("Error Message:", error);
    throw new Error(error.message);
  }
};

const getTechById = async (id) => {
  try {
    const tech_info = await Technology.findById(id);
    if (!tech_info) {
      throw new Error("Technology not found.");
    }
    return tech_info;
  } catch (error) {
    console.log("Error Message:", error);
    throw new Error("Internal server error.");
  }
};

const addTech = async (name, imageUrl, resources, status) => {
  try {
    const tech = await Technology.create({
      name,
      image: imageUrl,
      resources,
      status,
    });
    return tech;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error.");
  }
};

const updateTech = async (id, name, imageUrl, resources, status) => {
  try {
    const technology = await Technology.findById(id);
    if (!technology) {
      throw new Error("Technology not found.");
    }
    await Technology.findByIdAndUpdate(
      id,
      {
        name,
        image: imageUrl,
        resources,
        status,
      },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error.");
  }
};

const deleteTech = async (id) => {
  try {
    const deleteTechnology = await Technology.findByIdAndDelete(id);
    if (!deleteTechnology) {
      throw new Error("Technology not found.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error.");
  }
};

module.exports = {
    getTech, addTech, updateTech, deleteTech, getTechById 
};
