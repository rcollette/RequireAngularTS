///<amd-dependency path="blockValidationModule"/>
export module block.validation {
    var ngModule: ng.IModule = angular.module("block.validation");

    // define properties of scope not currently defined by  definitely typed.
    interface IRepeatableScope extends ng.IScope {
        $index: number;
        $first: boolean;
        $middle: boolean;
        $last: boolean;
        $even: boolean;
        $odd: boolean;
    }

    class ServerErrorDirective implements ng.IDirective {
        //data-model-state attribute
        public static directiveName: string = 'serverError';
        //Require that the current element have a model binding and
        //that there is a parent data-model-state-configuration attribute
        public require: string[] = ['ngModel'];
        //Restrict instantiation of this directive to an attribute only
        public restrict: string = 'A';
        public transclude: boolean = false;
        //Define a local or 'isolate' scope so that each directive instance has its own values.
        //otherwise, the value specified in the attribute would go into the parent scope.

        //This function is called for each instance of the directive and therefore
        //the variables declared therein will be unique to each directive instance.
        public link = (scope: IRepeatableScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controllers: any[]) => {
            //the value of data-model-state is a binding expression to the model state property upon which this
            //validation message will be dependent.   This assumes that the ASP.NET WebApi ModelState has been returned to the
            //client and stored in a manner that may be referenced by a binding expression.
            var modelStateBindingExpression: string = (<any>attrs)[ServerErrorDirective.directiveName];
            //Do nothing if there is no binding expression.
            if (!modelStateBindingExpression || modelStateBindingExpression.trim() === "") return;
            //In ngRepeat contexts, we can use "$index" in the binding expression to refer to a particular item
            //in a collection
            if (scope.$index != null) {
                modelStateBindingExpression = modelStateBindingExpression.replace('$index', scope.$index.toString());
            }
            //Variables declared here are captured and will be available in the $watch function;
            var _messageTemplate: ng.IAugmentedJQuery = null;

            //Because we have not used an isolate scope (i.e. declaring a scope property in this class.)
            //we can evaluate the watch expression within the context of the current scope.  Otherwise, we
            //would have had to call scope.$parent.$watch
            scope.$watch(
                modelStateBindingExpression,
                (newVal, oldVal) => {
                    //The ngModel controller allows us to set the validity of the form input.
                    var modelController: ng.INgModelController = <ng.INgModelController>controllers[0];
                    if (newVal != null) {
                        modelController.$setValidity('server', false);
                        modelController.$error.server = newVal[0];
                    } else {
                        //The bound model state key does not exist.  Set the field validity to valid
                        modelController.$setValidity('server', true);
                        //Clear the error message
                        modelController.$error.server = null;
                    }
                });
        }
    }

    //Declare the factory for the directive.
    ngModule.directive(ServerErrorDirective.directiveName,() => { return new ServerErrorDirective() });
}