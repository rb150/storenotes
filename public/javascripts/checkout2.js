/* checkout: this file will be run on the front end, not on the back end.  Paste the publishable test key from stripe payment.  The first thing we need to do is grab our form
from the view.  Store this in a variable called form (using jquery syntax) and set it equal to the checkout form in the view by using the id tag.  Add a submit listener 
(jquery code) that makes sure the callback event occurs whenever someone submits the form.  In the form, we need to find the button and set the disabled property to true
(.prop('disabled, true)).  We do this so that once the form is submitted, we don't want the user to be submitting the form multiple times while validation
is taking place. Next, copy the code from the stripe documentation (doesn't exist, so copied from some dude who did this (same as checkout)).  
Some adjustments need to be made: we will not be fetching the address but the name.  Also, the only real required fields are the first four, but for completeness sakes 
we will also fetch the name.  The rest are the ids that are being used in the checkout#.hbs file (make sure to change to id tag in jquery if not done).  The
first part of the function creates a token with the information and the second is the response handler which will get executed once it is done validating our data.
Also add a return false!!!! to make sure that once the form is submitted, that the form submission is stopped; so that we don't send a request to our service yet since we
haven't validated it yet.  Therefore, we don't want to submit it yet.


checkout1: We need to make the stripeResponseHandler function (which is given in the "documentation" (some dude)).  What this does is first check to see if there are errors
in our response (form or data is invalid) which if is the case, we show an error  message (which we have to make in the views).  ALso, we re-enable the submission that we
set to disable earlier (if we fail, we want to enable it again so that the user may fix their erros).  If there are no errors, then we get the token that stripe created for us.
This token can be fetched on the response object which gets passed into the callback and on the id property (response.id).  This property is available due to the stripe sdk
being added to our project.  Then we add a hidden input field (using jquery), which has the name "stripeToken", and which gets the token that we set previously, and adds it
as a value.  As with csrf protection which used a hidden input field, we are also adding this token which holds the encrypted credit card information to the form.  Once we have
attached the token to the form, we can pass the form to stripes' servers (the form.get().submit).  Once we do that, we pass the encoded and validated credit card information
to the server as well.  We encrypted this with our key, so we can decrypt it with our private key.  If these keys match, a charge is made (work on that later).
We have an error case here, but no error case in the views, so that needs to be made.

checkout2: Once view div is made, add a jquery remove class function for the hidden class gets removed from the views and you can see the error.  Make sure to not use 
"form.find" since the div is outside the form; instead just use the normal jquery identifier

has been modified (charge error to payment error(payment error was original docu not dude))

*/

Stripe.setPublishableKey('pk_test_5cRbG3z1fxtogaI7pO9fOcrj');

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
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!

        // Show the errors on the form
        $('#payment-errors').text(response.error.message);
        $('#payment-errors').removeClass('d-none');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
    var token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}
