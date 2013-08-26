define(['utils'], function (utils) {

    describe('utils', function () {
        it('should be exist', function () {
            expect(typeof utils).not.toEqual('undefined');
        });
        describe('isURI', function () {
            it('should return true if passed param contains ://', function () {
                expect(utils.isURI('test://test')).toEqual(true);
            });
            it('should return false if passed param does not contain :// or they are non strings', function () {
                expect(utils.isURI('test:/test')).toEqual(false);
                expect(utils.isURI('test//test')).toEqual(false);
                expect(utils.isURI('testtest')).toEqual(false);
                expect(utils.isURI('')).toEqual(false);
                expect(utils.isURI()).toEqual(false);
                expect(utils.isURI(345)).toEqual(false);
                expect(utils.isURI({})).toEqual(false);
            });
        });
        describe('convertParamsToObject', function () {
            it('should return an object that matches the params string that is passed', function () {
                expect(utils.convertParamsToObject('test=test')).toEqual({test:'test'});
                expect(utils.convertParamsToObject('test=test&test2=this')).toEqual({test:'test',test2:'this'});
                expect(utils.convertParamsToObject('test=test&test2=this&test5=blah')).toEqual({test:'test',test2:'this',test5:'blah'});
            });
            it('should handle unexpected and unfitting params', function () {
                expect(utils.convertParamsToObject('testtest')).toEqual({});
                expect(utils.convertParamsToObject('test=testtest2=this')).toEqual({test:'testtest2=this'});
                expect(utils.convertParamsToObject('test&test&test2')).toEqual({});
                expect(utils.convertParamsToObject('test=test1&test=test2')).toEqual({test:'test2'});
            });
            it('should handle non strings', function () {
                expect(utils.convertParamsToObject(234)).toEqual({});
                expect(utils.convertParamsToObject({})).toEqual({});
                expect(utils.convertParamsToObject(function () {})).toEqual({});
                expect(utils.convertParamsToObject([])).toEqual({});
            });
            it('should handle encoded uri\'s', function () {
                expect(utils.convertParamsToObject("action=comgooglemaps://?saddress=&amp;daddr=6%20Melgund%20Road%2C%20N5%201PT&amp;directionsmode=transit")).toEqual({action: "comgooglemaps://?saddress=&amp;daddr=6%20Melgund%20Road%2C%20N5%201PT&amp;directionsmode=transit"});
                expect(utils.convertParamsToObject("action=comgooglemaps://?saddress=&amp;daddr=6%2520Melgund%2520Road&test=test")).toEqual({action: "comgooglemaps://?saddress=&amp;daddr=6%2520Melgund%2520Road", test:"test"});
            });

        });
    });


});
