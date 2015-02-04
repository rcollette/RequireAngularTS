export interface INavigationMenuItem {
    name: string;
    route: any;
}

export interface IMasterController {
    toggleMainMenu(): void;
}

export class MainController implements IMasterController {
    private $route: ng.route.IRouteService;

    constructor($route: ng.route.IRouteService) {
        this.$route = $route;
        angular.forEach(this.$route.routes,(route, key) => {
        });
    }

    public toggleMainMenu() {
    }
}

angular.module("app").controller("mainController", MainController);