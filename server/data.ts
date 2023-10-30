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

export function getLists(): TodoListBasicInfo[] {
	return todoLists.map(({ id, name, items }) => ({ id, name, count: items.length }))
}

export function getList(listId: Id): TodoList | null {
	return todoLists.filter(l => l.id === listId)[0] || null
}

export function addList(name: string): Id {
	const newList: TodoList = { id: nextId(), name, items: [] }
	todoLists.push(newList)
	save()
	return newList.id
}

export function addItemToList(listId: Id, item: Omit<TodoItem, "id">): Id | null {
  const list = getList(listId)
  if (!list) {
    return null
  }
	const id = nextId()
	list.items?.push({ ...item, id })
	save()
	return id
}

export function updateItemOnList(listId: Id, itemId: Id, update: Partial<TodoItem>): number {
	const list = getList(listId)
	if (!list) {
		return 0
	}

  let itemsUpdated = 0
	list.items = list.items.map(x => {
		if (x.id === itemId) {
      ++itemsUpdated
			return { ...x, ...update }
		} else {
			return x
		}
	})
	save()
  return itemsUpdated
}

// async function to load json file and returns the object
export async function load(filename="todo-lists.json") {
	try {
		const response = await fetch(filename);
		const json = await response.json();
		todoLists = json.todoLists;
		idCount = json.idCount;
		return json;
	} catch (error) {
		// in case of error, return null
		return null;
	}
}

// function to save json file
export function save(filename="todo-lists.json") {
	const data = JSON.stringify({"idCount": idCount, "todoLists": todoLists});
    const fs = require('fs');
    fs.writeFileSync(filename, data);
}

// delete list
export function deleteList(listId: Id): Id | null {
	const sizeBefore = todoLists.length;
	// keep all lists except for the list having the same id
	todoLists = todoLists.filter(l => l.id != listId);
	// check that a list has been deleted
	if (sizeBefore === todoLists.length) {
		return null;
	}
	save()

	return listId;
}

// delte item from list
export function deleteItemOnList(listId: Id, itemId: Id): Id | null {
	const list = getList(listId);
	if (!list) {
		return null;
	}
	const sizeBefore = list.items.length;
	// keep all lists except for the list having the same id
	list.items = list.items.filter(l => l.id != itemId);
	// check that a list has been deleted
	if (sizeBefore === list.items.length) {
		return null;
	}
	// update todolists
	// deleteList(listId);
	// todoLists.push(list);
	save()

	return itemId;
}