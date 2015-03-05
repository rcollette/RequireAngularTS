export class HtmlTemplateDirective implements ng.IDirective {
    public restrict: string = "A";
    public transclude: boolean = true;
    public scope = { value: "@", cssclass: "@" };
    public link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
    }
    public templateUrl: string = "directives/HtmlTemplate/HtmlTemplate.directive.template.html";
    public controllerAs: string = "vm";
}

angular.module("app").directive("htmltemplatedirective",() => { return new HtmlTemplateDirective(); });
