'use strict';
export class PurchaseOrderController {
    public somePublicProperty: string;

    /*@ngInject*/
    constructor($scope: any) {
        this.somePublicProperty = "googlex";
    }
} 