'use strict';
define(["require", "exports"], function (require, exports) {
    var PurchaseOrderController = (function () {
        /*@ngInject*/
        function PurchaseOrderController($scope) {
            this.somePublicProperty = "googlex";
        }
        PurchaseOrderController.$inject = ["$scope"];
        return PurchaseOrderController;
    })();
    exports.PurchaseOrderController = PurchaseOrderController;
});

//# sourceMappingURL=../../modules/PurchaseOrder/PurchaseOrder.controller.js.map