class poloUrl {
    constructor(pair, period, periodRepeat, color) {
        this.pair = pair;
        this.close = [];
        this.closeColor =[];
        this.color = color || 'white';
        this.periodRepeat = periodRepeat || 500
        this.date = [];
        this.end = Math.round((new Date()).getTime() / 1000);
        this.period = period;
        this.start = this.end - (this.period * this.periodRepeat);
        this.colorStart = this.end - (this.period * 2);
        this.url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${pair}&start=${this.start}&end=${this.end}&period=${this.period}`;
        this.colorUrl = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${pair}&start=${this.colorStart}&end=${this.end}&period=86400`;
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
        $.get(this.url).then((data) => {
            for (var i = 0; i < data.length; i++) {
                this.close.push(data[i]['close']);
                this.date.push(this.timeConverter(data[i]['date']));
            }
            this.renderChart();
        })
    }

    colorPick() {
        $.get(this.colorUrl).then((data)=>{
              for (var i = 0; i < data.length; i++) {
              this.closeColor.push(data[i]['close']);
          }
          if(this.closeColor[1] > this.closeColor[0]){
            this.color = 'green';
            $('#makePair').attr('color', 'green');
            return('green')
          }else{
            this.color = 'red';
            $('#makePair').attr('color', 'red');
            return('red')
          }
        })
    }

}
