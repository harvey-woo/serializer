import { UnserializeOptions, RequiredDeep } from './type'
const defaultOptions:  UnserializeOptions = {
  keyNames: { ctorName: '_is', id: '_id', refId: '_ref', ivoker: '_ivk', patchId: '_pid' },
  classes: {}
}
type UnserializeCacheMap = {
  [id: string]: any
}
type InnerOptions = RequiredDeep<UnserializeOptions>
export default class Unserializer {
  private __map__:UnserializeCacheMap = {}
  unserialize(target: any, options ?: UnserializeOptions) {
    return this._unserialize(target, {
      ...defaultOptions, 
      ...(options || {})
    } as InnerOptions)
  }
  private _unserialize(target:any, options: InnerOptions): any {
    const { ctorName: ctorNameKey, id: idKey, refId: refIdKey, ivoker: ivokerKey, patchId: patchIdKey } = options.keyNames
    const classes = options.classes
    const isObject = target && typeof target === 'object'
    if (!isObject) {
      return target
    }
    if (idKey in target) {
      let result: any
      if (ivokerKey in target) {
        return undefined
      }
      if (target[ctorNameKey] === 'Array') {
        result = []
        this.__map__[target[idKey]] = result
        for (let i = 0; `${i}` in target; i++) {
          result[i] = this._unserialize(target[i], options)
        }
        return result
      }
      if (target[ctorNameKey] && classes[target[ctorNameKey]]) {
        result = Object.create(classes[target[ctorNameKey]].prototype)
      } else {
        result = {}
      }
      this.__map__[target[idKey]] = result
      for (let i in target) {
        if (i !== ctorNameKey && i !== idKey && i !== refIdKey && i !== ivokerKey) {
          result[i] = this._unserialize(target[i], options)
        }
      }
      return result
    }
    if (refIdKey in target) {
      let result = this.__map__[target[refIdKey]]
      if (!result) {
        return target
      }
      for (let i in target) {
        if (i !== ctorNameKey && i !== idKey && i !== refIdKey && i !== ivokerKey) {
          result[i] = this._unserialize(target[i], options)
        }
      }
      return result
    }
  }
}