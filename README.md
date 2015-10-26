# SG-GOV-NEA
## NodeJS Library to access the Singaporean Government National Environment Agency's Dataset Web API

*This library is still HIGHLY EXPERIMENTAL, use at your own discretion, the author takes no responsibility until further works has been done.*

---

## Background
This is an attempt to make an easy to use NodeJS implementation for the Singaporean Government API which converts the XML they use to more JavaScript friendly JSON, the only other alternative found was [sghaze](https://www.npmjs.com/package/node-sghaze), however since it's not listed with a repository, I prefer not to use it. Furthermore, it is aligned towards only the PSI DataSet where the ambition here is to embrace the complete set of feeds from the NEA.

---

## Todo / Disclaimer

Currently the library only has support for a single dataset (PSI Update), however next the remaining dataset will be added, they just need a basic parser function for each to transform the response before sending it down the event chain.

---

## Sample Usage

##### Code

	var API = require('../sg-gov-nea/');
	var lib = require('../sg-gov-nea/sg-gov-nea.js');

	var api = new API(new lib.sg.gov.nea.APIConfig({key: '[insert_your_own_API_key]'}));
	var dataSet = api.connect(lib.sg.gov.nea.DataSet.PSI_UPDATE);
	dataSet.on(lib.sg.gov.nea.APIEvent.DATA, function (data) {
	    console.log(data);
	})

##### Response

	[
	  {
	    region: 'rNO',
	    latitude: 1.41803,
	    longitude: 103.82,
	    timestamp: 20151026130000,
	    readings: {
	      npsi: 144,
	      npsi_pm25_3hr: 171,
	      no2_1hr_max: 33,
	      pm10_24hr: 126,
	      pm25_24hr: 96,
	      so2_24hr: 6,
	      co_8hr_max: 1.97,
	      o3_8hr_max: 32,
	      npsi_co: 20,
	      npsi_o3: 13,
	      npsi_pm10: 88,
	      npsi_pm25: 144,
	      npsi_so2: 4
	    }
	  },
	  {
	    ...
	  }
	]
	
### Dataset Documentation
can be found on the NEA's website:
[https://www.nea.gov.sg/docs/default-source/api/developer's-guide.pdf](https://www.nea.gov.sg/docs/default-source/api/developer's-guide.pdf)

---

## License

Copyright (c) 2015 Peter Andreas Moelgaard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.