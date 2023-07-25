
const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;

        try {
            const totalItems = await model.countDocuments();
            const itemsOnPage = Math.ceil(totalItems / limit);
            const data = await model.find().skip(skip).limit(limit);
            res.paginationResults = {
                currentPage: page,
                itemsOnPage,
                totalItems,
                data
            };
            //console.log("object:",paginationResults);
            next();
        } catch (error) {
            console.log(error)
            res.status(500).json({ Message: "Internal server error." })
        }
    }
}


module.exports = paginatedResults;