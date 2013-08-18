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
                expect(utils.isURI('')).toEqual(false);
                expect(utils.isURI()).toEqual(false);
                expect(utils.isURI(345)).toEqual(false);
                expect(utils.isURI({})).toEqual(false);
                expect(utils.isURI({})).toEqual(false);
            });
        })
    });

});
