export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'basic': () => import('@/layout'),
  'commodity': () => import('@/views/basic/commodity'),
  'specifications': () => import('@/views/basic/specifications'),
  'clerk': () => import('@/views/basic/clerk'),

  'order': () => import('@/views/order/order'),

  'memberInformation': () => import('@/views/member/memberInformation'),

  'users': () => import('@/views/system/users'),
}
