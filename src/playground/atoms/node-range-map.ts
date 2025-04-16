import { atom } from "recoil"
import { Range } from "monaco-editor"

export type NodeRangeMap = Record<string, Range[]>

export const nodeRangeMapState = atom<NodeRangeMap>({
  key: "nodeRangeMapState",
  default: {},
})
