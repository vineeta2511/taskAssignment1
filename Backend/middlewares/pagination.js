const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        try {
            const totalItems = await model.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);

            const data = await model.find().skip(skip).limit(limit);

            res.paginationResults = {
                currentPage: page,
                totalPages,
                totalItems,
                data
            };
        
            next();
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error." })
        }
    }
}
module.exports = paginatedResults;