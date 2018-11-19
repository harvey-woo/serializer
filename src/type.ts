export type Constructor = { new (...args: any[]): any }
export type ObjectLike = object | Function

export type RequiredDeep<T> = {
  [P in keyof T]-?: T[P] extends Function ? T[P] : RequiredDeep<T[P]>
}
export type SnapshootResult = {
  patch: number,
  ref: SerializeRef,
  snapshoot: { [key: string]: any }
}
export interface SerializeOptions {
  keyNames?: {
    ctorName?: string,
    id?: string,
    refId?: string,
    ivoker?: string,
    patchId?: string
  }
}
export interface UnserializeOptions extends SerializeOptions {
  classes?: { [constructorName: string]: Constructor }
}
export interface SerializeRef {
  [key: string]: any
}
export interface SerializePatch extends SerializeRef {
  [key: string]: any
}