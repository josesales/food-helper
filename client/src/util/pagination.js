
const pagination = (currentPage = 0, limit = 4, total = 0, sortBy = 'createdAt_desc') => {

    return {
        currentPage,
        limit,
        total,
        skip: limit * currentPage,
        sortBy
    }
}

export default pagination;