
const pagination = (currentPage = 0, limit = 2, total = 0, sortBy = 'createdAt_desc') => {

    return {
        currentPage,
        limit,
        total,
        skip: limit * currentPage,
        sortBy
    }
}

export default pagination;