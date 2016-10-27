/**
 * Created by yp on 27.10.16.
 */
function Config($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state("login",
      {
        url: "/login",
        templateUrl: "templates/loginView.html"
      }
    )
    .state("signup",
      {
        url: "/signup",
        templateUrl: "templates/signupView.html"
      }
    )
    .state("game",
      {
        url: "/game",
        templateUrl: "templates/gameView.html"
      });

  $urlRouterProvider.otherwise("/login");
}
