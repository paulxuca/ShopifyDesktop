const remote = require('electron').remote;

export function getAutofillFields(dataType){
	return new Promise((resolve, reject) => {
		remote.getGlobal('sql').all(`PRAGMA table_info(${dataType});`, (err, data)=> {
		if(err)reject(err);
		const finalFields = data.reduce((total, each) => {total.push(each.name);return total;}, []);
		resolve(finalFields);
		});
	});
}