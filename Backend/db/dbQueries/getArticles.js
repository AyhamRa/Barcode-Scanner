import mysql from 'mysql';

const getArticlesQuery = mysql.format("SELECT * FROM Articel");

export { getArticlesQuery }