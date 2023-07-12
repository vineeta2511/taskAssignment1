const Technology = require('../models/techModel');

const getTech = async (req, res) => {
    const tech_info = await Technology.find();

    res.status(200).json(tech_info)

}

const addTech = async (req, res) => {
    try {
        const { name, status } = req.body;
        const imageUrl = req.file.path;
        let resources = req.body.resources || []
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
            resources,            status,
        });
        console.log("resources", resources)
        await technology.save();

        res.status(201).json({ message: 'Technology added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getTech, addTech }
