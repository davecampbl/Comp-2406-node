var loggedInUsers = {};
var LoggedIn = 'TheUserIsLoggedIn';

function index(req, res) {
    if (req.session.username) {
        res.redirect("/users");
    } else {
	res.render('index', { title: 'COMP 2406 Session Demo', 
			      error: req.query.error });
    }
}

function users(req, res) {
    if (req.session.username) {
	res.render("account.jade", {username:req.session.username,
				    title:"Account",
				    loggedInUsers: loggedInUsers});
    } else {
	res.redirect("/?error=Not Logged In");
    }
};

function login(req, res) {
    var username = req.body.username;
    req.session.username = username;
    loggedInUsers[username] = LoggedIn;
    res.redirect("/users")
}

function logout(req, res) {
    delete loggedInUsers[req.session.username];
    req.session.destroy(function(err){
        if(err){
            console.log("Error: %s", err);
        }
    });
    res.redirect("/");
}

exports.index = index;
exports.users = users;
exports.login = login;
exports.logout = logout;
