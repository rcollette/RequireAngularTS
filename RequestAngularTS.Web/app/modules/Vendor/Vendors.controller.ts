export class VendorsController implements IFeatureController {
    public title: string = "Vendors";

    constructor($scope: any) {
    }
}
angular.module("app").controller("vendorsController", VendorsController); 