const queryString = (path, query) => {
  let items = Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`)
  if(!items.length)
    return path

  return `${path}?${items.join('&')}`
}

const request = async (method, path, body = {}, query = {}) => {
  let attr = {
    method,
    headers: {}
  }
  
  if(method !== 'get') {
    attr.headers['Content-Type'] = 'application/json;charset=utf-8'
    attr.body = JSON.stringify(body)
  }

  if(localStorage.token)
    attr.headers['Authorization'] = `Bearer ${localStorage.token}`
    
  let res = await fetch(queryString(path, query), attr)

  let data = await res.json()

  if(res.status !== 200)
    throw data

  return data
} 

export default {
  get: (path, query) => request('get', path, {}, query),
  post: (path, body, query) => request('post', path, body, query),
  put: (path, body, query) => request('put', path, body, query),
  delete: (path, body, query) => request('delete', path, body, query),
  request
}