//Cross module dependencies.
//These are modules upon which most controllers are dependent.
// todo: Features are now dependent upon App.Core.  Can we reuse features across applications if they don't explicitly declare their dependencies?
angular.module("app.core", [
    "ngRoute",
    "ngAnimate",
    "ngResource",
    "toastr",
    "blocks.router"
]);