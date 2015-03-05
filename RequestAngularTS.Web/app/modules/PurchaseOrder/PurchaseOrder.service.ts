export interface IPurchaseOrderPageable extends IPageable<IPurchaseOrder> {
}

export class PurchaseOrdersService {
    private _serviceBase: string;
    private _purchaseOrdersResource: any;

    constructor(private $resource: ng.resource.IResourceService, private $location: ng.ILocationService) {
        // todo: The service base would be set from a global configuration/service/singleton normally.
        this._serviceBase = "http://private-a994d-testapi780.apiary-mock.com/";
        var serviceTemplate: string = this._serviceBase + "PurchaseOrders/:purchaseOrderId";
        // @id property mapping is from POSTED data only!
        this._purchaseOrdersResource = this.$resource<any>(serviceTemplate, { purchaseOrderId: "@id" });
    }

    public fetchAll(count?: number, pageNumber?: number): IPurchaseOrderPageable {
        // we're doing get instead of query because we are returning the total page count in addition to the records
        // so the response is considered a single object.
        return this._purchaseOrdersResource.get({ count, pageNumber });
    }

    public fetch(id: number): ng.IPromise<IPurchaseOrder> {
        return this._purchaseOrdersResource.get({ "purchaseOrderId": id }).then(function (data: any) {
            data.dateCreated = new Date(data.dateCreated);
            return <ng.IPromise<IPurchaseOrder>>data;
        });
    }
}
angular.module("app").service("purchaseOrderService", PurchaseOrdersService); 