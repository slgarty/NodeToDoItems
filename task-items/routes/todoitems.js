const router = require('express').Router();
const todoDb = require('../db/todoitems-db');

router.get('/', async (req, res) => {
    const toDoItems = await todoDb.getToDoItems();
    const categories= await todoDb.getCategories();
    res.render('todoitems/index', { toDoItems, categories });
   
});
router.get('/completedItems', async (req, res) => {
    const toDoItems = await todoDb.getCompletedItems();
    res.render('todoitems/completedItems', { toDoItems});
   
});

router.get('/categories', async (req, res) => {
    const categories= await todoDb.getCategories();
    res.render('todoitems/categories', { categories });
   
});

router.get('/editCategory', async (req, res) => {
    const category = await todoDb.getCategoryById(req.query.id);
    res.render('toDoItems/editCategory', { category });
});

router.post('/updateCategory', async (req, res) => {
    await todoDb.updateCategory(req.body);
    res.redirect('/toDoItems/categories');
});

router.get('/addToDoItem', async (req, res) => {
    const categories= await todoDb.getCategories();
    res.render('toDoItems/addToDoItem', {categories});
});

router.post('/saveToDoItem', async (req, res) => {
    await todoDb.addToDoItem(req.body);
    res.redirect('/toDoItems');
});
router.get('/addCategory', (req, res) => {
    res.render('toDoItems/addCategory');
});

router.post('/addCategory', async (req, res) => {
    await todoDb.addCategory(req.body);
    res.redirect('/toDoItems/categories');
});
router.post('/complete', async (req, res)=>{
    await todoDb.complete(req.body);
    res.redirect('/todoitems');
});


module.exports = router;