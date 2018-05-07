let makePair = $('body').append("<a id='makePair' value ='BTC'>");
let curPair = $('#makePair').attr('value');


var newBTCUrl = new drawChart(curPair ,86400);
newBTCUrl.objectMaker();




    $('.fiveMin').on('click', function(){
        curPair = $('#makePair').attr('value');
        $('#myChart').remove();
        $('iframe').remove();
        $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');

        var newSmall = new drawChart(curPair,300);
        newSmall.objectMaker()
    })
    $('.fourHour').on('click', function(){
        curPair = $('#makePair').attr('value');
         $('#myChart').remove();
         $('iframe').remove();
        $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
        var newMed = new drawChart(curPair,14400);
        newMed.objectMaker()
    })
    $('.day').on('click', function(){
        curPair = $('#makePair').attr('value');
         $('#myChart').remove();
         $('iframe').remove();
        $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
        var newBTCUrl = new drawChart(curPair,86400);
        newBTCUrl.objectMaker();
    })


