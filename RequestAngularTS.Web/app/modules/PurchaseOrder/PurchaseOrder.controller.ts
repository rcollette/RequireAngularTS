import poService = require("../../dataAccessServices/PurchaseOrder.service");
poService;
class PurchaseOrderController implements IFeatureController {
    public title: string = "Purchase Order";
    public purchaseOrder: poService.IPurchaseOrderDto;
    private purchaseOrderService: poService.PurchaseOrdersService;

    constructor($scope: any, purchaseOrderService: poService.PurchaseOrdersService) {
        this.purchaseOrder = purchaseOrderService.fetch(1);
    }
}
angular.module("app").controller("purchaseOrderController", PurchaseOrderController);