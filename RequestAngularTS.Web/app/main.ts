(function () {
    require.config({
        paths: {
            angular: "components/angular/angular",
            angularRoute: "components/angular-route/angular-route",
            angularAnimate: "components/angular-animate/angular-animate.min",
            angularResource: "components/angular-resource/angular-resource.min",
            jquery: "components/jquery/dist/jquery.min",
            bootstrap: "components/bootstrap/dist/js/bootstrap.min",
            angularToastr: "components/angular-toastr/dist/angular-toastr.min",
            moment: "components/moment/min/moment.min",
            appModule: "modules/App/App.module",
            appRoutes: "modules/App/App.routes",
            appController: "modules/App/App.controller",
            text: "components/requirejs-text/text"
        },
        shim: {
            angular: { exports: "angular", deps: ["jquery"] },
            angularRoute: { deps: ["angular"] },
            angularAnimate: { deps: ["angular"] },
            angularResource: { deps: ["angular"] },
            angularTouch: { deps: ["angular"] },
            jquery: { exports: "$" },
            angularToastr: { deps: ["angular", "angularAnimate", "jquery"] },
            bootstrap: { deps: ["jquery"] },
            moment: { deps: ["jquery"] },
            appModule: { deps: ["angular", "angularRoute", "angularAnimate"] },
            appRoutes: { deps: ["appModule"] },
            appController: { deps: ["appRoutes"] }
        },
        priority: [
            "angular"
        ],
        urlArgs: "v=1.0"
    });

    // angular must be first in this list.
    require([
        "angular",
        "angularRoute",
        "angularAnimate",
        "angularResource",
        "appController",
        "angularToastr",
        "bootstrap",
        "moment",
        "modules/PurchaseOrder/PurchaseOrder.module"
    ], function (angular: any) {
            $(document).ready(function () {
                var $html = $("html");
                angular.bootstrap($html, ["app"], { "strictDi": false });

                // more info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
                $html.addClass("ng-app");
            });
        });
})();