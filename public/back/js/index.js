$(function () {
  // 基于准备好的dom，初始化echarts实例
  var histogram = echarts.init(document.getElementById('histogram'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年上半年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 2000, 1800, 3000, 3150, 2712]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  histogram.setOption(option);

  //饼状图
  var pie_chart = echarts.init(document.getElementById('pie_chart'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '热门运动品牌销售情况',
      subtext: '2017年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['阿迪', '安踏', '李宁', '耐克', '亚瑟士']
    },
    series: [{
      name: '销售数量',
      type: 'pie',
      radius: '75%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '阿迪'
        },
        {
          value: 310,
          name: '安踏'
        },
        {
          value: 234,
          name: '李宁'
        },
        {
          value: 135,
          name: '耐克'
        },
        {
          value: 1548,
          name: '亚瑟士'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 30,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  pie_chart.setOption(option);
});