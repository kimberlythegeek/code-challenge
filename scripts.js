var myURL = 'http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews=10&internal=1&yelp=1&google=1&offset=50&threshold=1';

$(document).ready(function(){

  $.ajax({
      type: 'GET',
      url: myURL,
      dataType: 'jsonp',
      success: function (data) {
          console.log(data);
      },
      jsonp: 'jsonp',
  });
});
