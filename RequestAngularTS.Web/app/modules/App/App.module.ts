﻿// import appPurchaseOrder = require("modules/PurchaseOrder/PurchaseOrder.module");
// appPurchaseOrder;//If you don"t use anything from the imported module, typescript will not generate the needed requires statement.

// it seems the app module must be exported so that the properties we are using to capture do not "go away"
var app: any = angular.module("app", [
    "app.core",
    "app.purchaseOrder"]);

// for some reason, we need to hold onto an instance of the injector associated
// with this module.
export var injector: ng.auto.IInjectorService;

app.config(function (
    $routeProvider: ng.route.IRouteProvider,
    $controllerProvider: ng.IControllerProvider,
    $provide: ng.auto.IProvideService,
    $compileProvider: ng.ICompileProvider) {
    // keep global reference to providers so that we can implement dynamic loading of controllers.
    // see: http://ify.io/lazy-loading-in-angularjs/
    // see: http://www.bennadel.com/blog/2553-Loading-AngularJS-Components-After-Your-Application-Has-Been-Bootstrapped.htm

    app.controller = (name: string, controllerConstructor?: Function): ng.IModule=> {
        $controllerProvider.register(name, controllerConstructor);
        return (app);
    };

    app.service = (name: string, serviceConstructor?: Function): ng.IModule => {
        $provide.service(name, serviceConstructor);
        return (app);
    };

    app.factory = (name: string, serviceFactoryFunction?: Function): ng.IModule => {
        $provide.factory(name, serviceFactoryFunction);
        return (app);
    };

    app.value = (name: string, value?: any): ng.IModule => {
        $provide.value(name, value);
        return (app);
    };

    app.directive = (name: string, directiveFactory?: Function): ng.IModule => {
        $compileProvider.directive(name, directiveFactory);
        return (app);
    };

    // don't include binding CSS classes for performance.  Set to true to use Protractor.
    $compileProvider.debugInfoEnabled(false);
}).run(($injector: ng.auto.IInjectorService) => {
    injector = $injector;
});  