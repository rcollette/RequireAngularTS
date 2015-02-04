import poService = require("../../dataAccessServices/PurchaseOrder.service");
poService;
class PurchaseOrdersController implements IFeatureController {
    public title: string = "Purchase Orders";
    public purchaseOrders: IPageable<poService.IPurchaseOrderDto>;
    private purchaseOrderService: poService.PurchaseOrdersService;

    constructor($scope: any, purchaseOrderService: poService.PurchaseOrdersService) {
        //purchaseOrderService = <poService.PurchaseOrderService> appModule.app.injector.get("purchaseOrderService");
        //purchaseOrderService = <poService.PurchaseOrderService> angular.injector().get("purchaseOrderService");
        this.purchaseOrders = purchaseOrderService.fetchAll(10, 1);
    }
}
angular.module("app").controller("purchaseOrdersController", PurchaseOrdersController);