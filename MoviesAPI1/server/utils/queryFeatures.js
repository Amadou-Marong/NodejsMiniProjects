// query feautures component
export const queryFeatures = (model, queryParams) => {
    // Destructure the query parameters
    let {sort, fields, page = 1, limit = 10, ...filters} = queryParams

    // Convert query parameters to mongoDB query
    let queryStr = JSON.stringify(filters).replace(
        /\b(gt|gte|lt|lte)\b/g,
        match => `$${match}`
    )

    filters = JSON.parse(queryStr)

    // create mongoDB query
    let query = model.find(filters)

    // Sorting
    if(sort) {
        const sortBy = sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }
   
    // Field Selection
    if(fields) {
        const selectedFields = fields.split(',').join(' ')
        query = query.select(selectedFields)
    } else {
        query = query.select('-__v')
    }

    // Pagination
    page = Number(page)
    limit = Number(limit)
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    return {query, page, limit, filters}
}