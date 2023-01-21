import mysql from 'mysql';
import {getUserQuery, setAccessTokenQuery, changePasswordQuery, registerNewAccountQuery, getAllUsersQuery, deleteUserQuery } from './dbQueries/userQuery.js';
import {addArticleQuery} from './dbQueries/addArticle.js';
import {getArticlesQuery} from './dbQueries/getArticles.js';
import {deleteArticleQuery} from './dbQueries/deleteArticle.js';


import util from 'util';


const connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'example',
  database : 'KDC'
});

const conn = util.promisify(connection.connect.bind(connection));
const query = util.promisify(connection.query.bind(connection));
const end = util.promisify(connection.end.bind(connection));

const fetch_user = async (username) => {
    const user = await query(getUserQuery(username));
    //console.log(user);
    return user;
}

const addArticle = async ({ProductName, Model, Description, User, CreationDate}) => {
  console.log(ProductName, Model, Description, User, CreationDate);
  try {
  const check =  await query(addArticleQuery({ProductName, Model, Description, User, CreationDate}));
  console.log(check);
  return check; 
} catch (error){
  console.log("creationdate error", error)
}
}

const getArticls = async () => {
  const articles =  await query(getArticlesQuery);
  //console.log(articles);
  return articles;

}
const setAccessToken = async (user, accessToken)=> {
  const checkAccessToken = await query(setAccessTokenQuery(user, accessToken));
  return checkAccessToken;
  
}

const deleteArticle = async (id) => {
  const checkDelete = await query(deleteArticleQuery(id));
  console.log(checkDelete);
  return checkDelete;
}

const deleteUser = async (id) => {
  const deleteUser = await query(deleteUserQuery(id));
  return deleteUser
}

const changePassword = async (newPassword, userName) => {
  const checkChangePassword = await query(changePasswordQuery(newPassword, userName));
  console.log(checkChangePassword);
  return checkChangePassword;
}

const getAllUsers = async () => {
  const checkAll = await query(getAllUsersQuery());
  return checkAll;
}

const registerNewAccount = async (newAccount, hash, role) => {
  const checkRegister = await query(registerNewAccountQuery(newAccount, hash, role));
  return checkRegister;
}


const main = async ()=>{
  let listOfScannedBarCodes = [
    {  productName: "Motor", model: "1230", description: "First Item", user:"admin"},
    {  productName: "sensor", model: "1231", description: "Second Item", user:"admin"},
    {  productName: "acc", model: "1232", description: "Third Item", user:"admin"},
    {  productName: "MOMO", model: "1233", description: "Fourth Item", user:"admin"}
  ];
  await conn();
  await fetch_user('admin')
  listOfScannedBarCodes.map(async (article)=>{
    await addArticle(article);
  })
  await getArticls();
  await end();
};

export {fetch_user, setAccessToken, deleteArticle, addArticle, changePassword, registerNewAccount, getArticls, getAllUsers, deleteUser }



