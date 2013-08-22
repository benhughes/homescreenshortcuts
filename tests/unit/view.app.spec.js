require.config({
    map: {
        'view.app': {
            "collection.apps": 'collection.apps.mock',
            "model.app": 'model.apps.mock',
            "text!/templates/appview.main.html": 'text.mock',
            "text!/templates/single.app.html": 'text.mock',
            "text!/templates/shortcut.html": 'text.mock'
        }
    }
});

var collectionAppsMock = jasmine.createSpy('collection.apps.mock').andReturn({
    fetch: jasmine.createSpy('fetch'),
    change: jasmine.createSpy('on')
});
var modelAppsMockReturn = {fetch: jasmine.createSpy('fetch')};
var modelAppsMock = jasmine.createSpy('view.apps.mock').andReturn(modelAppsMockReturn);

define('collection.apps.mock', function () {
    return collectionAppsMock;
});
define('model.apps.mock', function () {
    return modelAppsMock;
});
define('text.mock', function () {
    return jasmine.createSpy('text.mock');
});

var $ = function () {};

define(['view.app'], function (viewApp) {
    var viewAppFuncs;

    describe('view.app', function () {
        beforeEach(function () {
            viewAppFuncs = viewApp.prototype;
        });
        it('exists', function () {
            expect(typeof viewApp).not.toBe(undefined)
        });
        it('should set up parameters', function () {
            var expectedEvents =  {
                'click #singleAppContainer ul.shortCuts a.createShortcut': 'handleAppLinkCLick',
                'change #singleAppContainer ul.optionsList input': 'handleOptionChange'
            };
            expect(viewAppFuncs.logPrefix).toEqual('views.app');
            expect(viewAppFuncs.className).toEqual('main');
            expect(viewAppFuncs.appModel).toEqual(null);
            expect(viewAppFuncs.$mainContainer).toEqual(null);
            expect(viewAppFuncs.collectionApps).toEqual(null);
            expect(viewAppFuncs.events).toEqual(expectedEvents);
        });
        describe('initialize', function () {
            var classFunc;
            beforeEach(function () {
                spyOn(viewAppFuncs, 'setUpTemplates');
                spyOn(viewAppFuncs, 'bindEvents');
                spyOn(viewAppFuncs, 'render');
                window.$ = jasmine.createSpy('$');
                classFunc = {
                    addClass: jasmine.createSpy('addClass')
                };
                window.$.andReturn(classFunc);
            });
            it('should set the current attributes and call following functions', function () {
                viewAppFuncs.id = 'test';
                viewAppFuncs.initialize();
                expect(window.$).toHaveBeenCalledWith('#mainContainer');
                expect(classFunc.addClass).toHaveBeenCalledWith('loading');
                expect(modelAppsMock).toHaveBeenCalledWith({id:'test'});
                expect(viewAppFuncs.collectionApps).toEqual(collectionAppsMock);
                expect(viewAppFuncs.setUpTemplates).toHaveBeenCalled();
                expect(viewAppFuncs.bindEvents).toHaveBeenCalled();
                expect(modelAppsMockReturn.fetch).toHaveBeenCalled();
                expect(viewAppFuncs.render).toHaveBeenCalled();
            });
        });
        describe('setUpTemplates', function () {
            beforeEach(function () {
                window.Handlebars = {
                    compile: jasmine.createSpy('compile')
                };
            });
            it('should call Handlebars.compile for each template the app needs', function () {
                window.Handlebars.compile.andReturn('test');
                viewAppFuncs.setUpTemplates();
                expect(window.Handlebars.compile.callCount).toEqual(2);
                expect(window.Handlebars.compile.argsForCall[0][0]).toEqual('test');
                expect(window.Handlebars.compile.argsForCall[1][0]).toEqual('test');
                expect(viewAppFuncs.templates.singleAppTemplate).toEqual('test');
                expect(viewAppFuncs.templates.shortcutTemplate).toEqual('test');
                expect(viewAppFuncs.cache.singleAppTemplate).toEqual('');
                expect(viewAppFuncs.cache.shortcutTemplate).toEqual('');

            });
        });
        describe('bindEvents', function () {
           it('should call .on of appModel with change and a proxy function', function () {
               viewAppFuncs.appModel = {
                   on: jasmine.createSpy('on')
               };
               $ = {
                   proxy: jasmine.createSpy('proxy').andReturn('thisIsATest')
               }
               viewAppFuncs.bindEvents();
               expect(viewAppFuncs.appModel.on).toHaveBeenCalledWith('change', $.proxy());

           });

        });
        describe('render', function () {

        })


    });
});