const{
    getTech, addTech, updateTech, deleteTech, getTechById 
} = require ('./techServices');

const getTechController = async (req, res) => {
    try {
      const technologies = await getTech();
      res.status(200).json(technologies);
    } catch (error) {
      console.log('Error Message:', error.message);
      res.status(500).json({ Message: 'Internal server error.' });
    }
  };

  const getTechByIdController = async (req, res) => {
    try {
      const tech_info = await getTechById(req.params.id);
      res.status(200).json(tech_info);
    } catch (error) {
      console.log("Error Message:", error.message);
      res.status(404).json({ Message: "Technology not found." });
    }
  };

  const addTechController = async (req, res) => {
    try {
      const { name, status } = req.body;
      const imageUrl = req.file.path;
      const resources = req.body.resource;
  
      const tech = await addTech(name, imageUrl, resources, status);
  
      res.status(201).json(tech);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ Message: 'Internal server error.' });
    }
  };

  const updateTechController = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const imageUrl = req.file.path;
      const resources = req.body.resource;
  
      await updateTech(id, name, imageUrl, resources, status);
  
      res.status(200).json({ Message: 'Technology updated successfully.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Message: 'Internal server error.' });
    }
  };

  const deleteTechContoller = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTech(id);
  
      res.status(200).json({ Message: 'Technology deleted successfully.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Message: 'Internal server error.' });
    }
  };

  module.exports = { getTechController,getTechByIdController,addTechController,updateTechController,deleteTechContoller};
