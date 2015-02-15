export class AppController {
    public menuRoutes: IRouteDefinition[] = [];

    constructor(private $route: ng.route.IRouteService) {
        angular.forEach(this.$route.routes,(route: IRouteDefinition, key: any) => {
            if (route.menuOrder) {
                this.menuRoutes.push(route);
            }
        });
    }
}

angular.module("app").controller("AppController", AppController);