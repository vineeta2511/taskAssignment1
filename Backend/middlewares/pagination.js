
const paginatedResults = (model, searchQuery, sortField, sortOrder) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const query = {};

        if (searchQuery) {
            const caseInsensitiveSearch = new RegExp(searchQuery, 'i')
            query.$or = [
                { username: caseInsensitiveSearch },
                { role: caseInsensitiveSearch },
                { email: caseInsensitiveSearch },
            ]
        }
        const filterField = identifyFilterField(model);
        if (filterField) {
            const filterValue = req.query[filterField];
            if (filterValue) {
                query[filterField] = filterValue;
            }
        }

        try {
            const totalItems = await model.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);

            const sort = {};
            if (sortField && sortOrder) {
                sort[sortField] = sortOrder === 'desc' ? -1 : 1;
            }

            const data = await model
                .find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit);

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

const identifyFilterField = (model) => {
    const modelFilterfields = {
        User: ['username', 'role'],
        Technology: ['name', 'status'],
        Project: ['title', 'requirement', 'timeline', 'startDate', 'endDate', 'documents', 'members', 'technologyStack', 'createdBy']
    }
return modelFilterfields[model.modelName] ;
}
module.exports = paginatedResults