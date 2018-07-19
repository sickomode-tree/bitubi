import _ from 'lodash'

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
  console.log(values)

  return values
}

export const getObjectValue = (object, path) => {
  let value = object

  path.split('.').forEach(key => {
    if (value) {
      value = value[key]
    }
  })

  return value
}
