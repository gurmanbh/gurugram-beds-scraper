const url = 'https://covidggn.com//api/Reporting/GetPublicHospitalDetails'
const fetchData = require('./lib/getUrl.js')
const io = require('indian-ocean')
const time = require('d3-time-format')
const run = async() => {
	let data = JSON.parse(await fetchData(url))
	const variable = 'ModifiedDate'
	let maxDate
	let p = time.timeParse("%Y-%m-%dT%H:%M:%S.%L")
	let f = time.timeFormat("%Y-%m-%d %H:%M")
	data.forEach((d, i) => {
		delete d.CreatedBy
		delete d.ModifiedBy
		if (!d.Modified){
			d.Modified = d.Created
		}
		d.ModifiedDate = p(d.Modified);

		if (i==0){
			maxDate = d.ModifiedDate
		} else {
			if (maxDate < d.ModifiedDate){
				maxDate = d.ModifiedDate
			}
		}
	})

	data = data.sort(compare)
	console.log(data)

	io.writeDataSync('data/files/' + f(maxDate) + '.csv', data)
	function compare( a, b) {

		if ( a[variable] < b[variable] ){
			return -1;
		}
		if ( a[variable] > b[variable] ){
			return 1;
		}
		return 0;
	}
}

run()