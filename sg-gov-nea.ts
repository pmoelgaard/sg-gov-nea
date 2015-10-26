/// <reference path='typings/tsd.d.ts' />

import {Parser} from "xml2js";

export module sg.gov.nea {

    import EventEmitter = NodeJS.EventEmitter;

    export interface IAPIConfig {
        key:string;
        baseUrl:string;
    }

    export class APIConfig implements IAPIConfig {
        public key:string = '781CF461BB6606AD28A78E343E0E4176B76D27C9922DDDB4';
        public baseUrl:string = 'http://www.nea.gov.sg/api/WebAPI';
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

                if(err) {
                    context.emitter.emit(APIEvent.ERROR, err);
                    return;
                }

                switch (context.name) {
                    case DataSet.PSI_UPDATE:
                        result = result.channel.item[0].region;
                        break;
                    default:
                        // ignore for now
                        break;
                }

                context.emitter.emit(APIEvent.DATA, result);
            })

        }

        static PSI_UPDATE:string = 'psi_update'
    }

    export class DataSetTransport {

        constructor(private url:string) {
        }

        public fetch(callback:Function):void {

            var request = require('request');
            request(this.url, function (err:Error, response:any, body:string):void {

                var xml2js = require('xml2js');
                var parser:Parser = new xml2js.Parser();

                parser.parseString(body, function (err:Error, result:any):void {
                    callback(err, result);
                });
            })
        }

        static END:string = 'end';
        static DATA:string = 'data';
    }
}