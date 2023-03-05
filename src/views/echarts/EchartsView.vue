<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    // 1.将表格绑定在指定标签上
    this.myChart = echarts.init(document.getElementById("box"));
    // 2.给表格添加数据
    this.myChart.setOption({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [
            {
              value: 0,
              name: "SCORE",
            },
          ],
        },
      ],
    });

    let num = 0;

    setInterval(() => {
        if (num >= 90) {
        num = 90;
      }

      this.myChart.setOption({
        series: [
          {
            data: [
              {
                value: (num += 10),
                name: "SCORE",
              },
            ],
          },
        ],
      });
    }, 2000);
    
  },
};
</script>

<template>
  <div id="box"></div>
</template>

<style lang="scss" scoped>
#box {
  height: 600px;
}
</style>