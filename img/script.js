let makePair = $('body').append("<a id='makePair' value ='BTC' time='86400'>");
let curPair = $('#makePair').attr('value');
let curTime = Number($('#makePair').attr('time'));


var newBTCUrl = new drawChart(curPair ,curTime);
newBTCUrl.objectMaker();


var timeSeries = function(){
  curPair = $('#makePair').attr('value');
  $('#myChart').remove();
  $('iframe').remove();
  $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
  return curPair;
}

    $('.fiveMin').on('click', function(){
        var newSmall = new drawChart(timeSeries(),300);
        newSmall.objectMaker()
        $('#makePair').attr('time', 300)
    })

    $('.fourHour').on('click', function(){
        var newMed = new drawChart(timeSeries(),14400);
        newMed.objectMaker()
        $('#makePair').attr('time', 14400)
    })

    $('.day').on('click', function(){
        var newBTCUrl = new drawChart(timeSeries(),86400);
        newBTCUrl.objectMaker();
        $('#makePair').attr('time', 86400)
    })
