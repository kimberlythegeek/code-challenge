var current_page = 1;
var star_full = '<i class="fa fa-star" aria-hidden="true"></i>';
var star_half = '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
var star_empty =  '<i class="fa fa-star-o" aria-hidden="true"></i>';

function getID(page_link){
  current_page = page_link.id;
  apiCall(current_page);
}

function apiCall(page){

  $.getJSON('http://www.acodeabove.com/code-challenge/proxy.php', {page: page}, function(json) {

    if(current_page==1){
      $('.first').addClass('hidden');
      $('.last').removeClass('hidden');
    }
    else if(current_page==17){
      $('.first').removeClass('hidden');
      $('.last').addClass('hidden')
    }
    else{
      $('.first').removeClass('hidden');
      $('.last').removeClass('hidden');
    }

    var total_rating = json.business_info.total_rating;
    var avg_rating = total_rating.total_avg_rating;
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
      if(avg_rating%parseInt(avg_rating) > 0){
        $('#star_rating').html(star_full.repeat(parseInt(avg_rating)) + star_half + star_empty.repeat(5 - parseInt(avg_rating) - 1));
      }
      else {
        $('#star_rating').html(star_full.repeat(parseInt(avg_rating)) + star_empty.repeat(5 - avg_rating));
      }
    $('#total_rating').html('Average Rating: ' + avg_rating + ' out of ' + total_rating.total_no_of_reviews + ' reviews');
    $('#add_review').html('<a href = ' + business_info.external_url + '>Add a Review</a>');
    $('#more_reviews').html('<br><a href = ' + business_info.external_page_url + '>See more reviews</a>');
    $('.map').html(map);

    var page_numbers = '<ul class="pagination pagination-sm">';
    for(i=1; i<18; i++){ page_numbers += '<li><a id="' + i + '" href=# onclick="javascript:getID(this)">' + i + '</a></li>'; }
    page_numbers += '</ul>';
    $('.page').html(page_numbers);

    $.each(reviews,function(i){
      console.log(i);
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
      var num = i+1;
      var review_link = review.customer_url + '?review_id=' + review.review_id;
      review.rating = parseInt(review.rating);
      $('#review_' + num + ' .rating').html(star_full.repeat(review.rating) + star_empty.repeat(5-review.rating));
      $('#review_' + num + ' .customer_name').html('<a href="' + review_link + '">' + review.customer_name + '</a>');
      $('#review_' + num + ' .review_from').html('<img src="' + review_from + '">');
      $('#review_' + num + ' .description').html('"' + review.description + '"');
      $('#review_' + num).on('click',function(){location.href=review_link});
    });
  });
}

$(document).ready(function(){

  apiCall(current_page);



});
