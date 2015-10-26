/// <reference path='typings/tsd.d.ts' />
var _ = require('lodash');
var sg;
(function (sg) {
    var gov;
    (function (gov) {
        var nea;
        (function (nea) {
            var APIConfig = (function () {
                function APIConfig(config) {
                    _.extend(this, config);
                }
                APIConfig.defaults = {
                    key: '[insert_your_own_API_key]',
                    baseUrl: 'http://www.nea.gov.sg/api/WebAPI'
                };
                return APIConfig;
            })();
            nea.APIConfig = APIConfig;
            var APIEvent = (function () {
                function APIEvent() {
                }
                APIEvent.DATA = 'data';
                APIEvent.ERROR = 'error';
                return APIEvent;
            })();
            nea.APIEvent = APIEvent;
            var DataSet = (function () {
                function DataSet(name, config) {
                    this.name = name;
                    this.config = config;
                    this.config = _.extend({}, APIConfig.defaults, config);
                    var events = require('events');
                    this.emitter = new events.EventEmitter();
                    this.refresh();
                }
                DataSet.prototype.on = function (event, callback) {
                    this.emitter.addListener(event, callback);
                };
                DataSet.prototype.off = function (event, callback) {
                    this.emitter.removeListener(event, callback);
                };
                DataSet.prototype.refresh = function () {
                    var context = this;
                    var transport = new DataSetTransport(this.config.baseUrl + '?dataset=' + this.name + '&keyref=' + this.config.key);
                    transport.fetch(function (err, result) {
                        if (err) {
                            context.emitter.emit(APIEvent.ERROR, err);
                            return;
                        }
                        switch (context.name) {
                            case DataSet.PSI_UPDATE:
                                result = _.map(result.channel.item.region, function (region) {
                                    var result = {
                                        region: region.id,
                                        latitude: parseFloat(region.latitude),
                                        longitude: parseFloat(region.longitude),
                                        timestamp: parseInt(region.record.timestamp),
                                        readings: {}
                                    };
                                    _.each(region.record.reading, function (reading) {
                                        _.set(result.readings, reading.type, parseFloat(reading.value));
                                    });
                                    return result;
                                });
                                break;
                            default:
                                // ignore for now
                                break;
                        }
                        context.emitter.emit(APIEvent.DATA, result);
                    });
                };
                DataSet.PSI_UPDATE = 'psi_update';
                return DataSet;
            })();
            nea.DataSet = DataSet;
            var DataSetTransport = (function () {
                function DataSetTransport(url) {
                    this.url = url;
                }
                DataSetTransport.prototype.fetch = function (callback) {
                    var request = require('request');
                    request(this.url, function (err, response, body) {
                        if (err) {
                            return callback(err);
                        }
                        var parser = require('xml2json');
                        var result = parser.toJson(body);
                        result = JSON.parse(result);
                        callback(null, result);
                    });
                };
                DataSetTransport.END = 'end';
                DataSetTransport.DATA = 'data';
                return DataSetTransport;
            })();
            nea.DataSetTransport = DataSetTransport;
        })(nea = gov.nea || (gov.nea = {}));
    })(gov = sg.gov || (sg.gov = {}));
})(sg = exports.sg || (exports.sg = {}));
//# sourceMappingURL=sg-gov-nea.js.map