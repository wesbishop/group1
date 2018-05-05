class poloUrl {
    constructor(pair) {
        this.pair = pair;
        this.close = [];
        this.date = [];
        this.end = Math.round((new Date()).getTime() / 1000);
        this.period = 300;
        this.start = this.end - (this.period * 50);
        this.url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${pair}&start=${this.start}&end=${this.end}&period=${this.period}`;
    }
    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    objectMaker() {
        return $.get(this.url).then((data) => {
            for (var i = 0; i < data.length; i++) {
                this.close.push(data[i]['close']);
                this.date.push(this.timeConverter(data[i]['date']));
            }
        })
    }

}
var newPoloUrl = new poloUrl('BTC', 0, 0);
var obj = newPoloUrl.objectMaker();
console.log(newPoloUrl.close, newPoloUrl.date);