(function () {
    require.config({
        paths: {
            // third party libraries
            angular: "components/angular/angular.min",
            angularRoute: "components/angular-route/angular-route.min",
            angularAnimate: "components/angular-animate/angular-animate.min",
            angularResource: "components/angular-resource/angular-resource",
            jquery: "components/jquery/dist/jquery.min",
            bootstrap: "components/bootstrap/dist/js/bootstrap.min",
            angularToastr: "components/angular-toastr/dist/angular-toastr.min",
            moment: "components/moment/min/moment.min",
            text: "components/requirejs-text/text",

            // block modules
            blockRouterModule: "blocks/router/blocks.router.module",
            routeResolver: "blocks/router/RouteResolver.provider",

            // services

            // feature modules
            appCoreModule: "modules/Core/App.Core.module",
            appModule: "modules/App/App.module",
            appRoutes: "modules/App/App.routes",
            appController: "modules/App/App.controller",
            purchaseOrderModule: "modules/PurchaseOrder/PurchaseOrder.module"
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
            //blocks
            appCoreModule: {
                deps: [
                    "angular",
                    "angularRoute",
                    "angularAnimate",
                    "angularResource",
                    "bootstrap",
                    "moment",
                    "angularToastr",
                    "blockRouterModule",
                    "routeResolver"]
            },
            //The appModule defines the feature module dependencies for the application
            appModule: {
                deps: [
                    "appCoreModule",
                    "purchaseOrderModule"]
            },
            appRoutes: { deps: ["appModule"] },
            appController: { deps: ["appRoutes"] }
        },
        priority: [
            "angular"
        ],
        urlArgs: ""//"v=1.0"  //Cache busting parameters
    });

    // angular must be first in this list.
    require([
        "angular",
        "appController"
    ], function (angular: any) {
            $(document).ready(function () {
                var $html = $("html");
                angular.bootstrap($html, ["app"], { "strictDi": true });

                // more info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
                $html.addClass("ng-app");
            });
        });
})();