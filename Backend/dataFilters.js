
const searchByProject = (query, projectName) => {
    if (projectName) {
        query.name = { $regex: new RegExp(projectName, 'i') };
    }
};

const searchByTechnology = (query, technologyName) => {
    if (technologyName) {
        query.technology = { $regex: new RegExp(technologyName, 'i') };
    }
};

const sortBy = (sort, sortByField, sortOrder) => {
    if (sortByField && sortOrder) {
        sort[sortByField] = sortOrder === 'desc' ? -1 : 1;
    }
};

const filterByDate = (query, filters) => {
    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }
  };
  

module.exports = { searchByProject, searchByTechnology, sortBy, filterByDate};
