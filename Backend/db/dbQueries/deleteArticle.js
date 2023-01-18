import mysql from 'mysql';

const deleteArticleQuery = (ids) => {
  return `DELETE FROM Articel WHERE ProductID IN (${ids.join(',')})`;  // generate DELETE query
};

export  {deleteArticleQuery}