let makePair = $('body').append("<a id='makePair' value ='BTC' time='86400' repeat='500'>");
let curPair = $('#makePair').attr('value');
let curTime = Number($('#makePair').attr('time'));
let curRepeat = Number($('#makePair').attr('repeat'));

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
        var newSmall = new drawChart(timeSeries(),300, curRepeat);
        newSmall.objectMaker()
        $('#makePair').attr('time', 300)
    })

    $('.fifteenMin').on('click', function(){
        var newFift = new drawChart(timeSeries(),900, curRepeat);
        newFift.objectMaker()
        $('#makePair').attr('time', 900)
    })

    $('.thirtyMin').on('click', function(){
        var newThirt = new drawChart(timeSeries(),1800,curRepeat);
        newThirt.objectMaker()
        $('#makePair').attr('time', 1800)
    })

    $('.twoHour').on('click', function(){
        var twoHour = new drawChart(timeSeries(),7200,curRepeat);
        twoHour.objectMaker()
        $('#makePair').attr('time', 7200)
    })

    $('.fourHour').on('click', function(){
        var newMed = new drawChart(timeSeries(),14400,curRepeat);
        newMed.objectMaker()
        $('#makePair').attr('time', 14400)
    })

    $('.day').on('click', function(){
        var newDay = new drawChart(timeSeries(),86400,curRepeat);
        newDay.objectMaker();
        $('#makePair').attr('time', 86400)
    })

     $('.plus').on('click', function(){
        curTime = Number($('#makePair').attr('time'));
        curRepeat = Number($('#makePair').attr('repeat'));
        if(curRepeat > 100){
        var newPlus = new drawChart(timeSeries(),curTime,(curRepeat-100));
        $('#makePair').attr('repeat', curRepeat-100);
        newPlus.objectMaker();
        }else{
            alert(`Can't zoom in any further`)
        }
        
    })

       $('.reset').on('click', function(){
        curTime = Number($('#makePair').attr('time'));
        var newReset = new drawChart(timeSeries(),curTime);
        newReset.objectMaker();
        $('#makePair').attr('repeat', 500);
    
        
    })

     $('.minus').on('click', function(){
        curTime = Number($('#makePair').attr('time'));
        curRepeat = Number($('#makePair').attr('repeat'));
        if(curRepeat < 1000){
        var newMinus = new drawChart(timeSeries(),curTime,(curRepeat+100));
        $('#makePair').attr('repeat', curRepeat+100);
        newMinus.objectMaker();
        }else{
            alert(`Can't zoom out any further`)
        }
    })
