import _ from 'lodash'
import {getFormattedValue} from './form'

export const queryArrayByKey = (array, key) => {
  const isArray = _.isArray(array)
  let items = []

  if (isArray) {
    array.forEach(item => {
      if (!_.find(items, item[key])) {
        items.push(item[key])
      }
    });
  }

  return items
}

export const getValues = (array, key) => {
  let values = []

  values = _.uniq(array.map(item => getObjectValue(item, key)))

  return values
}

export const getObjectValue = (object, path, type) => {
  let value = object

  path.split('.').forEach(key => {
    if (value) {
      value = value[key]
    }
  })

  if (!_.isNil(object) && !_.isNil(type)) {
    value = getFormattedValue(value, type)
  }

  return value
}
