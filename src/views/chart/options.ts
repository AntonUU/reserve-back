import { graphic } from 'echarts/core';
export const barOptions = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
        },
        {
            data: [180, 230, 190, 120, 110, 230, 235],
            type: 'bar',
        },
    ],
};

export const lineOptions = {
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310],
        },
    ],
};

export const pieOptions = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};

export const wordOptions = {
    series: [
        {
            type: 'wordCloud',
            rotationRange: [0, 0],
            autoSize: {
                enable: true,
                minSize: 14,
            },
            textStyle: {
                fontFamily: '微软雅黑,sans-serif',
                color: function () {
                    return (
                        'rgb(' +
                        [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                        ].join(',') +
                        ')'
                    );
                },
            },
            data: [
                {
                    name: 'Vue',
                    value: 10000,
                },
                {
                    name: 'React',
                    value: 9000,
                },
                {
                    name: '图表',
                    value: 4000,
                },
                {
                    name: '产品',
                    value: 7000,
                },
                {
                    name: 'vue-manage-system',
                    value: 2000,
                },
                {
                    name: 'element-plus',
                    value: 6000,
                },
                {
                    name: '管理系统',
                    value: 5000,
                },
                {
                    name: '前端',
                    value: 4000,
                },
                {
                    name: '测试',
                    value: 3000,
                },
                {
                    name: '后端',
                    value: 8000,
                },
                {
                    name: '软件开发',
                    value: 6000,
                },
                {
                    name: '程序员',
                    value: 4000,
                },
            ],
        },
    ],
};

export const ringOptions = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        top: '5%',
        left: 'center',
    },

    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold',
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
        },
    ],
};

export const dashOpt1 = {
    legend: {
        data: ['行人预约', '车辆预约'],
        bottom: 0
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
        type: 'value',
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '10%',
        containLabel: true,
    },
    color: ['#f44336', '#009688'],
    series: [
        {
            name: '行人预约',
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(244, 67, 54, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(244, 67, 54, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: [7, 5, 2, 0, 5, 12, 8],
        },
        {
            name: '车辆预约',
            type: 'line',
            smooth: true,
            data: [3, 6, 8, 1, 3, 14, 13],
        },
    ],
};

export const dashOpt2 = {
    legend: {
        bottom: '1%',
        left: 'center',
    },
    color: ['#f44336', '#009688'],
    series: [
        {
            name: '预约类型',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: true,
                formatter: '{b}: {c} ({d}%)'
            },
            data: [
                { value: 39, name: '行人预约' },
                { value: 48, name: '车辆预约' },
            ],
        },
    ],
};

export const mapOptions = {
    tooltip: {
        trigger: 'item',
    },
    geo: {
        map: 'china',
        roam: false,
        emphasis: {
            label: {
                show: false,
            },
        },
    },
    visualMap: {
        show: false,
        min: 0,
        max: 100,
        realtime: false,
        calculable: false,
        inRange: {
            color: ['#d2e0f5', '#71A9FF'],
        },
    },
    series: [
        {
            geoIndex: 0,
            name: '地域分布',
            type: 'map',
            coordinateSystem: 'geo',
            map: 'china',
            data: [
                { name: '北京', value: 100 },
                { name: '上海', value: 100 },
                { name: '广东', value: 100 },
                { name: '浙江', value: 90 },
                { name: '江西', value: 80 },
                { name: '山东', value: 70 },
                { name: '广西', value: 60 },
                { name: '河南', value: 50 },
                { name: '河南', value: 40 },
                { name: '青海', value: 70 },
                { name: '河南', value: 30 },
                { name: '黑龙江', value: 20 },
                { name: '新疆', value: 20 },
                { name: '云南', value: 20 },
                { name: '甘肃', value: 20 },
            ],
        },
    ],
};
