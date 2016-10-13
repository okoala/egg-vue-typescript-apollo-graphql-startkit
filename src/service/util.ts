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
