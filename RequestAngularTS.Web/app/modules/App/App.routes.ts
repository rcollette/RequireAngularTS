(function () {
    function resolve(modules: string[]) {
        var result: any = { deps: deferredController(modules) };
        return result;
    }

    function deferredController(modules: string[]) {
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

    angular.module("app").config(["$routeProvider", function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
        $routeProvider
            .when("/PurhaseOrders/:id",
            {
                routeName: "PurchaseOrder",
                pathTitle: "Purchase Order",
                controller: "purchaseOrderController",
                templateUrl: "modules/PurchaseOrder/PurchaseOrder.html",
                controllerAs: "vm",
                resolve: resolve(["modules/PurchaseOrder/PurchaseOrder.controller"])
            })
            .when("/PurchaseOrders",
            {
                
                routeName: "PurchaseOrders",
                pathTitle: "Purchase Orders",
                controller: "purchaseOrdersController",
                templateUrl: "modules/PurchaseOrder/PurchaseOrders.html",
                controllerAs: "vm",
                resolve: resolve(["modules/PurchaseOrder/PurchaseOrders.controller"]) //Return a promise that loads the controller using requirejs
            })
            .when("/Vendors",
            {
                routeName: "Vendors",
                pathTitle: "Vendors",
                controller: "vendorsController",
                templateUrl: "modules/Vendor/Vendors.html",
                controllerAs: "vm",
                resolve: resolve(["modules/Vendor/Vendors.controller"
                ])
            })
            .when("/Vendors/:id",
            {
                pathTitle: "Vendor {{:id}}",
                controller: "Vendor",
                templateUrl: "modules/Vendor/Vendor.html",
                controllerAs: "vm",
                resolve: resolve(["modules/Vendor/Vendors.controller"])// note that this is the file name without the .js extension relative to the app folder
            })
            .otherwise(
            {
                redirectTo: "/PurchaseOrders"
            });
    }]);
})();
