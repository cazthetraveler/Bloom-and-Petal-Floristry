const db = require('../config/connection');
const {Item, Variety} = require('../models');
const itemSeeds = require('./itemSeeds.json');
const varietySeeds = require('./varietySeed.json');
// const cleanDB = require('./cleanDB');

db.once('open', async () => {
    // await cleanDB('item', 'items');
    // await Variety.create(varietySeeds);
    await Item.create(itemSeeds);

    console.log('Done!!');
    process.exit(0);
});