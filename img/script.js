var newBTCUrl = new drawChart('BTC',86400);
newBTCUrl.objectMaker();


$(function(){
    $('.fiveMin').click(function(){
        $('#myChart').remove();
        $('iframe').remove();
        $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');

        var newSmall = new drawChart('BTC',300);
        newSmall.objectMaker()
    })
    $('.fourHour').click(function(){
         $('#myChart').remove();
         $('iframe').remove();
        $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
        var newMed = new drawChart('BTC',14400);
        newMed.objectMaker()
    })
    $('.day').click(function(){
         $('#myChart').remove();
         $('iframe').remove();
        $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
        var newBTCUrl = new drawChart('ETH',86400);
        newBTCUrl.objectMaker();
    })

})
