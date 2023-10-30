import express from 'express'
import bodyParser from 'body-parser'
import pino from 'pino'
import expressPinoLogger from 'express-pino-logger'
import * as utils from './data'

// set up Express
const app = express()
const port = 8087
app.use(bodyParser.json())

// set up Pino logging
const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
})
app.use(expressPinoLogger({ logger }));

// start server
app.listen(port, () => {
  console.log(`To-do list server listening on port ${port}`)
});

// GET /api/lists
app.get('/api/lists', (req, res) => {
  // get all lists
  const data = utils.getLists();
  // if there are no lists
  if (data == null) {
    res.send(404);
  } else {
    res.send(data);
  }
});

// GET /api/list/<<list ID>>/items
app.get('/api/list/:id/items', (req, res) => {
  // get list using the id from the url
  const data = utils.getList(req.params.id);
  // if id is not valid
  if (data == null) {
    res.send(404);
  } else {
    res.send(data);
  }
});

// POST /api/add-list
app.post('/api/add-list', (req, res) => {
  const data = req.body;
  // check if the sent name is of the correct type
  if (typeof data?.name === "string") {
    // add list and send back the id
    res.send(utils.addList(data.name));
  } else {
    res.send(400);
  }
});

// POST /api/list/<<list ID>>/add-item
app.post('/api/list/:id/add-item', (req, res) => {
  const data = req.body;
  // add item using the id from the url
  const itemId = utils.addItemToList(req.params.id, data.item);
  // check if item wasn't added
  if (itemId == null) {
    res.send(400);
  }
  res.send(''+itemId);
});

// PUT /api/list/<<list ID>>/item/<<item ID>>
app.put('/api/list/:list_id/item/:item_id', (req, res) => {
  const data = req.body;
  // update item using the id from the url
  const itemsUpdated = utils.updateItemOnList(req.params.list_id, req.params.item_id, data.item);
  // check if item wasn't added
  if (itemsUpdated == null) {
    res.send(404);
  }
  res.send(itemsUpdated.toString());
});

// DELETE /api/list/<<list ID>>
app.delete('/api/list/:id', (req, res) => {
  // update item using the id from the url
  const listId = utils.deleteList(req.params.id);
  // check if item wasn't added
  if (listId == null) {
    res.send(404);
  }
  res.send(listId);
});

// DELETE /api/list/<<list ID>>/item/<<item ID>>
app.delete('/api/list/:list_id/item/:item_id', (req, res) => {
  // delete item
  const itemId = utils.deleteItemOnList(req.params.list_id, req.params.item_id);
  // check if item wasn't added
  if (itemId == null) {
    res.send(404);
  }
  res.send(itemId);
});