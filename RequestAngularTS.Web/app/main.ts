/// <reference path="../typings/tsd.d.ts" />
(function () {
    require.config({
        paths: {
            app: "app.min",
            angular: "components/angular/angular.min",
            angularRoutes: "components/angular/angular-route.min",
            angularAnimate: "components/angular/angular-animate.min",
            angularResource: "components/angular/angular-resource.min",
            jquery: "components/jquery/dist/jquery.min",
            bootstrap: "components/bootstrap/dist/js/bootstrap.min",
            angularToastr: "components/angular-toastr/dist/angular-toastr.min",
            moment: "components/moment/min/moment.min"
        },
        shim: {
            angular: { exports: "angular", deps: ["jquery"] },
            angularRoutes: { deps: ["angular"] },
            angularAnimate: { deps: ["angular"] },
            angularResource: { deps: ["angular"] },
            angularTouch: { deps: ["angular"] },
            jquery: { exports: "$" },
            angularToastr: { deps: ["angular", "angularAnimate", "jquery"] },
            bootstrap: { deps: ["jquery"] },
            moment: { deps: ["jquery"] },
            app: { deps: ["angular", "angularRoutes", "angularAnimate"] }
        },
        priority: [
            "angular"
        ]
    });

    // angular must be first in this list.
    require([
        "angular",
        "angularRoutes",
        "angularAnimate",
        "angularResource",
        "app",
        "appRoutes",
        "angularToastr",
        "bootstrap",
        "moment",
        "controllers/MasterController",
    ], function (angular: any) {
            $(document).ready(function () {
                var $html = $("html");
                angular.bootstrap($html, ["app"], { "strictDi": true });

                // more info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
                $html.addClass("ng-app");
            });
        });
})();