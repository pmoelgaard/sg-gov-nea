# SG-GOV-NEA
## API to access the Singaporean Governement National Environment Agency's Dataset

*This library is still HIGHLY EXPERIMENTAL, use are your own discretion, the author takes no responsibility.*

---

## Background
This is an attempt to make an easy to use NodeJS implementation for the Singaporean Government API, the only other alternative found was [sghaze](https://www.npmjs.com/package/node-sghaze), however since it's not listed with a repository, I prefer not to use it. Furthermore, it is aligned towards only the PSI DataSet where the ambition here is to embrace the complete set of feeds from the NEA.

---

### Sample Usage

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
	      NPSI: 144,
	      NPSI_PM25_3HR: 171,
	      NO2_1HR_MAX: 33,
	      PM10_24HR: 126,
	      PM25_24HR: 96,
	      SO2_24HR: 6,
	      CO_8HR_MAX: 1.97,
	      O3_8HR_MAX: 32,
	      NPSI_CO: 20,
	      NPSI_O3: 13,
	      NPSI_PM10: 88,
	      NPSI_PM25: 144,
	      NPSI_SO2: 4
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