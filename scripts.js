var current_page = 1;
var star_full = '<i class="fa fa-star" aria-hidden="true"></i>';
var star_half = '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
var star_empty =  '<i class="fa fa-star-o" aria-hidden="true"></i>';

function getID(page_link){
  current_page = page_link.id;
  loadReviews(current_page);
}

function printReviews(reviews){

    if(current_page==1){
      $('.first').addClass('hidden');
      $('.prev').addClass('hidden');
      $('.next').removeClass('hidden');
      $('.last').removeClass('hidden');
    }
    else if(current_page==17){
      $('.first').removeClass('hidden');
      $('.prev').removeClass('hidden');
      $('.next').addClass('hidden');
      $('.last').addClass('hidden')
    }
    else{
      $('.first').removeClass('hidden');
      $('.prev').removeClass('hidden');
      $('.next').removeClass('hidden');
      $('.last').removeClass('hidden');
    }

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
      var num = i+1;
      var review_link = review.customer_url + '?review_id=' + review.review_id;
      review.rating = parseInt(review.rating);
      $('#review_' + num + ' .rating').html(star_full.repeat(review.rating) + star_empty.repeat(5-review.rating));
      $('#review_' + num + ' .customer_name').html('<a href="' + review_link + '">' + review.customer_name + '</a>');
      $('#review_' + num + ' .review_from').html('<img src="' + review_from + '">');
      $('#review_' + num + ' .description').html('"' + review.description + '"');
      $('#review_' + num).on('click',function(){location.href=review_link});
    });
}

function loadReviews(page){
  $.getJSON('localhost/code-challenge/proxy.php', {page: page}, function(json) {
    var reviews = json.reviews;
    printReviews(reviews);
  });
}

function apiCall(page){

  $.getJSON('localhost/code-challenge/proxy.php', {page: page}, function(json) {



    var total_rating = json.business_info.total_rating;
    var avg_rating = total_rating.total_avg_rating;
    $.each(json.business_info, function(i){
      json.business_info[i] = JSON.stringify(json.business_info[i]).replace(/\"+/g,'');
    });
    var business_info = json.business_info;
    var reviews = json.reviews;
    //var address = business_info.business_address.replace(/[\<br\>]/g,',');
    //var addressURL = 'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=' + address;
    //var map = '<iframe frameborder="0" style="border:0"  src="' + addressURL + '"allowfullscreen></iframe>'
    // NOTE: I have commented out the above lines to prevent a syntax error.
    // This is in a public repo, so I have removed my private API key from the above url and instead google's embed feature below.
    // I did this as an assessment for a remote developer position
    var map = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.688293292291!2d-122.33875934838147!3d47.61275039544352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490154b3243d8ad%3A0xe28ec8c66b939261!2s509+Olive+Way%2C+Seattle%2C+WA+98101!5e0!3m2!1sen!2sus!4v1468031835480" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'



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


    loadReviews(page);
  });
}

$(document).ready(function(){

  apiCall(current_page);

  $('.first').on('click', function(){
    current_page = 1;
    loadReviews(current_page);
  });
  $('.prev').on('click', function(){
    current_page -= 1;
    loadReviews(current_page);
  });
  $('.next').on('click', function(){
    current_page += 1;
    loadReviews(current_page);
  });
  $('.last').on('click', function(){
    current_page = 17;
    loadReviews(current_page);
  });


});
