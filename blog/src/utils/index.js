import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: { 'Authorization': 'token' },
})

export function getCategories(){
    return fetcher.get('/categories')
}

export function getPostCategory(category){
    return fetcher.get(`/${category}/posts`)
}

export function getPosts(){
    return fetcher.get('/posts')
}

export function makePost(data){
    return fetcher.post('/posts', data)
}

export function retrivePost(id){
    return fetcher.get(`/posts/${id}`)
}

export function votePost(id, data){
    return fetcher.post(`/posts/${id}`, data)
}

export function updatePost(id, data){
    return fetcher.put(`/posts/${id}`, data)
}

export function removePost(id){
    return fetcher.delete(`/posts/${id}`)
}

export function getCommentsPost(id){
    return fetcher.get(`/posts/${id}/comments`)
}

export function makeComment(data){
    return fetcher.post('/comments', data)
}

export function retriveComment(id){
    return fetcher.get(`/comments/${id}`)
}

export function voteComment(id, data){
    return fetcher.post(`/comments/${id}`, data)
}

export function updateComment(id, data){
    return fetcher.put(`/comments/${id}`, data)
}

export function removeComment(id){
    return fetcher.delete(`/comments/${id}`)
}
