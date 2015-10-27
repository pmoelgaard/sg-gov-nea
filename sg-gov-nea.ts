/// <reference path='typings/tsd.d.ts' />

import _ = require('lodash');

export module sg.gov.nea {

    import EventEmitter = NodeJS.EventEmitter;

    export interface IAPIConfig {
        key?:string;
        baseUrl?:string;
    }

    export class APIConfig implements IAPIConfig {

        public key:string;
        public baseUrl:string;

        constructor(config:IAPIConfig) {
            _.extend(this, config);
        }

        static defaults:IAPIConfig = {
            key: '[insert_your_own_API_key]',
            baseUrl: 'http://www.nea.gov.sg/api/WebAPI'
        }
    }

    export class APIEvent {
        static DATA:string = 'data';
        static ERROR:string = 'error';
    }

    export interface IDataSet {
        name:string;
        on(event:string, callback:Function) : void;
    }

    export class DataSet implements IDataSet {

        private emitter:EventEmitter;

        constructor(public name:string, private config:IAPIConfig) {

            this.config = _.extend({}, APIConfig.defaults, config);

            var events = require('events');
            this.emitter = new events.EventEmitter();
            this.refresh();
        }

        public on(event:string, callback:Function):void {
            this.emitter.addListener(event, callback);
        }

        public off(event:string, callback:Function):void {
            this.emitter.removeListener(event, callback);
        }

        private refresh():void {
            var context:DataSet = this;

            var transport:DataSetTransport = new DataSetTransport(this.config.baseUrl + '?dataset=' + this.name + '&keyref=' + this.config.key);
            transport.fetch(function (err:Error, result:any):void {

                if (err) {
                    context.emitter.emit(APIEvent.ERROR, err);
                    return;
                }

                switch (context.name) {

                    case DataSet.PSI_UPDATE:
                        result = _.map(result.channel.item.region, function(region:any) : any {
                            var result:any = {
                                region: region.id,
                                latitude: parseFloat(region.latitude),
                                longitude: parseFloat(region.longitude),
                                timestamp: parseInt(region.record.timestamp),
                                readings: {}
                            };
                            _.each(region.record.reading, function(reading:any) : any {
                                _.set(result.readings, reading.type.toLowerCase(), parseFloat(reading.value));
                            })
                            return result;
                        })
                        break;

                    case DataSet.NOWCAST:
                        result = {
                            datentime: result.channel.item.issue_datentime,
                            forecasts: _.map(result.channel.item.weatherForecast.area, function(forecast:any) : any {
                                var result:any = {
                                    name: _.get(forecast, 'name'),
                                    forecast: _.trim(_.get(forecast, 'forecast').toString()),
                                    icon: _.get(forecast, 'icon'),
                                    zone: _.get(forecast, 'zone'),
                                    latitude: parseFloat(_.get(forecast, 'lat').toString()),
                                    longitude: parseFloat(_.get(forecast, 'lon').toString()),
                                };
                                return result;
                            })
                        }
                        break;

                    default:
                        // ignore for now
                        break;
                }

                context.emitter.emit(APIEvent.DATA, result);
            })

        }

        static PSI_UPDATE:string = 'psi_update';
        static NOWCAST:string = 'nowcast';
    }

    export class DataSetTransport {

        constructor(private url:string) {
        }

        public fetch(callback:Function):void {

            var request = require('request');
            request(this.url, function (err:Error, response:any, body:string):void {

                if (err) {
                    return callback(err);
                }

                var parser = require('xml2json');
                var result = parser.toJson(body);
                result = JSON.parse(result);

                callback(null, result);
            })
        }

        static END:string = 'end';
        static DATA:string = 'data';
    }
}