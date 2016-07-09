# Coding Challenge for Reputation Loop

> _This is in a public repo, so I have removed my private API key from the above url and instead google's embed feature for the map_
> _I did this as a skills assessment for a PHP developer position_

[www.acodeabove.com/code-challenge](http://www.acodeabove.com/code-challenge)

_Note: The code in this repository is set up to run on localhost._

This took me a little over 4 hours to complete. I first created a proxy file, `proxy.php`, to bypass the No Access Control Header and access the API.

After verifying that I was getting a response from the API, I used `JSON.stringify()` on each element in the JSON response, and removed all double quotations.

I used Bootstrap to style the page and easily maintain a responsive design. I should be fully responsive across browsers and screen sizes.

I created a table for the reviews, with a unique identifier for each row, based on the order in which they are displayed.

I used a switch statement to set the `img src`, displaying relevant icons, based on the source of the review.

The name of the customer in each review links to the review page, but clicking on the table row itself also links to the page.

The page loaded does not seem to change based on the parameters entered. I added `?review_id=`, but it loads the main review page for the business regardless.

I used [FontAwesome](http://fontawesome.io/icons/) icons to display stars instead of numbers for the rating.

I later chose to add a map of the location of the business using the [Google Maps API](https://developers.google.com/maps/documentation/embed/). The location on the map is based on the JSON response from the example API given. I removed the `<br>` tag and whitespace using regex, to ensure the URL is functional.
>_This google map does use an API key linked to my google account, so I will be removing it from github once you have reviewed this app._

Both the map and the review_from icons are hidden on small screens.

I also added a `tel` to the business phone number, so that clicking it on a mobile device will call the number.

I used fonts imported from [Google Fonts](https://www.google.com/fonts), and I used the color scheme generator [Coolors.co](https://coolors.co).

Passed the `current_page` as a parameter in the `$.getJSON` call to enable viewing all of the reviews.

Used Bootstrap's pagination class to display pages of reviews, and added navigation buttons.

>_KimberlytheGeek_
