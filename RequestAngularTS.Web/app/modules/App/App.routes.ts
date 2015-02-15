interface IRouteDefinition extends ng.route.IRoute {
    path: string;
    name: string;
    title: string;
    menuOrder?: number;
    menuText?: string;
}

angular.module("app").config(
    function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
        function resolve(modules: string[]) {
            var result: any = { deps: deferredController(modules) };
            return result;
        }

        function deferredController(modules: string[]) {
            /*@ngInject*/
            var x = function ($q: ng.IQService, $rootScope: ng.IRootScopeService) {
                var deferred = $q.defer();
                require(modules, function () {
                    // all dependencies have been resolved so resolve the promise.
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            };
            return x;
        }

        $locationProvider.html5Mode(true);

        // by using a typed array, TypeScript helps us ensure that we are entering our route definitions correctly and consistently.
        var routeDefinitions: IRouteDefinition[] = [
            {
                path: "/PurhaseOrders/:id",
                name: "PurchaseOrder",
                title: "Purchase Order",
                controller: "PurchaseOrderController",
                templateUrl: "modules/PurchaseOrder/PurchaseOrder.html",
                controllerAs: "vm",
                resolve: resolve(["modules/PurchaseOrder/PurchaseOrder.controller"])
            },
            {
                menuOrder: 10,
                menuText: "Purchase Orders",
                path: "/PurchaseOrders",
                name: "PurchaseOrders",
                title: "Purchase Orders",
                controller: "PurchaseOrdersController",
                templateUrl: "modules/PurchaseOrder/PurchaseOrders.html",
                controllerAs: "vm",
                resolve: resolve([
                    "modules/PurchaseOrder/PurchaseOrders.controller"])
            },
            {
                menuOrder: 20,
                menuText: "Vedors",
                path: "/Vendors",
                name: "Vendors",
                title: "Vendors",
                controller: "VendorsController",
                templateUrl: "modules/Vendor/Vendors.html",
                controllerAs: "vm",
                resolve: resolve([
                    "directives/HtmlTemplate/HtmlTemplate.directive",
                    "modules/Vendor/Vendors.controller"])
            },
            {
                path: "/Vendors/:id",
                name: "Vendor",
                title: "Vendor {{:id}}",
                controller: "Vendor",
                templateUrl: "modules/Vendor/Vendor.html",
                controllerAs: "vm",
                resolve: resolve(["modules/Vendor/Vendors.controller"])
                // note that this is the file name without the .js extension relative to the app folder
            }

        ];

        for (var i = 0; i < routeDefinitions.length; i++) {
            var routeDefinition = routeDefinitions[i];
            $routeProvider.when(routeDefinition.path, routeDefinition);
        }

        $routeProvider.otherwise({
            redirectTo: "/PurchaseOrders"
        });
    }
    );

angular.module("app").run(($rootScope: ng.IRootScopeService, $route: ng.route.IRouteService) => {
    // provide a globally accessible function for building paths to to routes by routeName
    $rootScope["routePath"] = function (routeName: string, parameters: { [index: string]: any }) {
        // iterate over all available routes
        var routes = $route.routes;
        for (var i = 0; i < routes.length; i++) {
            var route = <IRouteDefinition>routes[i];
            if (routeName === route.name) {
                var result = route.path;
                for (var parameterName in parameters) {
                    if (parameters.hasOwnProperty(parameterName)) {
                        result = result.replace(":" + parameterName, parameters[parameterName]);
                    }
                }
                return result;
            }
        }

        throw "Undefined route name: " + routeName;
    };
});