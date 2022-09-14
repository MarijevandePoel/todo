const baseUrl = `http://localhost:3000/`;

const getFetchData = async () => {
	try {
		const response = await fetch(baseUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};
getFetchData();

const postFetchData = async () => {
	try {
		const response = await fetch(baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fetch),
		});
		const data = await response.json();
		data.forEach((task) => {
			let itemDescription = task.description;
			let itemId = task._id;
			let done = task.done;
			addItem(itemDescription, itemId, done);
			console.log("tasks are post");
		});
		return task;
	} catch (err) {
		console.log(err, "dit lukt me niet");
	}
};

postFetchData();
