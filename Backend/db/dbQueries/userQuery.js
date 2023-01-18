import mysql from 'mysql';

const getUserQuery = (username) => {
    return mysql.format(`SELECT * FROM Users where UserName  = ? `, username);
};

const getAllUsersQuery = () => {
    return mysql.format('SELECT UserID, UserName, Role FROM Users');
};

const setAccessTokenQuery = (username, accessToken) => {
    return mysql.format(`UPDATE Users SET Token = ? where UserName  = ?`, [accessToken, username]);
};

const changePasswordQuery = (newPassword, userName) => {
    return mysql.format(`UPDATE Users SET Password = '${newPassword}' WHERE UserName = '${userName}'`)
};

const registerNewAccountQuery = (newAccount, hash, role) => {
    return mysql.format(`INSERT INTO Users (UserName, Password, Role) VALUES (?, ?, ?)`, [newAccount, hash, role]);
};

const deleteUserQuery = (id) => {
    return mysql.format(`DELETE FROM Users WHERE UserID IN (?)`, [id]);
};

export { getUserQuery, setAccessTokenQuery, changePasswordQuery, registerNewAccountQuery, getAllUsersQuery, deleteUserQuery }