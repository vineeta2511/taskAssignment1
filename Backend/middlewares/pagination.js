// pagination.middleware.js
const { searchByProject, searchByTechnology, sortBy, filterByDate } = require('../dataFilters')

const paginatedResults = (model) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1;
            const skip = (page - 1) * limit;

            let query = {};

            searchByProject(query, req.query.project);
            searchByTechnology(query, req.query.technology);

            let sort = {};
            sortBy(sort, req.query.sortBy, req.query.order);


            filterByDate(query, req.query);

            const total = await model.countDocuments(query);
            const totalPages = Math.ceil(total / limit);

            const data = await model.find(query).sort(sort).skip(skip).limit(limit);

            res.paginatedResults = {
                data,
                page,
                limit,
                totalPages,
                total,
            };

            next();
        } catch (err) {
            res.status(500).json({ error: 'Failed to paginate results' });
        }
    };
};

module.exports = paginatedResults;
