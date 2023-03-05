<script>

import * as XLSX from 'xlsx';

export default {
  data() {
    return {
        tableData: []
    };
  },
  methods: {
    importClick() {
        // 选择文件按钮的点击事件
        this.$refs.inp.click()
    },
    importChange(event) {
        // 选中文件后的回调函数
        console.log(event.target.files[0]);
        // 1.获取到我们选中的文件
        const file = event.target.files[0]
        // 2.创建文件的加载器
        const reader = new FileReader()
        // 将文件读取成数据流
        reader.readAsBinaryString(file)
        reader.onload = () => {
            // console.log(reader.result);

            // 将我们的数据流转换成 js 的对象
            const boxx = XLSX.read(reader.result, {type: 'binary'})

            // 将 工作表1 中的数据提取出来
            let res = boxx.Sheets['Sheet1']

            // 将工作表1中的内容转换成 json 数据
            res = XLSX.utils.sheet_to_json(res)

            console.log(res);

            this.tableData = res
        }
    },
  },
};
</script>

<template>
  <div>
    <el-button type="success" @click="importClick" > 选择文件 </el-button>

    <input ref="inp" type="file" hidden @change="importChange" />

    <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" />
            <el-table-column  label="图片" >

                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.图片地址"/>
                    </div>
                </template>
        
            </el-table-column>
            <el-table-column prop="分类" label= "分类"  />
            <el-table-column prop="商品名称" label="商品名称" />
            
            
        </el-table>

  </div>
</template>