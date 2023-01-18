import mysql from 'mysql';


const addArticleQuery = ({ ProductName, Model, Description, User, CreationDate }) => {
    return mysql.format("INSERT INTO Articel(ProductName, Model, Description, User, CreationDate) VALUES (?, ?, ?, ?, ?)",
        [ProductName, Model, Description, User, CreationDate]);
}

export { addArticleQuery }