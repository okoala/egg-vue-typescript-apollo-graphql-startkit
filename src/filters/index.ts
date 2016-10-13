import dateFormat from './dateFormat'

export * from './dateFormat'

export function toUpperCase (str: String): String {
  if (typeof str !== 'string') return str
  return str.toUpperCase()
}

export function toLowerCase (str: String): String {
  if (typeof str !== 'string') return str
  return str.toLowerCase()
}

export default function install (Vue) {
  Vue.filter('toUpperCase', toUpperCase)
  Vue.filter('toLowerCase', toLowerCase)
  Vue.filter('dateFormat', dateFormat)
}
