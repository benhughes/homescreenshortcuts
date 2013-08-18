define(['model.app'], function (modelApp) {
    var modelAppFunctions;
    beforeEach(function () {
        modelAppFunctions = modelApp.prototype;
    });
    describe('model.app', function () {
        describe('url', function () {
           it('should build URL', function () {
               modelAppFunctions.id = 3;
               var returned = modelAppFunctions.url();
               expect(returned).toEqual('data/apps/3/3.json');
               modelAppFunctions.id = 'blah';
               var returned = modelAppFunctions.url();
               expect(returned).toEqual('data/apps/blah/blah.json');
           });
        });
    });

});