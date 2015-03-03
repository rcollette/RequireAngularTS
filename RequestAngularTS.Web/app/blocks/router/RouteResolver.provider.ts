// the blocks namespace contains classes that are reusable across projects
// we use a typescript module because we want to be able to reference the type where it is injected
// as a parameter but we don't want to pollute the global namespace
// the global variable space with our type.
module block.router {
    export class RouteResolverProvider implements ng.IServiceProvider {
        // use the ecmascript arrow syntax to lexically bind `this` to the current class instance.
        public $get = (): RouteResolverProvider=> {
            return this;
        }

        public resolve = (modules: string[]): { [key: string]: any } => {
            // note the use of ecmascript 6 arrow syntax to lexically bind `this` at the point of definition.
            return { "routeResolverPromise": this._createDependency(modules) };
        }

        // modules is an array of requireJS modules to be loaded.
        private _createDependency(modules: string[]) {
            // return an instance of a function, which captures the modules parameter, that returns a promise
            /*@ngInject*/
            var dependency = function ($q: ng.IQService, $rootScope: ng.IRootScopeService) {
                var deferred = $q.defer();
                require(modules, function () {
                    // all dependencies have been resolved so resolve the promise.
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            };
            return dependency;
        }
    }

    // for this to be injected into a config() call, it must be a provider.
    // the suffix "Provider" is automatically appended to the provider Name.
    angular.module("block.router").provider("routeResolver", RouteResolverProvider);
}