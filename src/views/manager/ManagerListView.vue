<script>

import { adminList, addAdmin, updataAdmin, deleteAdmin } from '@/api/user'

import { routes } from '@/router/index.js'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            tableData:[],
            // 当前页
            currentPage: 1,
            // 是否打开抽屉
            drawer: false,
            // 路由信息
            menus: routes[0].children,
            // 管理员数据
            formData: {
                adminname: '',
                password: '',
                role: '',
                checkedKeys: ''
            },
            // 默认选中项
            defaultCheckedKeys: [],
            interfaceType: '10086', // 10086 添加管理员   10010  编辑管理员
        }
    },
    methods: {

        addClick(){
            this.interfaceType = '10086'
            this.drawer = true
        },

        // 获取树形结构中选中的值
        formatCheckedKeys(){
            // console.log(this.$refs.treeRef.getCheckedNodes(true));
            // 根据选中的值得到父级路由
            const list = this.$refs.treeRef.getCheckedNodes(true)

            // 用来放父级路由的 label 用的
            const tempList = []

            // 最终结果用的
            const result = []

            // list: 是我们选中的子路由
            list.forEach(item => {
                // parent：选中后子路的父级路由
               const parent = this.menus.find(mitem => {
                    return mitem.children.some(child => child.label == item.label)
                })
                // console.log('1111',parent);

                // 判断当前父级路由是否在 tempList 中已经有了
                // 2.第二次遍历用户列表的时候发现 tempList 中已经有了父级路由
                if (tempList.includes(parent.label)) {
                    // 就直接找到父级路由，在子路由中再添加一个子路由
                    result.find(item => item.label == parent.label).children.push(item)
                } else {
                    // 将对应的内容放在 tempList 中
                    // console.log(parent.label);
                    tempList.push(parent.label)

                    result.push({
                        label: parent.label,
                        path: parent.path,
                        children: [item]
                    })

                }

                console.log(result);
                // 将路由的权限添加到 formData 中
                this.formData.checkedKeys = result

            })
        },
        add () {

            

            // 将管理员数据发送给服务器
            // 1.收集数据
            // console.log(this.formData);

            // 获取所有权限路由
            this.formatCheckedKeys()
            
            // 2.发送数据
            this.formData.role = this.formData.role == '管理员' ? '1' : '2'

            // 将数据添加到服务器中
            addAdmin(this.formData).then(res => {
                // console.log(res);
                if (res.code == '200') {
                    // 成功
                    ElMessage.success(res.message)

                    // 关闭抽屉效果
                    this.drawer = false

                    // 重新获取最新的数据
                    adminList().then(res => {
                        // console.log(res);
                        this.tableData = res.data
                    })

                } else {
                    ElMessage.error(res.message)
                }
                
            })
        },
        editClick(row){

            this.interfaceType = '10010'

            // 打开抽屉
            this.drawer = true

            // 获取当前一行的数据
            // console.log(row);

            // this.formData = row
            this.formData.adminname = row.adminname
            this.formData.password = ''

            this.formData.role = row.role == '1' ? '管理员' : '超级管理员'

            // console.log(this.formData);

            const checkedKeys = []
            row.checkedKeys.forEach(parent => {
                parent.children.forEach(item => {
                    checkedKeys.push(item.path)
                })
            })
            // console.log(checkedKeys);
            this.defaultCheckedKeys = checkedKeys
        },
        close() {
            this.formData = {}
            this.defaultCheckedKeys = []
            if (this.$refs.treeRef) {
                this.$refs.treeRef.setCheckedKeys([])
            }
        },
        updata() {
            // 先获取表单数据
            console.log(this.formData);

            if (this.formData.adminname == '' || this.formData.password == '') {
                ElMessage.error('管理员名称和密码不能为空')
                return
            }

            this.formData.role = this.formData.role == '管理员' ? '1' : '2'

            // 获取当前用户选中的权限
            this.formatCheckedKeys()

            // 提交修改信息
            updataAdmin(this.formData).then(res => {
                // console.log(res);

                 // 关闭抽屉效果
                 this.drawer = false

                // 重新获取最新的数据
                adminList().then(res => {
                    // console.log(res);
                    this.tableData = res.data
                })
            })

        },
        deleteClick (row) {
            // console.log(row);
            deleteAdmin({
                adminid: row.adminid
            }).then(res => {
                if (res.code == 200) {
                     // 重新获取最新的数据
                adminList().then(res => {
                    // console.log(res);
                    this.tableData = res.data
                })
                } else {
                    ElMessage.error('删除失败...')
                }
            })
        }
    },
    mounted(){
        // 获取管理员列表
        adminList().then(res => {
            // console.log(res);
            this.tableData = res.data
        })
    },
    computed: {
        computedTableData() {
            return this.tableData.slice((this.currentPage - 1) * 10, (this.currentPage - 1) * 10 + 10)
        }
    }
}

</script>

<template>
    <div class="header">
        管理员列表
        <el-button type="success" @click="addClick">添加管理员</el-button>

        <el-table :data="computedTableData" style="width: 100%">
            <!-- type="index" 标记当前为索引序号 -->
            <!-- label 列标题 -->
            <!-- prop 列数据字段 -->
            <el-table-column type="index" :index="(currentPage - 1) * 10 + 1" label="序号" width="80" />
            <el-table-column prop="adminname" label="管理员名称" width="180" />
            <el-table-column prop="role" label="管理员权限">
                <template #default="scope">
                    <!-- <div> -->
                        <!-- {{ scope.row.role == 1 ? '管理员' : '超级管理员' }} -->
                        <el-tag :type="scope.row.role == 1 ? '' : 'success'">{{ scope.row.role == 1 ? '管理员' : '超级管理员' }}</el-tag>
                    <!-- </div> -->
                </template>
            </el-table-column>

            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button @click="editClick(scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" size="small" type="success">删除</el-button>
                </template>
            </el-table-column>

         </el-table>
         <!-- {{ currentPage }} -->
         <!-- 做分页显示 -->
         <el-pagination background v-model:current-page="currentPage" layout="prev, pager, next" :total="tableData.length" />

         <!-- 抽屉效果 -->
         <el-drawer @close="close" v-model="drawer" >

            <template #header>
                <h4>  {{ interfaceType == '10086' ? '添加管理员' : '编辑管理员' }}</h4>
            </template>

            <el-form label-width="120px">

                <el-form-item label="管理员账号">
                    <el-input placeholder="请输入管理员账号" v-model="formData.adminname" />
                </el-form-item>

                <el-form-item label="管理员密码">
                    <el-input placeholder="请输入管理员密码" v-model="formData.password" />
                </el-form-item>

                <el-form-item label="管理员权限">
                    <el-select placeholder="请选择管理员权限" v-model="formData.role" >
                        <el-option label="管理员" value="管理员" />
                        <el-option label="超级管理员" value="超级管理员" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-tree :default-checked-keys="defaultCheckedKeys" :default-expand-all="true" show-checkbox ref="treeRef" :data="menus" node-key="path"  />
                </el-form-item>

                <el-button v-if="interfaceType == '10086'" @click="add" type="success">添加</el-button>
                <el-button v-else type="success" @click="updata">修改</el-button>

            </el-form>
         </el-drawer>

    </div>
</template>

<style lang="scss" scoped>
    .header {
        margin-bottom: 16px;
    }
</style>