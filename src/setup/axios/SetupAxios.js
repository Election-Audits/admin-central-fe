export default function setupAxios(axios, store) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
      (config) => {
        const {
          auth: {accessToken},
        } = store.getState()
  
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
  
        return config
      },
      (err) => Promise.reject(err)
    )
  }
  