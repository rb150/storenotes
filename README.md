1: Use express generator, created generic express app with handlebars as templating engine (express shopping-cart --hbs)
and installed dependencies (cd into folder and npm install)

2: Remove users.js from routes folder and removed /users route from app.js

3: Add bootstrap and jquery cdns to layout.hbs and renamed to layout1.hbs

4. (Unecessary, see 10) Add app.set('view options', {layout: 'layout1'}) to app.js and renamed to app1.js

5. Create header (copy and paste navbar from bootstrap)

6. Create partials sub-folder in views folder and create header file (navbar)

7. npm install express-handlebars

8. Import express-handlebars (expressHbs via require()).

9. In view engine, replace app.set() with app.engine()

10. Pass imported variable (expressHbs), and set defaultLayout to whatever layout is being used
(make sure to make a layout folder as that is where the engine looks for the layout files.)

11. Modify copied header to liking (import font awesome for icons)

12. Include header by adding header file using {{>}} from partials folder (make folder if not there)

13. Create new sub-folder called "shop" in "views" folder

14. Move index.hbs into shop folder and change the path in index.js (under routes) to shop/index.hbs

15. Use "card" component (like thumbnail) from bootstrap to contain items.

16. npm install mongoose and import mongoose via require() and pass port and database location

17. Create data to seed (need to seed data).  Start by making models folder.

18. Models folder will store mongoose models.  Mongoose uses schema to define data with which we work.
    We will use the defined models here to interact with data and work with it while having this validation
    in place since we have defined how the data looks like

19. Create product model (product.js) in models folder.

20. Import mongoose as well as mongoose.Schema.  Create a new schema, which passes javascript object that 
    defines the schema.  Basically, define how the data will look  (in this case product image, title, description, price).

21. Seed data into database (data).  Can download packages to make seeding simple or make your own.  We will make our own.

22. Create new directory called seed.  Create new file in directory called product-seeder.js.  We are creating seeder per model,
    but one seeder for all data is also possible.

23. Once data is seeded (run the seeder file, in this case product-seeder#.js), it must be outputted.

24. In routes folder, go to route that renders home view (index.js for shop/index#.hbs)

25. Import product model via require(), and pass the model with seeded data into the render function (routs/index2.js)

26. Set up user interface.  Create new folder called user in the views folder.

27. In user folder, create a profile, signin, and signup handlebars (or whatever templating engine) templates.
(In tutorial (video 6), signup view was created first.)

28. At some point, a user model must be created to import user info from mongodb

29. Need CSRF protection.  Csrf protection makes sure our session does not get stolen, or if it gets stolen, other users still aren't able to create users with our session.  Csrf sends token which allows the server to identify if the browser sending the token is the same browser that got the session in the first place.  We will use csurf.

30. In order for #29 (above) to work, csurfs default configuration is set for sessions to be enabled.  Sessions doesnt
exist innately on node and so it must be imported via seperate package (express-session). Import express-session into app file and use it

31. npm install csurf and import it in the index# file in the routes folder.  Csrf protection is used in the route not in the app# file

32. npm install passport for user sign up, log in, validation, etc.  Also npm install bcrypt (bcrypt-nodejs) for encrypting passwords.  Lastly npm install connect-flash which is a package that has flash messages enabled in my application.  Flash messages are messages that are stored in a session and can be shown in the view; and after are deleted from the session (error messages for example).  Import and use pasport and connect-flash packages in app#.js.
Use bcrypt in mongoose model.

33. passport is basic and requires you to choose a "strategy" as a way to authenticate (login via facebook, google, etc.).  We want to store our users
in a database so we will use the local strategy.  This must be installed via npm install passport-local.  This will allow us to configure the strategy to our needs

34. In order to configure the strategy, create a new folder called config.  In config, create a passport.js file.  This will be where we want to set up passport and the strategy we will use.
    *side note*: if passport is imported in two files, the config will be available to both files, in passports case (why? google this)

35. In ordrer to encrypt the password, import bcrypt in the user.js file in the models folder.  Once these helper methods are crated, it can be used in the model in the passport.js file for a new user.  In passport.js replace the password for newUser.password with the encrypted password

36. Once you are able to create a new user (passport1.js), we need to apply the strategy.  In the index.js file in the routes folder, we will no longer re-direct to the root (post) route. Replace function with passport.authenticate middleware.  Redirect to different pages based on success or failure authentication.  Also make sure to require the config file in app#.js so that passport can use these strategies.

37. We need to output errors that arise during signup.  This is done by using connect-flash package.  In index#.js file, bind the req.flash('error') emthod to a variable (messages) and output the messages in the render method.  In the view (signup#.hbs) check to see if there are messages (hasErrors variable) and then loop through and display them.

38. Currently any input can be used for the email.  We need to make sure we are only accepting email addresses. We will use express-validator, which is a third party package.  npm install express-validator and import (require) it in app#.js.  Now we must add validation in the route.  However, we are using passport to handle the requests and create user.  Therefore, we must validate in passport#.js 

39. Video 9.  Create signin authentication, route, and view.  Mostly copied and pasted from sign up authentication, routes, and view.

40. Video 10.  Route grouping and protection.  The routes in index#.js share similarities.  For example, there are a number of /user/whatever (signin, signup, etc.).  These can be grouped together.  Create a new routes file in the routes folder.  Take all the routes with "/user" in them and transfer them into the user routes file.  Also copy the imports that will be used in both route files (express, router, csrf) and delete the ones that are unecessary in index#.js (passport and csrf).

41. Video11. npm install connect-mongo in the app file, which gives the ability to store the cart in a session as well as delete it and so forth.  We also created a global variable (res.locals.variable) to allow the session to be used in the views. 

42. Video 12. We want to add items to the cart so we create a path in the routes folder and link the button in the shop views (index#) to that route (/add-to-cart/).
We also get access to the id in the parameter portion of the url (look at index# for better explanation).

43. We also need to create a cart model, so make a cart.js file in the models folder.  It is important to get this cart model right, but there are many different ways to do it.(updated app10.js, index6.hbs, and cart1,2.js)

44. Video 13. Add badge next to sopping icon.  Make cart view to see the shopping cart on the screen

45. Video 14. Created stripe payment view as well as route (checkout.hbs, index.js).  Copied from some website

46. Video 15.  Added stripe through front end.  Stripe does not work with the back end, it goes to its servers to verify input and then waits for the validation result to comeback.  As such, this will be imported in our view page (checkout.hbs) through a script tag.   Also create a new file named checkout.js that will be placed in your javascript folder (this folder is in public, I think it was put in with the generator).  These files run on the front end, not on the back end.  Be sure to import this file into the checkout#.hbs view, also in a script tag.

47. Video 15.  We must set our publishable key.  This is required because when stripe validates the credit card data, it will give us back a token if the data is valid.
This token will hold the credit card data and it will be encrypted with our publishable key.  WIth that key and a private key, we will be able to decrypt the credit card information and make the actual charge (two step process, validatio nthen charging).  We need the key to encrypt the data to protect us from cross sites? scripting attack?
basically nefarious activities (send us a wrong charge whcih we would make on our backend); two keys makes it so charges are actually issued from our own page using the key.

48. Video 16. Need to npm install stripe.  Since the form we use is using a post route to the path /checkout, we need to make that path in the index# router file. Use secret key (real key) that will be put on our server. 

49. Video 17.  We need to store the orders in our database so that we can send them out instead of just receiving charges.  Create an order model (make order file in models folder).  This will be a mongoose model, so we can copy the product model and change the schema.

50. Video 18.  (index14, user2, user3, signin1) Force user login and also set up redirecting to the previous url.  For example, if user was on the way to checkout, take them back to checkout after you force them to login.  If they didn't want to go to checkout, sending them there after signin is stupid.  First protect the get/post checkout routes with the isLoggedIn function.

51.  Video 19.  (user4).  Add list of items in shopping cart to profile page in case user has not checked out yet.