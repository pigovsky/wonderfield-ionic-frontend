/**
 * Created by yp on 25.10.16.
 */
function HomeControllerImpl($scope, db) {
  $scope.gameTask = {
    hint: "x",
    currentWordState: "y"
  };
  $scope.messages = [];
  this.scope = $scope;
  this.db = db;
  this.gameTaskRef = this.db.ref("gameTask");
  this.gameTaskRef.on("value", this.onTaskUpdated.bind(this));
  this.gameTaskRef.once("value").then(this.onTaskUpdated.bind(this));
}

HomeControllerImpl.prototype.onTaskUpdated = function (snapshot) {
  var gameTask = snapshot.val();
  console.error("gameTask " + JSON.stringify(gameTask));
  this.scope.gameTask = gameTask;
  var index = this.scope.messages.indexOf(gameTask.message);
  if (index >= 0) {
    this.scope.messages.splice(index, 1);
  }
  this.scope.messages.push(gameTask.message);
  this.scope.$apply();
};

HomeControllerImpl.prototype.guess = function () {
  var word = this.word;
  console.error("guess " + word);
  this.word = "";
  this.db.ref("guesses").push(
    {
      uid: CurrentUser.snapshot.uid,
      displayName: CurrentUser.snapshot.email,
      word: word
    }
  );
};
