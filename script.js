toDoDatafunction();
const list = document.getElementById("taskcontainer");
function emptyList() {
	list.innerHTML = "";
}
const userInput = document.getElementById("newTaskInput");
const taskContent = document.getElementsByClassName("text");

//krijg data van server met de waarden desc, id en done.
async function toDoDatafunction() {
	emptyList;
	let toDoData = await getToDoData();
	toDoData.forEach((task) => {
		let newTask = {
			description: task.description,
			id: task._id,
			done: task.done,
		};
		// met de data op de server een nieuwe taak aanmaken
		createTask(newTask);
	});
}
// function to add new elements to the dom
function createTask(newTask) {
	//console.log("newTask", newTask.description);
	const parent = document.getElementById("taskcontainer");
	const newDiv = document.createElement("div");
	newDiv.classList.add("toDoTask");
	newDiv.setAttribute("id", newTask.id);
	parent.appendChild(newDiv);
	// done button
	taskDone = document.createElement("input");
	taskDone.setAttribute("type", "checkbox");

	taskDone.addEventListener("change", async (e) => {
		console.log("checked");
		let doneTask = { done: true };
		const updatedTask = await changeData(newTask.id, doneTask);
	});
	newDiv.appendChild(taskDone);

	// plek om de nieuwe taak op te slaan input want makkelijker te editen.
	const taskContent = document.createElement("input");
	taskContent.classList.add("text");
	taskContent.type = "text";
	taskContent.value = newTask.description;
	taskContent.setAttribute("readonly", "readonly");
	if (newTask.done === true) {
		taskContent.classList.add("done");
	}
	newDiv.appendChild(taskContent);
	// edit
	const editButton = document.createElement("button", "i");
	editButton.setAttribute("id", "editButton");
	editButton.classList.add("fa-solid", "fa-pencil");
	editButton.addEventListener("click", (e) => {
		if ((editButton.classList === "fa-solid", "fa-pencil")) {
			console.log("edit");
			taskContent.removeAttribute("readonly");
			taskContent.focus();
			editButton.classList.remove("fa-solid", "fa-pencil");
			editButton.classList.add("fa-solid", "fa-floppy-disk");
		} else {
			console.log("er gin iets mis met veranderen");
		}
	});
	editButton.addEventListener("click", async (e) => {
		if ((editButton.classList === "fa-solid", "fa-floppy-disk")) {
			console.log("save");
			taskContent.setAttribute("readonly", "readonly");
			taskContent.classList.remove("fa-solid", "fa-floppy-disk");
			editButton.classList.add("fa-solid", "fa-pencil");
			//const editedTask = await changeData(newTask.id, newTask.description);
		}
	});

	// delete button
	const deleteButton = document.createElement("button", "i");
	deleteButton.setAttribute("id", "deleteButton");
	deleteButton.className = "fa-solid fa-trash";
	deleteButton.addEventListener("click", (e) => {
		list.removeChild(newDiv);
		deleteData(newDiv.id);
	});
	// buttons aan de div toevoegen
	newDiv.appendChild(editButton);
	newDiv.appendChild(deleteButton);
}
// post new task to server. Nieuwe taak moet met deze values worden toegvoegd aan de server.
function newPost() {
	const userInput = document.getElementById("newTaskInput").value;
	//console.log(userInput);
	let task = { description: `${userInput}`, done: false };
	postToDoData(task);
}

add.addEventListener("click", (e) => {
	e.preventDefault;
	//emptyList;
	newPost();
});

// done function

// list.addEventListener("change", function (task) {
// 	if (task.target.id === "taskDone") {
// 		let parent = task.target.parentElement;
// 		let parentOfParent = document.getElementById("taskcontainer");

// 		if (task.currentTarget.checked === true) {
// 			let task = { done: true };
// 			console.log("checked");
// 			parent.addClassList("done");
// 			parent = parentOfParent.lastChild;

// 			postToDoData(task);
// 		}
// 	}
// });
