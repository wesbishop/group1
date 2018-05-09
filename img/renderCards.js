function renderCards(data){
  var cardHTML = '';
  let end = Math.round((new Date()).getTime() / 1000);
  let start = end - (86400* 2);
  let prices = [];
  let text = 'text-dark';
  $('.portCard').empty();
  data.forEach(function(el){
    let url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${el.pair}&start=${start}&end=${end}&period=86400`
    $.get(url).then((data)=>{
      if(data[1].close > data[0].close){
        text = 'text-success';
      }else{
        text = 'text-danger';
      }
      cardHTML = `<div class='card bg-dark' style="width: 18rem;"><div class='card-body'><h5 class='card-title ${text}'>${el.pair} ${data[1].close}</h5>
                <p class ='card-text text-light'>Your Total = $${Math.floor(Number(el.amount * data[1].close))}</p></div></div>`
      $('.portCard').append(cardHTML)
    });
  })

}
