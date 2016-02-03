var loggedInUsers = {};
var LoggedIn = 'TheUserIsLoggedIn';
//Create hard coded users to play around with, users have a username, password, and permissions
var user1={username:"TA1",password:"1AT",permissions:"TA"};
var user2={username:"TA2",password:"2AT",permissions:"TA"};
var user3={username:"STU1",password:"1UTS",permissions:"STU"};
var user4={username:"STU2",password:"1UTS",permissions:"STU"};
var user5={username:"PROF",password:"FORP",permissions:"PROF"};
var user6={username:"ADMIN",password:"ADMIN",permissions:"ADM"};
var userList=[user1,user2,user3,user4,user5,user6];
//list of TAs to make addming new assignments easier
var taList=[user1,user2];
//array to hold the assignments. This gets passed to the client to be able to view the tables
//each assignment has a name,start time,end time,TA(noted by the TAs username, comment, and completion time.
var assignments=[];


function makeAss(){//helper function to create an initial assignment starting and ending at the current time
        var start=new Date();
        for(var i=0;i<taList.length;i++) {
            var ass = {name: "A0", start: start, end: start, tas: taList[i].username, comment: "Not Started"};
            assignments[assignments.length] = ass;
        }


}
makeAss();

function dateAssignments() {//check whether assignments are late
    var now = new Date();
    for (var i = 0; i < assignments.length; i++)
        if (now.getTime() > assignments[i].end.getTime())
            if(assignments[i].comment!="Complete.")
            assignments[i].comment = "Late";

}





function index(req, res) {//the index page, it will redirect to the page for the respective permissions of the user
    if (req.session.username) {
        if(res.session.permissions) {
            if (req.session.permissions == "PROF")
                res.redirect("/professor");
            else if (req.session.permissions == "TA")
                res.redirect("/ta");
            else if (req.session.permissions == "STU")
                res.redirect("/student");
            else if (req.session.permissions == "ADM")
                res.redirect("/admin");
            else if (req.session.permissions == "NONE")
                res.redirect("/logout");
        }
            else res.redirect("/logout");

    } else {
	res.render('index', { title: 'COMP 2406 Session Demo', 
			      error: req.query.error });
    }
}


function users(req, res) {//unused as far as I know, however if somone were to be logged in without permissions somehow they would be redirected to this page
    if (req.session.username) {
	res.render("account.jade", {username:req.session.username,
				    title:"Account",
				    loggedInUsers: loggedInUsers});
    } else {
	res.redirect("/?error=Not Logged In");
    }
}
function admin(req,res){//directs to the administrator page
    if (req.session.username ) {
        res.render("admin.jade", {username:req.session.username,
            title:"Administrator",
            loggedInUsers: loggedInUsers,
            assignments: assignments});
    } else {
        res.redirect("/?error=Not Logged In");}



}

function professor(req,res){//directs to the professors page
    if (req.session.username ) {
        res.render("prof.jade", {username:req.session.username,
            title:"Professor",
            loggedInUsers: loggedInUsers,
            assignments: assignments});
    } else {
        res.redirect("/?error=Not Logged In");
    }

}
function ta(req,res){//directs to the ta page
        if (req.session.username ) {
            res.render("ta.jade", {username:req.session.username,
                title:"TA",
                loggedInUsers: loggedInUsers,
                assignments:assignments});
        } else {
            res.redirect("/?error=Not Logged In");
        }



}
function student(req,res){//directs to the student page
        if (req.session.username) {
            res.render("student.jade", {username:req.session.username,
                title:"STUDENT",
                loggedInUsers: loggedInUsers,
                assignments:assignments});
        } else {
            res.redirect("/?error=Not Logged In");
        }



}

function checkLogin(name,pass){//checks if the login is valid
    for(var i=0;i<userList.length;i++) {
        if (name == userList[i].username && pass == userList[i].password) {
            return true;
        }
    }
        return false;


}
function checkPerm(name){//checks the permissions of a given user
    for(var i=0;i<userList.length;i++){
       if(name==userList[i].username)
                return userList[i].permissions;
    }
    return "NONE";


}


function login(req, res) {//handles the log in form and redirects to the appropriate page
    var username = req.body.username;
    var password = req.body.password;


    if ( checkLogin(username,password)) {
        req.session.username = username;
        req.session.permissions=checkPerm(username);
        loggedInUsers[username] = LoggedIn;
        if(req.session.permissions=="PROF")
            res.redirect("/professor");
        else if(req.session.permissions=="TA")
            res.redirect("/ta");
        else if(req.session.permissions=="STU")
            res.redirect("/student");
        else if(req.session.permissions=="ADM")
            res.redirect("/admin");
        else if (req.session.permissions=="NONE")
            res.redirect("/users");
        else res.redirect("/login");
    }
       res.redirect("/?error=Invalid Login");

}
function createAssignment(req,res) {//creates a new assignment, My code creates an instance of the assignment for each TA since it was hard coded.
    //this means whenever the form is sent from the profs page an assignment is created for each TA
    //redirects back to the professors page since the professor is the only one who can invoke this function
    if(req.body.name && req.body.datestart && req.body.dateend) {

        var end = new Date(req.body.dateend);
        var start = new Date(req.body.datestart);
        for (var n = 0; n < assignments.length; n++) {

            if (assignments[n].name == req.body.name)
                res.redirect("/professor");
        }
        for (var i = 0; i < taList.length; i++) {
            var ass = {name: req.body.name, start: start, end: end, tas: taList[i].username, comment: "Not Started"};
            assignments[assignments.length] = ass;
        }
        res.redirect("/professor");
    }
    else {
        res.redirect("/professor");
    }


}

function startAssignment(req,res){//this handles the start assignment form for when the TAs start marking assignments
    //This changes the comment to in progress unless it was late or complete
    //redirects to the ta page since they are the only ones with access
   if (req.body.name && req.session.username) {

       var username = req.session.username;
       var assignment = req.body.name;
       console.log(username);
       console.log(assignment);
        for(var i=0;i<assignments.length;i++)
            if(assignments[i].name==assignment && assignments[i].tas==username && assignments[i].comment=="Not Started")
                assignments[i].comment="In Progress.";
       dateAssignments();
      res.redirect("/ta");
   }
    dateAssignments();
    res.redirect("/ta");

}
function completeAssignment(req,res){//this handles the complete assignment form for when the TAs complete an assignment
    //this changes the comment to complete
    //redirects to the ta page since they are the only ones who can invoke it

    if (req.body.name && req.session.username && req.body.dateend) {

        var username = req.session.username;
        var assignment = req.body.name;
        console.log(username);
        console.log(assignment);
        for(var i=0;i<assignments.length;i++)
            if(assignments[i].name==assignment && assignments[i].tas==username) {
                assignments[i].comment = "Complete.";
                var now=new Date(req.body.dateend);
                assignments[i].completed=now;
            }
        res.redirect("/ta");
    }
    dateAssignments();
    res.redirect("/ta");

}
function logout(req, res) {//logout function from original demo code
    delete loggedInUsers[req.session.username];
    /* OLD CODE FROM express-session module
    req.session.destroy(function(err){
        if(err){
            console.log("Error: %s", err);
        }
    });
    */
    req.session = null; //NEW CODE for cookie-session module
    res.redirect("/");
}
function newUser(req,res){//new user code for the bonus question
//creates a new user with the given username,password, and permissions so long as there is no user with the same name.
//redirects to the admin page because they are the only ones who can invoke it
    if(req.body.username && req.body.pass && req.body.permissions){
        if(req.body.permissions=="STU" || req.body.permissions=="TA" ||req.body.permissions=="PROF" || req.body.permissions=="ADM") {
            var user = {username: req.body.username, password: req.body.pass, permissions: req.body.permissions};
            for(var i=0;i<userList.length;i++)
            {
                if (userList[i].username == user.username) {
                    res.redirect("/admin");
                    return;
                }
            }
                userList[userList.length] = user;
                if (user.permissions == "TA")
                    taList[taList.length] = user;

           res.redirect("/admin");

        }
        res.redirect("/admin");
    }
    res.redirect("/admin");

}
setInterval(function(){//checks to see if the assignments are late every 3 seconds.
    dateAssignments();
},3000);
//exports
exports.index = index;
exports.student=student;
exports.professor=professor;
exports.ta=ta;
exports.users = users;
exports.login = login;
exports.logout = logout;
exports.createAssignment=createAssignment;
exports.startAssignment=startAssignment;
exports.completeAssignment=completeAssignment;
exports.admin=admin;
exports.newUser=newUser;
