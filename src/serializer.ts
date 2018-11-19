
import { SerializeOptions, RequiredDeep, SerializePatch, SerializeRef, SnapshootResult } from './type'
const defaultOptions = {
  keyNames: { ctorName: '_is', id: '_id', refId: '_ref', ivoker: '_ivk', patchId: '_pid' }
}
type InnerOptions = RequiredDeep<SerializeOptions>
export default class Serializer {
  private __snapshootResults__: WeakMap<any, SnapshootResult> = new WeakMap()
  private __id__ = 0
  serialize(target: any, options?: SerializeOptions) {
    return this._serialize(target, {
      ...defaultOptions,
      ...(options || {})
    } as InnerOptions, new WeakMap())
  }
  private _serialize(target: any, options: InnerOptions, __seen__: WeakMap<any, 1>) {
    const { ctorName: ctorNameKey, id: idKey, refId: refIdKey, ivoker: ivokerKey, patchId: patchIdKey } = options.keyNames!
    const isFunction = typeof target === 'function'
    const isObjectLike = target && (typeof target === 'object' || isFunction)
    if (!isObjectLike) {
      return target
    }
    if (__seen__.has(target)) {
      return this.__snapshootResults__.get(target)!.ref
    }
    __seen__.set(target, 1)
    let result: SerializeRef | SerializePatch
    let snapshootResult = this.__snapshootResults__.get(target) as SnapshootResult
    if (snapshootResult) {
      Object.keys(target).forEach(key => {
        if (snapshootResult.snapshoot[key] !== target[key]) {
          if (!result) {
            result = {
              [refIdKey]: snapshootResult.ref[refIdKey],
              [patchIdKey]: snapshootResult.patch++
            }
          }
          snapshootResult!.snapshoot[key] = target[key]
          result[key] = this._serialize(target[key], options, __seen__)
        }
      })
      result = result! || snapshootResult.ref
    } else {
      result = {
        [idKey]: this.__id__++
      }
      const snapshootResult: SnapshootResult = {
        patch: 0,
        ref: { [refIdKey]: result[idKey] },
        snapshoot: isFunction ? target : {}
      }
      if (target.constructor.name !== 'Object' && !isFunction) {
        result[ctorNameKey] = target.constructor.name
      }
      let snapshoot = snapshootResult.snapshoot
      this.__snapshootResults__.set(target, snapshootResult)
      if (isFunction) {
        result[ivokerKey] = target + ''
      } else {
        Object.keys(target).forEach(key => {
          snapshoot[key] = target[key]
          result[key] = this.serialize(target[key], options)
        })
      }
    }
    return result
  }
}