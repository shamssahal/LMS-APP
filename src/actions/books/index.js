//features
export const BOOK = `BOOK`;
export const BOOKS = `BOOKS`;
export const BOOK_COVER_PRESIGNED_URL = `BOOK_COVER_PRESIGNED_URL`;

//action types
export const GET_BOOKS = `${BOOKS}_GET`;
export const SET_BOOKS = `${BOOKS}_SET`;

export const GET_BOOK = `${BOOK}_GET`;
export const SET_BOOK = `${BOOK}_SET`;

export const BOOK_CREATE = `${BOOK}_CREATE`;
export const BOOK_UPDATE = `${BOOK}_UPDATE`;
export const BOOK_DELETE = `${BOOK}_DELETE`;

export const BOOK_ALLOCATE = `${BOOK}_ALLOCATE`;
export const BOOK_DEALLOCATE = `${BOOK}_DEALLOCATE`;

export const BOOK_COVER_PRESIGNED_URL_GET = `${BOOK_COVER_PRESIGNED_URL}_GET`;
export const BOOK_COVER_PRESIGNED_URL_SET = `${BOOK_COVER_PRESIGNED_URL}_SET`;


//action creators
export const getAllBooks = () =>({
    type:GET_BOOKS,
    payload:{}
})

export const setAllBooks = (data) =>({
    type:SET_BOOKS,
    payload:data
})

export const getBook = (data) =>({
    type:GET_BOOK,
    payload:data
})

export const setBook = (data) =>({
    type:SET_BOOK,
    payload:data
})

export const createBook = (data) =>({
    type:BOOK_CREATE,
    payload:data
})

export const updateBook = (data) =>({
    type:BOOK_UPDATE,
    payload:data
})

export const deleteBook = (data) =>({
    type:BOOK_DELETE,
    payload:data
})

export const allocateBook = (data) =>({
    type:BOOK_ALLOCATE,
    payload:data
})

export const deallocateBook = (data) =>({
    type:BOOK_DEALLOCATE,
    payload:data
})

export const getBookCoverPresignedUrl = (data) =>({
    type:BOOK_COVER_PRESIGNED_URL_GET,
    payload:data
})

export const setBookCoverPresignedUrl = (data) =>({
    type:BOOK_COVER_PRESIGNED_URL_SET,
    payload:data
})

