const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'ToDo',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}
const getToDoItems = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM ToDoItems t LEFT join Categories c ON t.CategoryId = c.Id where CompletedDate is null ');
    return recordset;
}
const getCompletedItems = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM ToDoItems t LEFT join Categories c ON t.CategoryId = c.Id where CompletedDate is not null');
    return recordset;
}
const getCategories = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM Categories');
    return recordset;
}

const getToDoItemId = async id => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT * FROM ToDoItems WHERE Id = ${id}`;
    return recordset[0];
}

const getCategoryById = async id => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT * FROM Categories WHERE Id = ${id}`;
    return recordset[0];
}

const updateCategory = async ({id, name}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE Categories SET name = ${name} WHERE Id = ${id}`;
}
const complete = async ({id}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE ToDoItems SET CompletedDate =  getDate() WHERE ItemId = ${id}`;
}


const addToDoItem = async ({ title, dueDate, categoryId}) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO ToDoItems (title, dueDate, categoryId) 
    VALUES (${title}, ${dueDate}, ${categoryId})`;
}
const addCategory = async ({ name}) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO Categories (name) 
    VALUES (${name})`;
}

module.exports = {
    getToDoItems,
    getToDoItemId,
    updateCategory,
    addToDoItem, 
    getCategoryById,
    getCategories, 
    complete,
    addCategory,
    getCompletedItems
}