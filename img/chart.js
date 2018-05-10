Chart.pluginService.register({
    beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }
});
class drawChart extends poloUrl{
    renderChart(){
    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: this.date,
        datasets: [{
            label: this.pair,
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: this.color,
            data: this.close,
            fill: false,
            pointRadius: 1,
        }],

    },

    // Configuration options go here
    options: {responsive:true,
        chartArea: {
        backgroundColor: 'rgba(0, 0, 0, .7)'
        },
        legend: {
            labels: {
                fontColor: 'rgb(255, 255, 255)',
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: 'rgb(255, 255, 255)',
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'rgb(255, 255, 255)',
                }
            }]
        }
    }
});

}
    clearChart(){
        var div = document.getElementById('chart');
        var cx = document.getElementById('myChart');
            document.remove(cx);
            var canv = document.createElement('myChart')
            canv.id = 'myChart';
            document.div.appendChild(canv);
    }

}
