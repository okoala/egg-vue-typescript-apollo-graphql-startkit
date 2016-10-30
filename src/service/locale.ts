import * as util from 'util'
import { isObject } from './util'

const ARRAY_INDEX_RE = /\{(\d+)\}/g;
export function formatWithArray (text, values) {
  return text.replace(ARRAY_INDEX_RE, function (orignal, matched) {
    const index = parseInt(matched)
    if (index < values.length) {
      const value = values[index]
      return getLocaleText(value)
    }
    // not match index, return orignal text
    return orignal
  })
}

const OBJECT_INDEX_RE = /\{(.+?)\}/g;
export function formatWithObject (text, values) {
  return text.replace(OBJECT_INDEX_RE, function (orignal, matched) {
    const value = values[matched]
    if (value) {
      return getLocaleText(value)
    }
    // not match index, return orignal text
    return orignal
  })
}

export function getLocaleText (key, value?) {
  const resource = typeof window !== 'undefined' && (<any>window)._LOCALES
  let text = resource[key]
  if (text === undefined) {
    text = key
  }

  if (!text) {
    return ''
  }

  if (arguments.length === 1) {
    // __(key)
    return text
  }
  if (arguments.length === 2) {
    if (isObject(value)) {
      // __(key, object)
      // __('{a} {b} {b} {a}', {a: 'foo', b: 'bar'})
      // =>
      // foo bar bar foo
      return formatWithObject(text, value)
    }

    if (Array.isArray(value)) {
      // __(key, array)
      // __('{0} {1} {1} {0}', ['foo', 'bar'])
      // =>
      // foo bar bar foo
      return formatWithArray(text, value)
    }

    value = getLocaleText(value)
    // __(key, value)
    return util.format(text, value)
  }

  // __(key, value1, ...)
  const args = new Array(arguments.length)
  args[0] = text
  for (let i = 1; i < args.length; i++) {
    args[i] = arguments[i]
  }
  return util.format.apply(util, args)
}

export const __ = getLocaleText
