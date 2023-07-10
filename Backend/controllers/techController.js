const Technology = require('../models/techModel');

const addTech = async (req, res) => {
    try {
        const { name, resources, status } = req.body;
        const imageUrl = req.file.path;

        // Create a new technology
        const technology = new Technology({
            name,
            image: imageUrl,
            resources: JSON.parse(resources),
            status,
        });  
console.log("resources", resources)
        await  technology.save();

        res.status(201).json({ message: 'Technology added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { addTech }
