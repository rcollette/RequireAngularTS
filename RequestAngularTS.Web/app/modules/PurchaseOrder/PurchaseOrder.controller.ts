import poService = require("modules/PurchaseOrder/PurchaseOrder.service");
poService;
// we must declare the custom properties of $routeParams
interface IPurchaseOrderRouteParams extends ng.route.IRouteParamsService {
    id: number;
}

class PurchaseOrderController implements IFeatureController {
    public title: string = "Purchase Order";
    public purchaseOrder: poService.IPurchaseOrder;

    constructor($scope: any, purchaseOrderService: poService.PurchaseOrdersService, $routeParams: IPurchaseOrderRouteParams) {
        if (isNaN($routeParams.id)) {
            throw "The id parameter is not a number";
        }
        var id: number = <number>$routeParams.id;
        if (id < 1) {
            throw "The id parameter must be greater than zero.";
        }
        this.purchaseOrder = purchaseOrderService.fetch(id);
    }
}

angular.module("app").controller("PurchaseOrderController", PurchaseOrderController);