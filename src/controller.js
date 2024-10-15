let items = [
    { id: 1, name: 'Item 1' },
    { id:2, name: 'Item 2'}
];

//GET ALL ITEMS
exports.getItems = (req, res) => {
    res.status(200).json(items);
};

//CREATE A NEW ITEM
exports.createItem = (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
};

//PUT AN ITEM BY ID
exports.putItem = (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === itemId);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    item.name = req.body.name || item.name;
    res.status(200).json(item);
};



//DELETE AN ITEM BY ID
exports.deleteItem = (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const index = items.findIndex(i => i.id === itemId);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted successfully' });
};


