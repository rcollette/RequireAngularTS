export class PurchaseOrderController {
    public somePublicProperty: string;

    constructor($scope: any) {
        this.somePublicProperty = "googlex";
    }
}
angular.module("app.PurchaseOrder").controller('PurchaseOrder', PurchaseOrderController);