const Technology = require('../models/techModel');

const getTech = async (req, res) => {
    try {
        const technologies = await Technology.find();
     
        res.status(200).json(technologies);
    } catch (err) {
        console.log('Error Message:', err);
        res.status(500);
        throw new Error(err.message);
    }
}

const getTechById = async (req, res) => {  
    try {
        const tech_info = await Technology.findById(req.params.id);
        if (!tech_info) {
            res.status(404);
            throw new Error("Technology not found.");
        }
        
        res.status(200).json(tech_info);
    }
    catch (err) {
        console.log("Error Message:",err);
        res.status(500).json({ Message1: "Internal server error." })
    }
};

const addTech = async (req, res) => {
    try {
        const { name, status } = req.body;
        const imageUrl = req.file.path;
        let resources = req.body.resource
        // const techName = await Technology.findOne({ name });
        // if (techName) {
        //     res.status(400).json({ Message: "Technology with this Name exists already." })
        // }

        const tech= await Technology.create({
            name,
            image: imageUrl,
            resources,
            status,
        });

        res.status(201).json(tech);
    } catch (err) {
        console.log(err);
        res.status(500).json({ Message2: 'Internal server error.' });
    }
};

const updateTech = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const imageUrl = req.file.path;
        const resources = req.body.resource;

        const technology = await Technology.findById(id);
        if (!technology) {
            res.status(404);
            throw new Error("Technology not found.")
        }
        await Technology.findByIdAndUpdate(id,
            {
                name,
                image: imageUrl,
                resources,
                status
            }, { new: true }
        );

        res.status(200).json({ Message: 'Technology updated succesfully.' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message3: 'Internal server error.' });
    }
}
const deleteTech = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTechnology = await Technology.findById(id);

        if (!deleteTechnology) {
            res.status(404);
            throw new Error('Technology not found.')
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ Message4: 'Internal server error.' })
    }
}
module.exports = { getTech, addTech, updateTech, deleteTech, getTechById }
