/**
 * Created by yp on 27.10.16.
 */
function LoginControllerImpl($state, db) {
  this.db = db;
  this.state = $state;
}

LoginControllerImpl.prototype.onFail = function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  console.error(error);
  // ...
};

LoginControllerImpl.prototype.signupEmail = function() {
  var email = this.email;
  var password = this.password;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(snapshot) {
    console.log("user signed up " + JSON.stringify(snapshot));
    var uid = snapshot.uid;
    var data = {
      carma: 0
    };
    this.db.ref("users").child(uid).push(data);
    this.goToGameAsUser(snapshot);
    }.bind(this), this.onFail
  );

};

LoginControllerImpl.prototype.emailLogin = function () {
  var email = this.email;
  var password = this.password;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (snapshot) {
      console.log("user logged in " + JSON.stringify(snapshot));
      this.goToGameAsUser(snapshot);
    }.bind(this), this.onFail
  );

};

LoginControllerImpl.prototype.goToGameAsUser = function (snapshot) {
  CurrentUser.snapshot = snapshot;
  this.state.go("game");
};


LoginControllerImpl.prototype.showSignupWindow = function () {
  this.state.go("signup");
};
