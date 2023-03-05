import { createStore } from 'vuex';

// 导入数据持久化操作
import createPersistedState from "vuex-persistedstate";



// 定义一个全局状态
const store = createStore({
    // 严格模式，在生产环境中不要打开
    strict: process.env.NODE_ENV !== 'production',
    state () {
      return {
        // 全局状态
        count: 100,
        // 放用户信息的对象
        userInfo: {},
        // 记录当前的路由路径
        currentPath: '/'
      }
    },
    // 唯一修改数据的方法
    mutations: {
      add (state) {
        state.count++
      },
      addnum(state, value) {
        state.count += value
      },
      //   保存用户数据
      updateUserInfo(state, value){
        state.userInfo = value
      },
      // 修改路由路径的方法
      updateCurrentPath (state, value) {
        state.currentPath = value
      }
    },
    // 异步修改数据的方法
    actions: {
        addActions(context){
            console.log(context);

            // 所谓的异步也还要调用同步的方法进行修改数据
            setTimeout(() => {
                context.commit('add')
            }, 5000);
            
        },
        addnumActions({commit}, value){
            commit('addnum', value)
        }
    },
    // vuex 中的计算属性
    getters: {

    },
    // 状态模块
    modules: {

    },
    // vuex 配置插件
    plugins: [
      // 创建持久化对象
      createPersistedState({
        // 配置需要持久化的数据
        reducer: state => {
          return {
            // 需要持久化的数据
            userInfo: state.userInfo
          }
        }
      })
    ]
      
    
  })

// 导出创建好的实例
export default store
  