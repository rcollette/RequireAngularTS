export interface IPurchaseOrderDto {
    id: number;
    dateCreated: Date;
    description: string;
}

export interface IPurchaseOrderDtoPageable extends IPageable<IPurchaseOrderDto> {
}

export class PurchaseOrdersService {
    private _serviceBase: string;
    private _purchaseOrdersResource: ng.resource.IResourceClass<IPurchaseOrderDtoPageable>;

    constructor(private $resource: ng.resource.IResourceService, private $location: ng.ILocationService) {
        // todo: The service base would be set from a global configuration/service/singleton normally.
        this._serviceBase = "http://private-a994d-testapi780.apiary-mock.com/";
        var serviceTemplate: string = this._serviceBase + "PurchaseOrders/:purchaseOrderId";
        this._purchaseOrdersResource = this.$resource<IPurchaseOrderDtoPageable>(serviceTemplate, { purchaseOrderId: "@id" });
    }

    public fetchAll(count?: number, pageNumber?: number): IPurchaseOrderDtoPageable {
        //We're doing get instead of query because we are returning the total page count in addition to the records
        //so the response is considered a single object.
        return this._purchaseOrdersResource.get({ count, pageNumber });
    }
}
angular.module("app").service("purchaseOrderService", PurchaseOrdersService);