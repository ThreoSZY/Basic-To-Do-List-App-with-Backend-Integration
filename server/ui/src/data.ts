export type Id = string

export interface TodoList {
	id: Id
	name: string
	items: TodoItem[]
}

export interface TodoListBasicInfo {
	id: Id
	name: string
	count: number
}

export interface TodoItem {
	id: string
	description: string
	completed: boolean
	priority: 1 | 2 | 3	
}

let todoLists: TodoList[] = [
	{ name: "Homework", id: "x1", items: [] },
	{ name: "Shopping", id: "x2", items: [{ id: "x3", description: "eggs", completed: false, priority: 2 }] },
]

let idCount = 0

function nextId(): Id {
	return String(idCount++)
}

// Function to send GET requests
const getData = async (url = '') => {
    const response = await fetch(url);
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

// Function to send POST requests
const postData = async ( url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST', 
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 
	});

	try {
		const newData = await response.json();
		return newData;
	}catch(error) {
		console.log(error);
	}
}

// function to update data
const putData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'PUT', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 
	});

	try {
		const newData = await response.json();
		return newData;
	}catch(error) {
		console.log(error);
	}
}


// function to delete data
const deleteData = async (url = '') => {
	const response = await fetch(url, {
		method: 'DELETE'
	});

	try {
		const newData = await response.json();
		return newData;
	}catch(error) {
		console.log(error);
	}
}

export async function getLists(): Promise<TodoListBasicInfo[]> {
	return await getData(`/api/lists`);
}

export async function getList(listId: Id): Promise<TodoList | null> {
	return await getData(`/api/list/${encodeURIComponent(listId)}/items`);
}

export async function addList(name: string): Promise<string> {
	return await postData('/api/add-list', {'name':name});
}

export async function addItemToList(listId: Id, item: Omit<TodoItem, "id">): Promise<string | null> {
  	return await postData(`/api/list/${encodeURIComponent(listId)}/add-item`, {'item': item});
}

export async function updateItemOnList(listId: Id, itemId: Id, update: Partial<TodoItem>): Promise<number> {
	return await putData(`/api/list/${encodeURIComponent(listId)}/add-item/${encodeURIComponent(itemId)}`, {'item':update});
}

// add delete list
export async function deleteList(listId: Id): Promise<string | null> {
	return await deleteData(`/api/list/${encodeURIComponent(listId)}`);
}

// delte item from list
export async function deleteItemOnList(listId: Id, itemId: Id): Promise<string | null> {
	return await deleteData(`/api/list/${encodeURIComponent(listId)}/item/${encodeURIComponent(itemId)}`);
}