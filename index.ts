/// <reference path='typings/tsd.d.ts' />
/// <reference path='sg-gov-nea.ts' />

import api = require('../sg-gov-nea/sg-gov-nea.js');

import IAPIConfig = api.sg.gov.nea.IAPIConfig;
import IDataSet = api.sg.gov.nea.IDataSet;
import DataSet = api.sg.gov.nea.DataSet;
import APIConfig = api.sg.gov.nea.APIConfig;

class API {

    constructor(public config:IAPIConfig) {
    }

    public connect(dataset:string) : IDataSet {
        var provider:IDataSet = new DataSet(dataset, this.config);
        return provider;
    }
}

export = API;
