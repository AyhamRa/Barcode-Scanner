CREATE TABLE IF NOT EXISTS Articel  ( 
    ProductID int NOT NULL AUTO_INCREMENT,
    ProductName varchar(255) NOT NULL,
    Model varchar(255) NOT NULL,
    Description varchar(255),
    User varchar(255),
    CreationDate varchar(255) NOT NULL ,

    PRIMARY KEY (ProductID)
 );

CREATE TABLE IF NOT EXISTS Users  (
    UserID int NOT NULL AUTO_INCREMENT,
    UserName varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Role varchar(255) NOT NULL,
    Token varchar(255),
    PRIMARY KEY (UserID)
);

insert into Users (
    UserName,
    Password,
    Role
    
) values('admin', '$2a$10$oVbQ9TbICBF8gzD8dvHwm.fr8huV5eyzdnBx4Or7TablImoplAquK', 'admin'); 

CREATE TABLE IF NOT EXISTS AppInitalize  (
   Initalized boolean 
);