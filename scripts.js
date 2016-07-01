var myURL = 'http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&format=json&noOfReviews=10&internal=1&yelp=1&google=1&offset=50&threshold=1';


$(document).ready(function(){

  $.getJSON("http://www.acodeabove.com/code-challenge/proxy.php", function(json) {
    $.each(json.business_info, function(i){
      json.business_info[i] = JSON.stringify(json.business_info[i]).replace(/\"+/g,'');
    });
    var business_info = json.business_info;
    var reviews = json.reviews;
    var address = business_info.business_address.replace(/[\<br\>]/g,',');
    var addressURL = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBhR4-RfMgyFXCg1_Rx2VPvpeD6VWEHoWw&q=' + address;
    var map = '<iframe frameborder="0" style="border:0"  src="' + addressURL + '"allowfullscreen></iframe>'

    $('.name').html('<h1>' + business_info.business_name);
    $('.address').html(business_info.business_address);
    $('.phone').html('<a href="tel:1' + business_info.business_phone.replace(/[\s\-\(\)]/g,'') + '">' + business_info.business_phone + '</a>');
    $('.ratings').html(business_info.total_rating.total_avg_rating);
    $('.ratings').html(business_info.total_rating.total_no_of_reviews);
    $('.url').append('<a href = ' + business_info.external_url + '>Add a Review</a>');
    $('.url').append('<br><a href = ' + business_info.external_page_url + '>See more reviews</a>');
    $('.map').html(map);

    $.each(reviews,function(i){
      var review = reviews[i];
      $.each(review, function(j){
        review[j] = JSON.stringify(review[j]).replace(/\"+/g,'');
      });
      var review_from = '';
      switch(review.review_from){
        case "0":
          review_from = 'http://localreviewdirectory.com/resize/images/social_icon/opentable.png?w=40';
          break;
        case "1":
          review_from = 'http://localreviewdirectory.com/resize/images/social_icon/yelp_logo.png?w=40';
          break;
        case "2":
          review_from = 'http://localreviewdirectory.com/resize/images/social_icon/google_logo.png?w=40';
          break;
        default:
          review_from = 'invalid source';
      }
      var star_full = '<i class="fa fa-star" aria-hidden="true"></i>';
      var star_empty =  '<i class="fa fa-star-o" aria-hidden="true"></i>';
      var review_link = review.customer_url + '?review_id=' + review.review_id;
      review.rating = parseInt(review.rating);
      $('tbody').append('<tr id="review_' + i + '">');
      $('#review_' + i).append('<td class="rating">' + star_full.repeat(review.rating) + star_empty.repeat(5-review.rating) + '</td>');
      $('#review_' + i).append('<td class="customer_name">' + '<a href="' + review_link + '">' + review.customer_name + '</a></td>');
      $('#review_' + i).append('<td class="description">' + review.description + '</td>');
      $('#review_' + i).append('<td class="review_from"><img src="' + review_from + '"></td></tr>');
      $('#review_' + i).on('click',function(){location.href=review_link});
    });

  })
});
