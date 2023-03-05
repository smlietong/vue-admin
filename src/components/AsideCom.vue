<script >
import { Avatar } from '@element-plus/icons-vue';
import { PictureFilled } from '@element-plus/icons-vue';
import { mapState } from 'vuex';

export default {
    data(){
        return {

        }
    },
    computed: {
      ...mapState(['currentPath', 'userInfo'])
    },
    props: ['collapse'],
    components: {
        Avatar,
        PictureFilled
        
    },
    mounted () {
      console.log(this.userInfo);
    }
}
</script>


<template>
    <el-menu :default-active="currentPath" :collapse="collapse" router class="el-menu-vertical-demo">

        <el-menu-item index="/">首页</el-menu-item>

        <el-sub-menu v-for="item in userInfo.checkedkeys" :key="item.path" :index="item.path">
            <template #title>
              <el-icon>
                <Avatar />
              </el-icon>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item 
            v-for="child in item.children" 
            :key="child.path" 
            :index="`/${item.path}/${child.path}`">
              {{ child.label }}
            </el-menu-item>
          

        </el-sub-menu>
      

      <!-- <el-sub-menu index="/manager">
            <template #title>
            <el-icon>
              <Avatar />
            </el-icon>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/manager/managerlist">管理员列表</el-menu-item>
          <el-menu-item index="/manager/userlist">用户列表</el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="/banner">
            <template #title>
            <el-icon>
              <PictureFilled />
            </el-icon>
            <span>轮播图管理</span>
          </template>
          <el-menu-item index="/banner/bannerlist">轮播图列表</el-menu-item>
          <el-menu-item index="/banner/addbanner">添加轮播图</el-menu-item> 

        </el-sub-menu>

          
          -->

        </el-menu>
</template>