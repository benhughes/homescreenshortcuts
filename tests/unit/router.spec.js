define(['router'], function (router) {
    var routerFunctions;
    beforeEach(function () {
        routerFunctions = router.prototype;


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
        describe('main', function () {
            it('should call require with view.main and a function', function () {
                spyOn(window, 'require');
                routerFunctions.main();
                var requreFunction = window.require.argsForCall[0][1];
                var testFunc = jasmine.createSpy('testFunc');
                expect(window.require).toHaveBeenCalled();
                expect(window.require.argsForCall[0][0]).toEqual(['view.main']);
                expect(typeof window.require.argsForCall[0][1]).toEqual('function');
                requreFunction(testFunc);
                expect(testFunc).toHaveBeenCalled();
            })
        });
        describe('appView', function () {
            it('should call require with view.app and a function', function () {
                spyOn(window, 'require');
                routerFunctions.appView('test');
                var requreFunction = window.require.argsForCall[0][1];
                var testFunc = jasmine.createSpy('testFunc');
                expect(window.require).toHaveBeenCalled();
                expect(window.require.argsForCall[0][0]).toEqual(['view.app']);
                expect(typeof window.require.argsForCall[0][1]).toEqual('function');
                requreFunction(testFunc);
                expect(testFunc).toHaveBeenCalledWith({id:'test'});
            })
        });
        describe('customShortcutView', function () {
            it('should call require with view.app and a function', function () {
                spyOn(window, 'require');
                routerFunctions.customShortcutView();
                var requreFunction = window.require.argsForCall[0][1];
                var testFunc = jasmine.createSpy('testFunc');
                expect(window.require).toHaveBeenCalled();
                expect(window.require.argsForCall[0][0]).toEqual(['view.custom.shortcut']);
                expect(typeof window.require.argsForCall[0][1]).toEqual('function');
                requreFunction(testFunc);
                expect(testFunc).toHaveBeenCalled();
            })
        });

    });

});
