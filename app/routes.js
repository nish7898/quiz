module.exports = function(app, passport){
    var currentUser;
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        currentUser = req.user;
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/verify',(req,res)=>{
        console.log(req.user);
        res.render('verify');
    });
    
    app.put('/verification',(req,res)=>{
        var bcrypt=require('bcrypt-nodejs');
        var user=require('./models/user');
        var obj = {
            local : {
                'email' : req.body.email,
                'token' : req.body.token
            }
        };
        var flag;
        console.log(obj);
        console.log(obj);
        user.findOne({'local.email' : req.body.email},function(err,doc){
            console.log(doc);
            if(doc)
            if(doc.local.token === req.body.token)
            {
                user.update({'local.email' : obj.local.email},{"$set" : {'local.token' : true}},(err)=>{
                    if(err)
                    throw err;
                });
                flag = true;
                res.send(flag);
            }
            else{
                flag=false;
                res.send(flag);
            }
        })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/verify', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        
    else{
        res.redirect('/');
    }
};