/**
 *
 * @param {Array} metadata 元数据
 * @param {String} id 父标识字段名
 * @param {String} pid 子标识字段名
 */
function totree (metadata: any[], parentId: string = 'pid') {
  if (!metadata) {
    return []
  }
  const map: any = toMap(metadata, parentId)
  const arr: any[] = []
  let rootIndex
  for (const k of Object.keys(map)) {
    arr.push(k)
  }
  rootIndex = Math.min.apply(Math, arr)
  return findNodes(map[rootIndex], map)
}

function toMap (metadata: any[], parentId: string) {
  const map: any = {}
  if (metadata.length === 0) {
    return map
  }
  metadata.map(val => {
    let pid = val[parentId]
    if (pid !== null) {
      if (!map.hasOwnProperty(pid)) {
        map[pid] = [val]
      } else {
        map[pid].push(val)
      }
    } else if (pid === null && parentId === 'refereeId') {
      pid = 0
      if (!map.hasOwnProperty(pid)) {
        map[pid] = [val]
      } else {
        map[pid].push(val)
      }
    }
  })
  return map
}

function findNodes (arr: any[], map: any) {
  if (!arr) {
    return []
  }
  arr.map((val: any) => {
    if (map[val.id]) {
      //  存在子节点
      val.children = map[val.id]
      findNodes(val.children, map)
    }
  })
  return arr
}
export default totree
