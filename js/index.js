(function () {
  // 历史记录区域导航
  $(".viewport .content .column .histories .header a").click(function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    if ($(this).index() === 0) {
      $(".viewport .content .histories .body .compete")
        .addClass("activate")
        .siblings()
        .removeClass("activate");
      $(".viewport .content .column .histories .compete")
        .show()
        .siblings()
        .hide();
    }

    if ($(this).index() === 2) {
      $(".viewport .content .histories .body .other")
        .addClass("activate")
        .siblings()
        .removeClass("activate");
      $(".viewport .content .column .histories .other")
        .show()
        .siblings()
        .hide();
    }
    $(".viewport .content .column .histories .body .grid_body .wrap").stop(
      true,
      true
    );
    // // 位置归零
    // $(
    //   ".viewport .content .column .histories .body .activate .grid_body .wrap"
    // ).css("top", 0);
    autoplay();
  });
  // 历史记录自动翻滚
  autoplay();
  function autoplay() {
    // 向上挪动
    let height = $(
      ".viewport .content .column .histories .body .activate .grid_row"
    ).outerHeight();
    // console.log(height);
    // $(".viewport .content .column .histories .body .grid_body .wrap").css(
    //   "top",
    //   -height
    // );
    $(".viewport .content .column .histories .body .activate .wrap")
      // .delay(1000)
      .animate(
        {
          top: -height,
        },
        3000,
        "linear",
        function () {
          let $f = $(
            ".viewport .content .column .histories .body .activate .grid_body .grid_row"
          ).first();
          $(
            ".viewport .content .column .histories .body .activate .grid_body .wrap"
          ).append($f);
          $(
            ".viewport .content .column .histories .body .activate .grid_body .wrap"
          ).css("top", 0);
          autoplay();
        }
      );
  }
  // 鼠标滚轮事件
  var $wrap = $(
    ".viewport .content .column .histories .body .activate .grid_body .wrap"
  );
})();
// 图表注册
(function () {
  // 饼状图
  var map_chart = echarts.init(
    document.querySelector(".viewport .content .column .maps .states")
  );
  var options = {
    title: {
      text: "地图统计",
      subtext: "地图匹配次数统计",
      left: "center",
      textStyle: {
        color: "cyan",
      },
      subtextStyle: {
        color: "rgb(0, 190, 190)",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
      backgroundColor: "transparent",
      textStyle: {
        color: "cyan",
        fontSize: 10,
      },
      borderColor: "cyan",
      padding: 2,
      extraCssText: "border-radius: 0;",
    },
    legend: {
      top: "bottom",
      left: "center",
      data: [
        "极地寒港",
        "沧海遗珠",
        "劫境之地",
        "意境空岛",
        "训练场",
        "远古遗迹",
      ],
      textStyle: {
        color: "cyan",
      },
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    series: [
      {
        labelLine: {
          show: true,
        },
        name: "地图统计",
        type: "pie",
        radius: ["8%", "60%"],
        center: ["50%", "50%"],
        roseType: "area",
        // itemStyle: {
        //   borderRadius: 2,
        // },
        data: [
          { value: 30, name: "极地寒港" },
          { value: 28, name: "沧海遗珠" },
          { value: 26, name: "劫境之地" },
          { value: 24, name: "意境空岛" },
          { value: 40, name: "训练场" },
          { value: 20, name: "远古遗迹" },
        ],
        animationDelay: function (idx) {
          return idx * 100;
        },
        label: {
          color: "cyan",
          textBorderWidth: 0,
        },
        itemStyle: {
          borderColor: "cyan",
          borderType: "solid",
          borderDashOffset: 5,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          // shadowBlur: 10,
          // shadowColor: "rgba(0, 0, 0, 0.3)",
        },
        emphasis: {
          scaleSize: 15,
        },
      },
    ],
    color: [
      "rgba(0, 225, 225, 0.5)",
      "rgba(0, 190, 190, 0.5)",
      "rgba(255, 240, 252, 0.5)",
      "rgba(250, 79, 108, 0.5)",
      "rgba(255, 127, 148, 0.5)",
      "rgba(0, 83, 94, 0.5)",
    ],
  };
  map_chart.setOption(options);

  // 地图部分
  var chartDom = document.querySelector(
    ".viewport .content .column .map .globe"
  );
  var threeD = echarts.init(chartDom);
  var option;

  // $.getJSON("./population.json", function (data) {
  // import data from "./population.json" assert { type: "JSON" };

  data = data
    .filter(function (dataItem) {
      return dataItem[2] > 0;
    })
    .map(function (dataItem) {
      return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
    });
  option = {
    backgroundColor: "transparent",
    globe: {
      // baseTexture:
      //   "H:Front End我的项目合集\3.Javascript开发第四章 JQuery数据可视化项目jsworld.jpg",
      // heightTexture:
      //   "H:Front End我的项目合集\3.Javascript开发第四章 JQuery数据可视化项目jsworld.jpg",
      shading: "lambert",
      // environment: "transparent",
      light: {
        main: {
          intensity: 0.2,
          // color: "rgb(250, 79, 108)",
        },
      },
      viewControl: {
        autoRotate: false,
      },
      baseColor: "rgba(0, 255, 255, 0.1)",
    },
    visualMap: {
      max: 10,
      calculable: true,
      realtime: false,
      inRange: {
        colorLightness: [0.2, 0.5],
      },
      textStyle: {
        color: "#fff",
      },
      controller: {
        inRange: {
          color: "cyan",
        },
      },
      outOfRange: {
        colorAlpha: 0,
      },
    },
    series: {
      type: "scatter3D",
      coordinateSystem: "globe",
      blendMode: "lighter",
      symbolSize: 2,
      itemStyle: {
        color: "cyan",
        opacity: 1,
      },
      data: data,
    },
  };
  threeD.setOption(option);
  // });
  // 特工使用次数
  // prettier-ignore
  let dataAxis = [
    "菲尼克斯",
    "捷提",
    "布史东",
    "欧门",
    "圣祈",
    "凯宙",
    "钱博尔",
    "薇蝮",
    "蕾娜",
    "斯凯",
    "KAY-O",
    "夜戮",
    "菲德",
    "叛奇",
    "芮兹",
    "瑟符",
    "哈泊"
  ];
  // prettier-ignore
  let data_bar = [22, 10, 31, 6, 34, 2, 15, 26, 33, 48, 14, 11, 30, 1, 17, 13, 30];
  let yMax = 50;
  let dataShadow = [];
  for (let i = 0; i < data_bar.length; i++) {
    dataShadow.push(yMax);
  }
  var chartDom = document.querySelector(
    ".viewport .content .column .modes .bars"
  );
  var bar = echarts.init(chartDom);
  option = {
    // title: {
    //   text: "特性示例：渐变色 阴影 点击缩放",
    //   subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
    // },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
      backgroundColor: "rgba(0, 100, 100, 0.3)",
      textStyle: {
        color: "cyan",
        fontSize: 10,
      },
      borderColor: "cyan",
      padding: 2,
      extraCssText: "border-radius: 0;",
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: "rgba(0, 255, 255, 0.6)",
        },
        emphasis: {
          itemStyle: {
            color: "rgba(0, 102, 102, 0.6)",
          },
        },
        data: data_bar,
      },
    ],
  };
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  bar.on("click", function (params) {
    // console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    bar.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });

  bar.on("mouseover", function (e) {
    let names = [
      "菲尼克斯",
      "捷提",
      "布史东",
      "欧门",
      "圣祈",
      "凯宙",
      "钱博尔",
      "薇蝮",
      "蕾娜",
      "斯凯",
      "KAY-O",
      "夜戮",
      "菲德",
      "叛奇",
      "芮兹",
      "瑟符",
      "哈泊",
    ];

    let n = e.name;
    console.log(n);
    let t = document.querySelector(".viewport .content .column .modes .mask");
    t.style.backgroundImage = `url(./images/valorant/${names.indexOf(n)}.jpg)`;
    t.style.opacity = 0.5;
  });

  bar.on("mouseout", function () {
    let t = document.querySelector(".viewport .content .column .modes .mask");
    t.style.opacity = 0;
  });

  bar.setOption(option);
  // 折线图
  option_line = {
    legend: {
      show: true,
      data: ["定位", "急停"],
      textStyle: {
        color: "cyan",
      },
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: "{b} : {c} ({d}%)",
      backgroundColor: "transparent",
      textStyle: {
        color: "cyan",
        fontSize: 12,
      },
      borderColor: "cyan",
      padding: 2,
      extraCssText: "border-radius: 0;",
    },
    color: ["cyan", "palevioletred"],
    xAxis: {
      name: "时间",
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        color: "cyan",
        // fontSize: 16,
      },
      nameTextStyle: {
        color: "cyan",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        lineStyle: {
          color: "cyan",
        },
      },
    },
    yAxis: {
      name: "时长",
      type: "value",
      axisLabel: {
        color: "cyan",
        // fontSize: 16,
      },
      nameTextStyle: {
        color: "cyan",
      },
      splitLine: {
        lineStyle: {
          color: "cyan",
        },
      },
    },
    series: [
      {
        name: "定位",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        emphasis: {
          scale: 3,
        },
        symbol: "circle",
      },
      {
        name: "急停",
        data: [720, 532, 601, 334, 1290, 1230, 1020],
        type: "line",
        smooth: true,
        emphasis: {
          scale: 3,
        },
        symbol: "circle",
      },
    ],
  };
  let obj = document.querySelector(".viewport .content .column .train .chart");
  let line = echarts.init(obj);
  line.setOption(option_line);

  // 雷达图
  var chartDom_r = document.querySelector(
    ".viewport .content .column .two .ability .chart"
  );
  var radar = echarts.init(chartDom_r);
  var option_r;

  option_r = {
    color: "cyan",
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "MVP", max: 100 },
        { name: "突破", max: 100 },
        { name: "残局", max: 100 },
        { name: "辅助", max: 100 },
        { name: "狙击", max: 100 },
        { name: "瞄准", max: 100 },
      ],
      axisLine: {
        lineStyle: {
          color: "white",
        },
      },
      axisName: {
        color: "cyan",
        fontSize: 12,
      },
    },
    series: [
      {
        name: "能力雷达图",
        type: "radar",
        data: [
          {
            value: [20, 20, 20, 20, 20, 20],
            name: "个人能力值",
          },
        ],
      },
    ],
    tooltip: {
      show: true,
      trigger: "item",
      backgroundColor: "rgba(0, 100, 100, 0.3)",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        color: "cyan",
        fontSize: 12,
      },
      borderColor: "cyan",
      padding: 2,
      extraCssText: "border-radius: 0;",
    },
  };
  radar.setOption(option_r);

  // 仪表盘
  var chartDom_y = document.querySelector(
    ".viewport .content .column .two .delay .chart"
  );
  var ybp = echarts.init(chartDom_y);
  var option_y;
  option_y = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 240,
        splitNumber: 5,
        radius: "90%",
        itemStyle: {
          color: "cyan",
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 15,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 10,
        },
        pointer: {
          icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
          length: "50%",
          width: 10,
          offsetCenter: [0, "5%"],
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 10,
          },
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 1,
            color: "cyan",
          },
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: "cyan",
          },
        },
        axisLabel: {
          distance: 15,
          color: "cyan",
          fontSize: 10,
        },
        title: {
          show: false,
        },
        detail: {
          backgroundColor: "rgba(0, 100, 100, 0.2)",
          borderColor: "cyan",
          borderWidth: 1,
          width: "100%",
          lineHeight: 20,
          height: 20,
          borderRadius: 8,
          offsetCenter: [0, "50%"],
          valueAnimation: true,
          formatter: function (value) {
            return "{value|" + value.toFixed(0) + "}{unit|ms}";
          },
          rich: {
            value: {
              fontSize: 20,
              fontWeight: "bolder",
              color: "cyan",
              padding: [5, 0, 0, 0],
            },
            unit: {
              fontSize: 15,
              color: "cyan",
              padding: [5, 0, 0, 10],
            },
          },
        },
        data: [
          {
            value: 0,
          },
        ],
      },
    ],
    tooltip: {
      show: true,
      trigger: "item",
      backgroundColor: "rgba(0, 100, 100, 0.3)",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        color: "cyan",
        fontSize: 15,
      },
      borderColor: "cyan",
      padding: 2,
      extraCssText: "border-radius: 0;",
    },
  };
  ybp.setOption(option_y);

  $(".viewport .content .column .two .delay").hover(
    function () {
      // console.log(option_y.series[0].data[0].value);
      option_y.series[0].data[0].value = 96;
      ybp.setOption(option_y);
    },
    function () {
      option_y.series[0].data[0].value = 0;
      ybp.setOption(option_y);
    }
  );

  $(".viewport .content .column .two .ability").hover(
    function () {
      // console.log(option_y.series[0].data[0].value);
      option_r.series[0].data[0].value = [50, 76, 89, 91, 87, 95];
      radar.setOption(option_r);
    },
    function () {
      option_r.series[0].data[0].value = [20, 20, 20, 20, 20, 20];
      radar.setOption(option_r);
    }
  );

  // 随窗口大小变化，图标大小也变化
  window.addEventListener("resize", function () {
    map_chart.resize();
    threeD.resize();
    bar.resize();
    line.resize();
    radar.resize();
    ybp.resize();
  });
  // 练习时长统计
  time_length = {
    year: [
      ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      [820, 932, 901, 934, 1290, 1330, 1320],
      [720, 532, 601, 334, 1290, 1230, 1020],
    ],
    season: [
      ["春", "秋", "冬", "春", "夏", "秋", "冬"],
      [320, 642, 436, 224, 241, 522, 147],
      [254, 558, 655, 225, 252, 554, 102],
    ],
    month: [
      ["六", "七", "八", "九", "十", "十一", "十二"],
      [352, 522, 522, 133, 422, 352, 112],
      [554, 221, 225, 334, 322, 541, 122],
    ],
    day: [
      ["11/30", "12/1", "12/2", "12/3", "12/4", "12/5", "12/6"],
      [22, 24, 58, 22, 54, 24, 63],
      [15, 47, 52, 12, 15, 52, 30],
    ],
  };

  var ind = 0;
  $(".viewport .content .column .train .header a").click(function () {
    // 选项卡样式的改变
    ind = $(this).index() - 2;
    // console.log(ind);
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    // 获得变量名，重置数据
    let choser = this.dataset.type;
    option_line.xAxis.data = time_length[choser][0];
    option_line.series[0].data = time_length[choser][1];
    option_line.series[1].data = time_length[choser][2];
    line.setOption(option_line);
  });

  // 自动变换相应的数据
  var timer = setInterval(function () {
    ind++;
    if (ind >= 4) {
      ind = 0;
    }
    // console.log(ind);
    $(".viewport .content .column .train .header a").eq(ind).click();
  }, 1500);

  // 鼠标悬停定时器暂停
  $(".viewport .content .column .train").hover(
    function () {
      clearInterval(timer);
    },
    function () {
      timer = setInterval(function () {
        ind++;
        if (ind >= 4) {
          ind = 0;
        }
        // console.log(ind);
        $(".viewport .content .column .train .header a").eq(ind).click();
      }, 1500);
    }
  );
})();

(function () {
  // 最喜爱特工事件
  $(".viewport .content .column .modes .favorite").mouseover(function () {
    $(".viewport .content .column .modes .mask_a").css("opacity", 0.5);
  });

  $(".viewport .content .column .modes .favorite").mouseleave(function () {
    $(".viewport .content .column .modes .mask_a").css("opacity", 0);
  });

  // 最幸运特工事件
  $(".viewport .content .column .modes .lucky").mouseover(function () {
    $(".viewport .content .column .modes .mask_b").css("opacity", 0.5);
  });

  $(".viewport .content .column .modes .lucky").mouseleave(function () {
    $(".viewport .content .column .modes .mask_b").css("opacity", 0);
  });
  // 累计击杀数导航
  let data = [
    [6254, 3021, 4523],
    [3526, 869, 1254],
    [457, 102, 225],
    [42, 20, 23],
  ];
  $(".viewport .content .column .summation .header a").click(function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    let id = $(this).index();
    id = parseInt(id / 2);
    $(".viewport .content .column .summation ul li")
      .eq(0)
      .find("h4")
      .text(data[id][0]);
    $(".viewport .content .column .summation ul li")
      .eq(1)
      .find("h4")
      .text(data[id][1]);
    $(".viewport .content .column .summation ul li")
      .eq(2)
      .find("h4")
      .text(data[id][2]);
  });
})();

// 最后一个模块的处理
(function () {
  // 虚拟数据的产生
  data = [
    {
      name: "程序员01",
      level: "黄金3",
      abilities: {
        mvp: 92,
        break: 90,
        final: 98,
        aid: 90,
        snipring: 90,
        aim: 97,
      },
    },
    {
      name: "镜子.",
      level: "黄金2",
      abilities: {
        mvp: 95,
        break: 95,
        final: 98,
        aid: 87,
        snipring: 88,
        aim: 97,
      },
    },
    {
      name: "Purewhite",
      level: "黄金1",
      abilities: {
        mvp: 95,
        break: 97,
        final: 90,
        aid: 78,
        snipring: 88,
        aim: 98,
      },
    },
    {
      name: "想去海边",
      level: "白银3",
      abilities: {
        mvp: 70,
        break: 87,
        final: 78,
        aid: 90,
        snipring: 95,
        aim: 93,
      },
    },
    {
      name: "F1netune",
      level: "白银2",
      abilities: {
        mvp: 50,
        break: 76,
        final: 89,
        aid: 91,
        snipring: 87,
        aim: 95,
      },
    },
    {
      name: "James",
      level: "白银1",
      abilities: {
        mvp: 88,
        break: 83,
        final: 95,
        aid: 95,
        snipring: 70,
        aim: 88,
      },
    },
    {
      name: "Queck Duck",
      level: "青铜3",
      abilities: {
        mvp: 85,
        break: 78,
        final: 70,
        aid: 90,
        snipring: 89,
        aim: 90,
      },
    },
    {
      name: "J.D.凯",
      level: "青铜2",
      abilities: {
        mvp: 65,
        break: 90,
        final: 74,
        aid: 90,
        snipring: 90,
        aim: 90,
      },
    },
  ];
  // 渲染前三名数据
  for (let i = 0; i < 3; i++) {
    $(".viewport .content .column .friends .content .left li span")
      .eq(i)
      .text(data[i].name);
  }
  // 渲染剩下几个人的数据
  html_str = ``;
  for (let i = 3; i < data.length; i++) {
    html_str += `<li>${data[i].name}</li>`;
  }
  $(".viewport .content .column .friends .content .mid ul").html(html_str);
  // 为所有人进行编号
  let lis = document.querySelectorAll(
    ".viewport .content .column .friends .content li"
  );
  for (let i = 0; i < lis.length; i++) {
    lis[i].id = i;
  }
  // 最后一个窗口的柱状图
  let last_window = $(".viewport .content .column .friends .content .right")[0];
  let last = echarts.init(last_window);
  let option = {
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "0%",
      left: "25%",
      right: "10%",
      bottom: "0%",
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: ["MVP", "突破", "残局", "辅助", "狙击", "瞄准"],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "cyan",
      },
      inverse: true,
    },
    series: [
      {
        realtimeSort: true,
        name: "2011",
        type: "bar",
        data: [90, 90, 90, 90, 90, 90],
        showBackground: true,
        backgroundStyle: {
          borderRadius: 3,
          color: "rgba(0, 100, 100, 0.3)",
        },
        itemStyle: {
          color: "cyan",
          borderRadius: 3,
          shadowBlur: 5,
          shadowOffsetX: 1,
          shadowColor: "rgba(0, 100, 100, 0.7)",
        },
        label: {
          show: true,
          color: "rgb(0, 150, 150)",
        },
      },
    ],
  };
  // 渲染第一名数据
  option.series[0].data = [
    data[0].abilities.mvp,
    data[0].abilities.break,
    data[0].abilities.final,
    data[0].abilities.aid,
    data[0].abilities.snipring,
    data[0].abilities.aim,
  ];
  last.setOption(option);
  $(".viewport .content .column .friends .dw span").text(data[0].level);
  // 鼠标经过人名 显示对应数据
  $(".viewport .content .column .friends .content li").mouseenter(function () {
    let id = this.id;
    option.series[0].data = [
      data[id].abilities.mvp,
      data[id].abilities.break,
      data[id].abilities.final,
      data[id].abilities.aid,
      data[id].abilities.snipring,
      data[id].abilities.aim,
    ];
    last.setOption(option);
    $(".viewport .content .column .friends .dw span").text(data[id].level);
  });
  $(".viewport .content .column .friends .content li").mouseleave(function () {
    option.series[0].data = [
      data[0].abilities.mvp,
      data[0].abilities.break,
      data[0].abilities.final,
      data[0].abilities.aid,
      data[0].abilities.snipring,
      data[0].abilities.aim,
    ];
    last.setOption(option);
    $(".viewport .content .column .friends .dw span").text(data[0].level);
  });
  window.addEventListener("resize", function () {
    last.resize();
  });
})();
