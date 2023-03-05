<script>
// 在项目中，万物皆模块
import zfb from '../assets/zfb.jpg';

import { Fold, Expand } from '@element-plus/icons-vue';

// @ 符号代表的是 src 路径
import AsideCom from '@/components/AsideCom.vue';

import BreadcrumbCom from '@/components/BreadcrumbCom.vue';

export default {
  data(){
    return {
      url: zfb,
      collapse: false
    }
  },
  mounted() {
    console.log(this.$store.state.userInfo.adminname);
    if (!this.$store.state.userInfo.adminname) {
      // 用户没有登录
      this.$router.push('/login')
    }
  },
  computed: {
    headerLeft (){
      return this.collapse ? 'Expand' : 'Fold'
    },
    asideWidth() {
      return this.collapse ? '54px' : '200px'
    }
  },
  components: {
    Fold,
    Expand,
    AsideCom,
    BreadcrumbCom
  },
  methods: {
    setCount() {
      console.log(this.$store);
      // .commit 是用来执行同步操作用的
      // this.$store.commit('add')
      // dispatch 是用来执行 Actions 中的方法
      // this.$store.dispatch('addActions')

      // 同步传参
      // this.$store.commit('addnum', 8)

      // 异步传参
      this.$store.dispatch('addnumActions', 5)
    },
  logout() {
    localStorage.clear()
    this.$store.commit('updateUserInfo', {})
    this.$router.push('/login')
  }
  }
  
}

</script>

<template>
  <div class="common-layout">
    <el-container>

      <!-- 左侧侧边栏 -->
      <el-aside>

          <div class="logo-box">
            <el-image style="width: 32px; height: 32px;" :src="url"></el-image>
            <h2 class="manage-titles" v-show="!collapse">商品后台管理系统</h2>
          </div>

          <!-- 使用自定义组件 -->
          <!-- collapse 用来判断是否收起侧边栏的值 -->
          <AsideCom :collapse="collapse" />

      </el-aside>

      <!-- 右侧内容 -->
      <el-container>

        <!-- 头部 -->
        <el-header>
          <el-icon size="30" @click="collapse = ! collapse">
            <component :is="headerLeft"></component>
          </el-icon>

          <span> 欢迎 {{ $store.state.userInfo.adminname }} 
            <button @click="logout">退出</button>
          </span>

        </el-header>

        <!-- 主体 -->
        <el-main>

          <BreadcrumbCom />
          <!-- {{ $store.state.userInfo }}
          <br>
          Main

          {{ $store.state.count }}
          <button @click="setCount">修改全局状态的方法</button> -->

          <router-view></router-view>


        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

.el-container {
  background-color: #f8f9fa;

  .el-aside {
  background-color: #d0ebff;
  width: v-bind(asideWidth);
  transition: all 0.3s;

  .logo-box {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;

    .el-image {
      margin-right: 10px;
    }

    .manage-titles {
      font-size: 16px;

    }
  }
  }

  
}

.el-header {
  background-color: #ced4da;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
