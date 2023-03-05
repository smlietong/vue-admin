// 导入我们封装的 axios
import ajax from '@/utils/request'

// 管理系统登录接口的封装
export function loginFn (params) {
    return ajax({
        method: 'post',
        url: '/admin/login',
        data: params
    })
}


// 获取管理员列表
export function adminList() {
    return ajax({
        url: '/admin/list',
        method: 'get',
    })
}

// 添加管理员
export function addAdmin(params){
    return ajax({
        url: '/admin/add',
        method: 'post',
        data: params
    })
}

// 修改管理员信息
export function updataAdmin (params) {
    return ajax({
        url: '/admin/update',
        method: 'post',
        data: params
    })
}

// 删除管理员
export function deleteAdmin (params) {
    return ajax({
        url: '/admin/delete',
        method: 'post',
        data: params
    })
}

// 获取用户列表
export function getUserList() {
    return ajax({
        url: '/user/list',
        
    })
}