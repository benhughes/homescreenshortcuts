require.config({
    map: {
        'view.app': {
            "collection.apps": 'collection.apps.mock',
            "model.app": 'model.apps.mock',
            "utils": "mock.utils",
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
var mockUtils = {
    navigateTo: jasmine.createSpy('navigateTo')
};


define('collection.apps.mock', function () {
    return collectionAppsMock;
});
define('model.apps.mock', function () {
    return modelAppsMock;
});
define('mock.utils', function () {
    return mockUtils;
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
            beforeEach(function () {
                viewAppFuncs.appModel = {
                    toJSON: jasmine.createSpy('toJSON')
                };
                viewAppFuncs.templates = {
                    singleAppTemplate: jasmine.createSpy('singleAppTemplate')
                };
                viewAppFuncs.cache = {
                    singleAppTemplate: ''
                };
                viewAppFuncs.el = {};
                viewAppFuncs.$mainContainer = {
                    html: jasmine.createSpy('html')
                };

            });
            it('should call appModel.toJSON() and pass it to the template', function () {
                var testObj = {
                    'test': 'testing'
                }
                viewAppFuncs.appModel.toJSON.andReturn(testObj);

                viewAppFuncs.render();

                expect(viewAppFuncs.appModel.toJSON).toHaveBeenCalled();
                expect(viewAppFuncs.templates.singleAppTemplate).toHaveBeenCalledWith(testObj);

            });
            it('should set the inner html of el with the return of the template function and set the cache with the same value', function () {
                var testHTML = 'this is a test html';
                viewAppFuncs.templates.singleAppTemplate.andReturn(testHTML);

                viewAppFuncs.render();

                expect(viewAppFuncs.el.innerHTML).toEqual(testHTML);
                expect(viewAppFuncs.cache.singleAppTemplate).toEqual(testHTML);
            });
            it('should set the html of the main container', function () {
                var testHTML = 'this is a test html';
                viewAppFuncs.templates.singleAppTemplate.andReturn(testHTML);

                viewAppFuncs.render();

                expect(viewAppFuncs.$mainContainer.html).toHaveBeenCalledWith(viewAppFuncs.el);
            });
            it('should not call $mainContainer.html if the template returns the same as the cache', function () {
                var testHTML = 'this is a test html';
                viewAppFuncs.cache.singleAppTemplate = testHTML;
                viewAppFuncs.templates.singleAppTemplate.andReturn(testHTML);

                viewAppFuncs.render();

                expect(viewAppFuncs.$mainContainer.html).not.toHaveBeenCalled();
            });
        });
        describe('handleAppLinkCLick', function () {
            var fakeEvent, mock$Data;
            beforeEach(function () {
                fakeEvent = {
                    target: document.createElement('div'),
                    preventDefault: jasmine.createSpy('preventDefault')
                };
                mock$Data = jasmine.createSpy('mock$Data');
                $ = jasmine.createSpy('$').andReturn({data: mock$Data});
                spyOn(viewAppFuncs, 'prepareShortcutData');
                viewAppFuncs.templates.shortcutTemplate = jasmine.createSpy('shortcutTemplate');
            })
            it('should generate the html and change the URL to that html', function () {
                var fakeHtmlData = {
                    "someData": "data"
                };
                viewAppFuncs.templates.shortcutTemplate.andReturn('some html');
                mock$Data.andReturn(fakeHtmlData);
                viewAppFuncs.handleAppLinkCLick(fakeEvent);

                expect($).toHaveBeenCalledWith(fakeEvent.target);
                expect(mock$Data).toHaveBeenCalled();
                expect(fakeEvent.preventDefault).toHaveBeenCalled();
                expect(viewAppFuncs.prepareShortcutData).toHaveBeenCalledWith(fakeHtmlData);
                expect(mockUtils.navigateTo).toHaveBeenCalledWith("data:text/html;charset=UTF-8," + "some html");


            })
        })


    });
});