
const paginatedResults = (model, searchQuery, sortField, sortOrder) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const query = {};


        try {
            const totalItems = await model.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
            const data = await model.find().skip(skip).limit(limit)
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