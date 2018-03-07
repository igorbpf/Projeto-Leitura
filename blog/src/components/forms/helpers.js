export const validatePost = (values) => {
    const errors = {}
    if (!values.category){
        errors.category = "Required"
    }
    if (!values.title){
        errors.title = "Required"
    }
    if (!values.body){
        errors.body = "Required"
    }
    if (!values.author){
        errors.author = "Required"
    }
    return errors
}

export const validateComment = (values) => {
    const errors = {}
    if (!values.body){
        errors.body = "Required"
    }
    if (!values.author){
        errors.author = "Required"
    }
    return errors
}
