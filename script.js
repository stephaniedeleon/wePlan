function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // makes log in invisible and log out visible
    document.getElementById("signin").classList.add("hidden");
    document.getElementById("signout").classList.remove("hidden");

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    // Shows the welcome and name of user!
    var welcomeEl = document.querySelector('#welcome')
    welcomeEl.innerText = "Welcome " + profile.getGivenName() + "!";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });

    // makes log-in visible and log-out invisible
    document.getElementById("signin").classList.remove("hidden");
    document.getElementById("signout").classList.add("hidden");

    // Removes Welcome
    var welcomeEl = document.querySelector('#welcome')
    welcomeEl.innerText = "";
}

function w3_open() {
    document.getElementById("menu").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function w3_close(){
    document.getElementById("menu").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

