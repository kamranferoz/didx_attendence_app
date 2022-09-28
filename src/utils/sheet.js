const Sheet = () => {
	const data = {};

	const init = ({ apiKey, sheetId, sheetName }) => {
		data.apiKey = apiKey;
		data.sheetId = sheetId;
		data.url = `https://api.sheetson.com/v2/sheets/${sheetName}`;
	};

	const getReq = async (url) => {
		const req = await fetch(url, {
			headers: {
				Authorization: `Bearer ${data.apiKey}`,
				"X-Spreadsheet-Id": data.sheetId,
			},
		});

		const res = await req.json();
		return res;
	};

	const postReq = async (body, url) => {
		const req = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${data.apiKey}`,
				"X-Spreadsheet-Id": data.sheetId,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const res = await req.json();
		return res;
	};

	const addRow = async (body, callback) => {
		const result = await postReq(body, data.url);
		callback && callback(result);
	};

	const getAllRows = async (callback) => {
		const { results } = await getReq(data.url);
		callback(results);
	};

	const getRow = async (column, value, callback) => {
		let rows;
		await getAllRows((data) => (rows = data));

		const match = rows.find((elem) => {
			return (
				elem &&
				elem.hasOwnProperty(column) &&
				Object.values(elem).includes(value)
			);
		});

		callback && callback(match ?? null);
	};

	return {
		init,
		addRow,
		getAllRows,
		getRow,
	};
};

export default Sheet;
