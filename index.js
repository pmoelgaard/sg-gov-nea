/// <reference path='typings/tsd.d.ts' />
/// <reference path='sg-gov-nea.ts' />
var api = require('../sg-gov-nea/sg-gov-nea.js');
var DataSet = api.sg.gov.nea.DataSet;
var APIConfig = api.sg.gov.nea.APIConfig;
var API = (function () {
    function API(config) {
        if (config === void 0) { config = new APIConfig(); }
        this.config = config;
    }
    API.prototype.connect = function (dataset) {
        var provider = new DataSet(dataset, this.config);
        return provider;
    };
    return API;
})();
module.exports = API;
//# sourceMappingURL=index.js.map