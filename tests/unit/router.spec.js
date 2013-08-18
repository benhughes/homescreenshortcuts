define('log', function () {
    return jasmine.createSpy('log');
});
define(['router'], function (router) {
    beforeEach(function () {


    });

    describe('router', function () {
        it('should be exist', function () {
            expect(typeof router).not.toEqual('undefined');
        });
        describe('initialize', function () {
            it('should call log and Backbone.history.start', function () {
                spyOn(Backbone.history, 'start');
                router.prototype.initialize();
                expect(Backbone.history.start).toHaveBeenCalled();
            })
        })

    });

});
