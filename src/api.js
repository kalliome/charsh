let processQuery = (path, query) => {
  if (Object.keys(query).length) {
    let queryParts = []

    for (let key in query) {
      let value = query[key]
      if(Array.isArray(value)) {
        value.forEach(val => queryParts.push(key + '[]=' + encodeURIComponent(val)))
      } else {
        queryParts.push(key + '=' + encodeURIComponent(value))
      }
    }

    path = `${path}?${queryParts.join('&')}`
  }

  return path.charAt(0) !== '/' ? '/' + path : path
}

export default function api(method, path, params = {}, data = {}) {
  path = processQuery(path, params)

  let options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  if(!['GET', 'HEAD'].includes(method)) {
    options.body = data
    delete options.headers
  }

  return fetch(path, options)
    .then(res => {
      if(res.status !== 200)
        throw res

      return res.json()
    })
    .catch(err => Promise.resolve(err.json ? err.json() : err)
    .then(data =>{
      data._apierror = true
      data.status = err.status
      throw data
    }))
}