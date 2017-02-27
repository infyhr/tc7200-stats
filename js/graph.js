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
let snrBarChart = new Chart(document.getElementById("ds_snrBar"), {
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
let pwrBarChart = new Chart(document.getElementById("ds_pwrBar"), {
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
let snrLineChart = new Chart(document.getElementById("ds_snrLine"), {
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
let pwrLineChart = new Chart(document.getElementById("ds_pwrLine"), {
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
let us_pwrBarChart = new Chart(document.getElementById("us_pwrBar"), {
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
let us_pwrLineChart = new Chart(document.getElementById("us_pwrLine"), {
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
    pwrLineChart: pwrLineChart,

    us_pwrBarChart: us_pwrBarChart,
    us_pwrLineChart: us_pwrLineChart
}