// Setup colors for the bar charts
const backgroundColor = [
    'rgba(26, 188, 156, 1)',
    'rgba(46, 204, 113, 1)',
    'rgba(52, 152, 219, 1)',
    'rgba(155, 89, 182, 1)',
    'rgba(52, 73, 94, 1)',
    'rgba(241, 196, 15, 1)',
    'rgba(230, 126, 34, 1)',
    'rgba(231, 76, 60, 1)'
];
const borderColor = [
    'rgba(26, 188, 156, 1)',
    'rgba(46, 204, 113, 1)',
    'rgba(52, 152, 219, 1)',
    'rgba(155, 89, 182, 1)',
    'rgba(52, 73, 94, 1)',
    'rgba(241, 196, 15, 1)',
    'rgba(230, 126, 34, 1)',
    'rgba(231, 76, 60, 1)'
]
// Set some default config
Chart.defaults.global.elements.point.radius = 0;
Chart.defaults.global.maintainAspectRatio = true;
Chart.defaults.global.animation = {
    duration: 300,
    easing: 'linear'
}
Chart.defaults.global.hover = {
    animationDuration: 0
}
let snrBarChart = new Chart(document.getElementById("snrBar"), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'dB',
            data: [],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});
let pwrBarChart = new Chart(document.getElementById("pwrBar"), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'dBmV',
            data: [],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});
var snrLineChart = new Chart(document.getElementById("snrLine"), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Average SnR",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(76, 175, 80, 0.4)",
            borderColor: "rgba(76, 175, 80, 1)",
            data: [],
            spanGaps: false,
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: false
            }]
        }
    }
});
var pwrLineChart = new Chart(document.getElementById("pwrLine"), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Average power levels",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            spanGaps: false,
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: false
            }]
        }
    }
});

// Export so we can access these outside
module.exports = {
    snrBarChart: snrBarChart,
    pwrBarChart: pwrBarChart,
    snrLineChart: snrLineChart,
    pwrLineChart: pwrLineChart
}