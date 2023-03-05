<script>
// 导入所有对象，并给这些对象合并到一起，然后起个名字叫 echarts
import * as echarts from 'echarts';

export default {
    data() {
        return {
            myChart:null

        }
    },
    methods: {
        changeType(type, x , y) {
            this.myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                data: x || ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
             },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: type || 'pie',
                    data: y || [5, 20, 36, 10, 10, 20]
                }
            ]
        });
        }
    },
    mounted () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        this.changeType('pie')
    }
}



</script>

<template>
    <div>
        <el-button @click="changeType('line')">折线图</el-button>
        <el-button type="primary" @click="changeType('bar')">柱状图</el-button>
        <el-button type="success" @click="changeType('pie')">饼图</el-button>
        <el-button type="info" @click="changeType('scatter')">散点图</el-button>

        <el-button type="warning" @click="changeType('line', ['冰箱','洗衣机','液晶电视','空调','电水壶','豆浆机'], [10,20,6,14,21,8])">电器销量</el-button>
        <el-button type="danger" @click="changeType('bar', ['草莓','苹果','香蕉','车厘子','柑橘','芒果'], [10,20,6,14,21,8])">水果销量</el-button>
    </div>
    <div id="main"> </div>
</template>

<style lang="scss" scoped>
#main {
    height: 600px;
    background-color: white;
}
</style>