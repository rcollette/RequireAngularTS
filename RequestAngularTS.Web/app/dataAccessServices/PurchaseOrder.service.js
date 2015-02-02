define(["require", "exports"], function (require, exports) {
    /// <reference path="../../typings/tsd.d.ts" />
    var PurchaseOrderService = (function () {
        function PurchaseOrderService($resource, $location) {
            this.$resource = $resource;
            this.$location = $location;
            // todo: The service base would be set from a global configuration/service/singleton normally.
            this._serviceBase = "";
            var serviceTemplate = this._serviceBase + "PurchaseOrders/:purchaseOrderId";
            this._purchaseOrdersResource = this.$resource(serviceTemplate, { purchaseOrderId: "@id" });
        }
        PurchaseOrderService.$inject = ["$resource", "$location"];
        PurchaseOrderService.prototype.fetchAll = function (count, pageNumber) {
            return this._purchaseOrdersResource.query({ count: count, pageNumber: pageNumber });
        };
        PurchaseOrderService.prototype.fetch = function (id) {
            return this._purchaseOrdersResource.get({ id: id });
        };
        PurchaseOrderService.prototype.save = function (purchaseOrder) {
            return this._purchaseOrdersResource.save(purchaseOrder);
        };
        return PurchaseOrderService;
    })();
    exports.PurchaseOrderService = PurchaseOrderService;
    angular.module("app").service("purchaseOrderService", PurchaseOrderService);
});

//# sourceMappingURL=../dataAccessServices/PurchaseOrder.service.js.map