import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 订单-获取列表
export function getOrderList(params, data) {
  const url = '/memberOrder/orderList/' + params.pageNum + '/' + params.pageSize
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
// 订单-确认
export function confirmOrder(params) {
  const url = '/memberOrder/confirmOrder'
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
// 订单-查询明细
export function findDetails(params) {
  const url = '/memberOrderDetails/findDetails '
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
