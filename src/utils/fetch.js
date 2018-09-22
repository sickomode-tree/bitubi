import fetchDefaults from 'fetch-defaults'
import config from 'configs/constants'

const api = fetchDefaults(fetch, config.api.rootUrl)

export default api
