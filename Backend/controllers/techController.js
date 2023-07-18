const Technology = require('../models/techModel');

const getTech = async (req, res) => {
    const tech_info = await Technology.find();

    res.status(200).json(tech_info)

}

const getTechById = async (req, res) => {
    const { id } = req.params;
    const tech_info = await Technology.findById(id);
    if (!tech_info) {
        res.status(404).json({ message: 'Technology not found' })
    }
    res.status(200).json(tech_info);
}

const addTech = async (req, res) => {
    try {
        const { name, status } = req.body;
        const imageUrl = req.file.path;
        let resources = req.body.resource
        // if (Array.isArray(req.body.resources)) {
        //     resources = req.body.resources.map((resource) => {
        //         { link: resource };
        //     });
        // } else if (req.body.resources) {
        //     const resourcesLinks = req.body.resources.split(',');
        //     resources = resourcesLinks.map((resource) => {
        //         { link: resource.trim() }  
        //     })
        // }


        const technology = new Technology({
            name,
            image: imageUrl,
            resources,
            status,
        });
        console.log("resources", technology)
        await technology.save();

        res.status(201).json({ message: 'Technology added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTech = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const imageUrl = req.file.path;
        const resources = req.body.resource;

        const updatedTechnology = await Technology.findByIdAndUpdate(id,
            {
                name,
                image: imageUrl,
                resources,
                status
            }, { new: true }
        );
        if (updatedTechnology) {
            res.status(404).json({ message: 'Tecchnology not found.' })
        }
        res.status(200).json({ message: 'technology updated succesfully.' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const deleteTech = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTechnology = await Technology.findByIdAndDelete(id);

        if (!deletedTechnology) {
            res.status(404).json({ mesaage: 'Technology not found.' })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}
module.exports = { getTech, addTech, updateTech, deleteTech, getTechById }

