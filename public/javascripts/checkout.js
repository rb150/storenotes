/* checkout: this file will be run on the front end, not on the back end.  Paste the publishable test key from stripe payment.  The first thing we need to do is grab our form
from the view.  Store this in a variable called form (using jquery syntax) and set it equal to the checkout form in the view by using the id tag.  Add a submit listener 
(jquery code) that makes sure the callback event occurs whenever someone submits the form.  In the form, we need to find the button and set the disabled property to true
(.prop('disabled, true)).  Next, copy the code from the stripe documentation (doesn't exist, so copied from some dude who did this (same as checkout)).  
Some adjustments need to be made: we will not be fetching the address but the name.  Also, the only real required fields are the first four, but for completeness sakes 
we will also fetch the name.  The rest are the ids that are being used in the checkout#.hbs file (make sure to change to id tag in jquery if not done).  The
first part of the function creates a token with the information and the second is the response handler which will get executed once it is done validating our data.
Also add a return false to make sure that once the form is submitted, that the form submission is stopped; so that we don't send a request to our service yet since we
haven't validated it yet.


*/

var stripe = Stripe('pk_test_5cRbG3z1fxtogaI7pO9fOcrj');

var $form = $('#checkout-form');

$form.submit(function(event) {
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
}, stripeResponseHandler);
});

