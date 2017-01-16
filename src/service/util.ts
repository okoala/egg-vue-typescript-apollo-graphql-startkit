export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function eventPrevent (e: Event) {
  e.stopPropagation()
  e.preventDefault()
}

const startAt = +new Date()
export function trackLog (name: String, msg?: String) {
  const spendTime = (+new Date()) - startAt
  console.log(`===== ${name} =====:${spendTime}ms`)
  if (msg) {
    console.log(msg)
  }
}

export function toUpperCase (str: String): String {
  if (typeof str !== 'string') return str
  return str.toUpperCase()
}

export function toLowerCase (str: String): String {
  if (typeof str !== 'string') return str
  return str.toLowerCase()
}

export function rand( min, max ) {
  return Math.random() * ( max - min ) + min
}

export function hsla( h, s, l, a ) {
  return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')'
}
