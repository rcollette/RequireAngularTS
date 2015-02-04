/// <reference path="../typings/tsd.d.ts" />
(function () {
    require.config({
        paths: {
            angular: "components/angular/angular",
            angularRoutes: "components/angular-route/angular-route",
            angularAnimate: "components/angular-animate/angular-animate.min",
            angularResource: "components/angular-resource/angular-resource.min",
            jquery: "components/jquery/dist/jquery.min",
            bootstrap: "components/bootstrap/dist/js/bootstrap.min",
            angularToastr: "components/angular-toastr/dist/angular-toastr.min",
            moment: "components/moment/min/moment.min",
            appModule: "modules/App/App.module",
            appRoutes: "modules/App/App.routes",
            appController: "modules/App/App.controller"
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
            appModule: { deps: ["angular", "angularRoutes", "angularAnimate"] },
            appRoutes: { deps: ['appModule'] },
            appController: { deps: ['appRoutes'] }
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
        "appController",
        "angularToastr",
        "bootstrap",
        "moment",
        "modules/PurchaseOrder/PurchaseOrder.module"
        // todo add app controller"",
    ], function (angular: any) {
            $(document).ready(function () {
                var $html = $("html");
                angular.bootstrap($html, ["app"], { "strictDi": false });

                // more info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
                $html.addClass("ng-app");
            });
        });
})();