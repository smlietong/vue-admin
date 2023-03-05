<script>

import { ElMessage } from 'element-plus';

import md5 from 'md5';

import axios from 'axios'

// 导入数据请求的方法
import {loginFn} from '@/api/user'

import {mapState, mapMutations} from 'vuex'

export default {
  name:'LoginView',
  // 因为要让每个组件都有自身独立的数据
  data() {
    return {
      adminname: '',
      password: '',
    }
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    submitForm() {
      // console.log('被调用了',this.adminname,this.password);

      // if(this.adminname.length < 5) {
      //   // 长度不够
      //   ElMessage.error('管理员账号要大于 5 位')

      //   // 让代码不再执行
      //   return
      // }

      // if (!/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(this.password)) {

      //   ElMessage.error('密码至少6位，包含至少一个数字，一个小写字母，一个大写字母，一个特殊字符')


      //   return
      // }

      // console.log(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(this.password));


      // console.log(md5('123456'));
      // 发送数据请求
      // axios.get('http://121.89.205.189:3000/api/pro/list')
      // .then(res => {
      //   console.log(res);
      // })

      loginFn({
        adminname: this.adminname,
        password: this.password
      }).then(res => {
        console.log(res);
        if (res.code === '10005') {
          // 未注册
          ElMessage.error(res.message)
          return
        }else if (res.code === '1003') {
          // 密码错误
          ElMessage.error(res.message)
          return
        } else {

          // 第一种修改数据的方法
          // this.$store.commit('updateUserInfo', res.data)
          // 第二种修改数据的方法
          this.updateUserInfo(res.data)

          // 将 token 存到本地
          localStorage.setItem('token', res.data.token)

          // this.$router 是我们的路由对象
          // .push 需要进入到哪个路由
          this.$router.push('/')
          // console.log(this.$router);
        }
      })

    }
  }
}

</script>

<template>
  <div class="login-container">
    <div class="form-warp">
      <h2 class="header">商品后台管理系统</h2>

    <el-input v-model="adminname" placeholder="请输入管理员账号" />
    <el-input class="psw" show-password type="password" v-model="password" @keyup.enter="submitForm" placeholder="请输入密码" />

    <el-button type="success" @click="submitForm">登录</el-button>
    </div>

  </div>
</template>

<style lang="scss" scoped>

.login-container {
  height: 100%;
  background-color: #dbe4ff;

  .form-warp{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 15px;
    padding: 32px 32px 20px;

    .header{
      text-align: center;
      margin-bottom: 32px;
    }

    .psw {
      margin-top: 15px;
    }

    .el-button{
      width: 100%;
      margin-top: 20px;
    }
  }

}

</style>


