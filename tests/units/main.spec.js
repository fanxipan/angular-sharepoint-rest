describe("SharePoint Rest", function () {
    var $injector, fxSharePointRest;

    beforeEach(module("fx-sharepoint-restful"));
    beforeEach(inject(function (_$injector_) {
        $injector = _$injector_;
        fxSharePointRest = $injector.get("fxSharePointRest");
    }));

    it("should inject the service", function () {
        expect(fxSharePointRest).toBeDefined();
        expect(fxSharePointRest.createList).toBeDefined();
    });
});