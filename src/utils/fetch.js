import fetchDefaults from 'fetch-defaults'
import axios from 'axios'
import config from 'configs/constants'
import {getToken} from 'utils/auth'

const api = fetchDefaults(fetch, config.api.rootUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${getToken()}`,
  }
})

axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

export const rootUrl = config.api.rootUrl
export const scope = config.api.scope

export default api
