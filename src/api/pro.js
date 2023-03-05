import ajax from '../utils/request';
// 获取商品接口
export function proList (params) {
    return ajax({
        url: 'pro/list'
    })
}