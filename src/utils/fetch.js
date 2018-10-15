import fetchDefaults from 'fetch-defaults'
import config from 'configs/constants'
import {getToken} from 'utils/auth'

const api = fetchDefaults(fetch, config.api.rootUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${getToken()}`,
  }
})

export const rootUrl = config.api.rootUrl
export const scope = config.api.scope

export default api
