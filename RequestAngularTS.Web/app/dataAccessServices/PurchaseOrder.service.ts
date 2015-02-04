/// <reference path="../../typings/tsd.d.ts" />
export interface IPurchaseOrderDto {
    id: number;
}

export class PurchaseOrderService {
    private _serviceBase: string;
    private _purchaseOrdersResource: ng.resource.IResourceClass<IPurchaseOrderDto>;

    constructor(private $resource: ng.resource.IResourceService, private $location: ng.ILocationService) {
        // todo: The service base would be set from a global configuration/service/singleton normally.
        this._serviceBase = "http://private-a994d-testapi780.apiary-mock.com/";
        var serviceTemplate: string = this._serviceBase + "PurchaseOrders/:purchaseOrderId";
        this._purchaseOrdersResource = this.$resource<IPurchaseOrderDto>(serviceTemplate, { purchaseOrderId: "@id" });
    }

    public fetchAll(count?: number, pageNumber?: number): ng.resource.IResourceArray<IPurchaseOrderDto> {
        return this._purchaseOrdersResource.query({ count, pageNumber });
    }

    public fetch(id: number): IPurchaseOrderDto {
        return this._purchaseOrdersResource.get({ id: id });
    }

    public save(purchaseOrder: IPurchaseOrderDto) {
        return this._purchaseOrdersResource.save(purchaseOrder);
    }
}
angular.module("app").service("purchaseOrderService", PurchaseOrderService);