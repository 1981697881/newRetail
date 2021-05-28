import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
// 商品分类-获取列表
export function findClassification(params, data) {
  const url = '/goodsClassification/findClassification/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 商品分类-删除
export function deleteClassification(params) {
  const url = '/goodsClassification/deleteClassification'
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}

// 商品分类-添加
export function addClassification(params) {
  return request({
    url: '/goodsClassification/addClassification',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 商品分类-查询
export function Classification(params) {
  return request({
    url: '/app/api/Classification',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 商品-获取列表
export function getSpuListList(params, data) {
  const url = '/spu/spuList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 商品-删除
export function deleteSpu(params) {
  const url = '/spu/deleteSpu'
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}

// 商品-添加
export function addSpu(params) {
  return request({
    url: '/spu/addSpu',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 商品尺码-颜色-查询
export function submesList(params) {
  return request({
    url: '/submesType/submesList',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}
// 商品-修改
export function updateSpu(params) {
  return request({
    url: '/spu/updateSpu',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

// 商品规格-查询
export function findSkuBySpuId(data) {
  const url = '/spu/selectUpdateSpu'
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}

// 商品规格-删除
export function deleteSku(params) {
  const url = '/sku/deleteSku'
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}

// 商品规格-添加
export function addSku(params) {
  return request({
    url: '/sku/addSku',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    data: params,
    method: 'post'
  })
}

// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('nrrx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('nrrx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('nrrx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('nrrx')
    },
    method: 'delete',
  })
}
