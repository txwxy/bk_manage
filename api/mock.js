import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from '././mockServerData/permission'
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

Mock.mock('/api/user/add','post',userApi.createUser)
Mock.mock('/api/user/edit','post',userApi.updateUser)
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock('/api/user/del','post',userApi.deleteUser)

// 权限相关
Mock.mock(/api\/permission\/getMenu/, 'post', permissionApi.getMenu)
