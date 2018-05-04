
var dataset = [];
var dates = []
$(function(){
    $.get('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=300').then(function(data){
        data.forEach( function(el, index) {
            dataset.push(el['open'])
            dates.push(el['date'])
        })
        console.log('working');
        var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dates,
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataset,
        }]
    },

    // Configuration options go here
    options: {}
});
    }).catch(function(err){
        console.log(err)
    });

});



// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: dataset,
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });

