"use strict";

// define properties of scope not currently defined by  definitely typed.
interface IRepeatableScope extends ng.IScope {
    $index: number;
    $first: boolean;
    $middle: boolean;
    $last: boolean;
    $even: boolean;
    $odd: boolean;
}

export class ModelValidatorDirective implements ng.IDirective {
    // ex. data-model-validator="a model property that contains a message or a model function that returns a message"
    public static directiveName: string = "modelValidator";
    // require that the current element have a model binding and
    // that there is a parent data-model-state-configuration attribute
    public require: string[] = ["ngModel"];
    // restrict instantiation of this directive to an attribute only
    public restrict: string = "A";
    // refine a local or "isolate" scope so that each directive instance has its own values.
    // otherwise, the value specified in the attribute would go into the parent scope.
    public transclude: boolean = false;
    public scope = { bindingExpression: ModelValidatorDirective.directiveName };
    // this function is called for each instance of the directive and therefore
    // the variables declared therein will be unique to each directive instance.
    public link = (scope: IRepeatableScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controllers: any[]) => {
        // the value of data-model-state is a binding expression to the model state property upon which this
        // validation message will be dependent.   This assumes that the ASP.NET WebApi ModelState has been returned to the
        // client and stored in a manner that may be referenced by a binding expression.
        var bindingExpression: string = scope[ModelValidatorDirective.directiveName];
        // do nothing if there is no binding expression.
        if (!bindingExpression || bindingExpression.trim() === "") {
            return;
        }
        // in ngRepeat contexts, we can use "$index" in the binding expression to refer to a particular item
        // in a collection
        if (scope.$index != null) {
            bindingExpression = bindingExpression.replace("$index", scope.$index.toString());
        }
        // because we have not used an isolate scope (i.e. declaring a scope property in this class.)
        // we can evaluate the watch expression within the context of the current scope.  Otherwise, we
        // would have had to call scope.$parent.$watch
        scope.$watch(
            bindingExpression,
            (newVal: any, oldVal: any, scope: ng.IScope): any => {
                // the ngModel controller allows us to set the validity of the form input.
                var ngModel: ng.INgModelController = <ng.INgModelController>controllers[0];
                ngModel.$validate();
            }
            );
    };
}

// declare the factory for the directive.
angular.module("app").directive(ModelValidatorDirective.directiveName,() => { return new ModelValidatorDirective(); });