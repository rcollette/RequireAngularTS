﻿interface IRouteDefinition extends ng.route.IRoute {
    path: string;
    name: string;
    title: string;
    menuOrder?: number;
    menuText?: string;
}

module app.routing {
    angular.module("app").config(config);

    function config($routeProvider: ng.route.IRouteProvider, routeResolverProvider: block.router.RouteResolverProvider) {
        // routeResolverProvider is a provider rather than a service at this point because we cannot get
        // service instances during module configuration.

        // Create a shortcut to the method we're going to call repeatedly.
        var resolve = routeResolverProvider.resolve;
        // by using a typed array, TypeScript helps us ensure that we are entering our route definitions correctly and consistently.
        var routeDefinitions: IRouteDefinition[] = [
            {
                path: "/PurchaseOrders/:id",
                name: "PurchaseOrder",
                title: "Purchase Order {{:id}}",
                controller: "PurchaseOrderController",
                templateUrl: "modules/PurchaseOrder/PurchaseOrder.html",
                controllerAs: "vm",
                // resolve the AMD module as though we were using the requireJs require() function.
                // this can be a path relative to the requireJs base path without the file extension,
                // or it can be a named path as set in require.config()
                resolve: resolve(["modules/PurchaseOrder/PurchaseOrder.controller"])
            },
            {
                menuOrder: 30,
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
                menuText: "Vendors",
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

    angular.module("app").run(run);

    function run($rootScope: ng.IRootScopeService, $route: ng.route.IRouteService) {
        // provide a globally accessible function for building paths to routes by routeName
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
    }
} 