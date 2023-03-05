// 导入我们封装的 axios
import ajax from '@/utils/request'

// 获取轮播图
export function getBannerList () {
    return ajax({
        url: '/banner/list'
    })
}

// 添加轮播图
export function addBanner (params) {
    return ajax({
        url: '/banner/add',
        method: 'post',
        data: params
    })
}