export interface INavigationMenuItem {
    name: string;
    route: any;
}

export interface IMasterController {
}

export class MainController implements IMasterController {
    private $route: ng.route.IRouteService;

    constructor($route: ng.route.IRouteService) {
        this.$route = $route;
        angular.forEach(this.$route.routes,(route: any, key: any) => {
            // todo: build navigation menu from route configuration
        });
    }
}

angular.module("app").controller("mainController", MainController);