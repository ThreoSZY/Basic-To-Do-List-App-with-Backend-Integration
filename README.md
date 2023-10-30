# Basic To-Do List App with Backend Integration

This project transforms a basic frontend-only to-do list Vue.js app to store the to-do list data in an Express.js server backend. This data is accessed from the frontend via a RESTful API.

## 📌 Table of Contents

- [Setup](#setup)
- [Features](#features)
- [Endpoints](#endpoints)

## 🛠 Setup

Ensure you have two terminals open:
1. One for running the API server (`server/`)
2. One for the Vue UI (`ui/`)

## 🌟 Features

1. **Frontend To-Do List**: Based on Vue.js, this offers a user-friendly interface to interact with your to-do lists.
2. **Backend Server**: Built with Express.js, it manages and stores to-do list data in a file-based database (`todo-lists.json`).
3. **Data Handling**: The system loads and saves data seamlessly, with error handling for data reading and writing operations.
4. **RESTful API**: Provides CRUD operations to interact with the to-do lists and list items.
5. **Security**: Implemented measures against injection attacks when constructing URLs.

## 📂 Endpoints

- **GET /api/lists**: Retrieve all lists.
- **GET /api/list/<<list ID>>/items**: Fetch items for a specific list.
- **POST /api/add-list**: Add a new to-do list.
- **POST /api/list/<<list ID>>/add-item**: Add an item to a specific list.
- **PUT /api/list/<<list ID>>/item/<<item ID>>**: Update an item in a specific list.
- **DELETE /api/list/<<list ID>>**: Delete a specific to-do list.
- **DELETE /api/list/<<list ID>>/item/<<item ID>>**: Delete an item from a specific list.