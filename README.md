# API Autoflow Pro Template - Todo App

## Setting

Clone this repository :

```
git clone https://github.com/API-AutoFlow/
```


### Frontend

Install & Run ReactJS Package:

```
cd frontend
yarn install
yarn start
```


### Backend

Install & Run API AutoFlow Pro packages :

<details>
  <summary>► MAC: (press to expand)</summary>
  
  ```
  cd backend/macos/api_interactor/bin
  ./api_interactor start 
  ```
  
  Open up the browser and go to below URL
  
  ```
  http://localhost:4000
  ```
  
  🚨 IMPORTANT: Run the servers by pressing the ▶️ button
  
  Reference:
  http://www.interactor.com/product/autoflow/installation/macos
</details>

<details>
  <summary>► Windows: (press to expand)</summary>
  
  🚨 IMPORTANT: Open the terminal (cmd) using **Run as Administrator**
  ```
  cd /backend/windows/api_interactor/bin
  ./api_interactor install 
  ./api_interactor start 
  ```
 
  Open up the browser and go to below URL
  
  ```
  http://localhost:4000
  ```
  
  🚨 IMPORTANT 🚨 Run the servers by pressing the ▶️ button
	
	
  Reference:
  http://www.interactor.com/product/autoflow/installation/windows
  
</details>

🚨 IMPORTANT: Apply the **_api_autoflow_pro_todo.json_** file using Upload Configuration on the Settings page of API Autoflow Pro.



### Database

Unfortunately, there's no easy way to just clone the entire database.

You first need to install the database in your computer and follow the instructions below to dump the data to your newly installed database.

Install MySQL:<br/>
https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/

Install Workbench:<br/>
https://dev.mysql.com/downloads/workbench/

Import data to data:<br/>
https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

🚨 IMPORTANT: Use the file **_todo_app.sql_** to import into your database

------------------------------------------------------------

## Props

### API Endpoints

| No. | Name                   | Type   | Endpoint                 | Description                               |
| --- | ---------------------- | ------ | ------------------------ | ----------------------------------------- |
| 1   | `User Register`        | POST   | /user                    | Create a user                             |
| 2   | `User Login`           | POST   | /user/login              | Login with user account                   |
| 3   | `User Update`          | PATCH  | /user                    | Edit user information                     |
| 4   | `User Token`           | POST   | /user/token              | Get User Token data                       |
| 5   | `Collection Create`    | POST   | /collection              | Create a collection                       |
| 6   | `Collection List`      | GET    | /collection/list         | Get list of collection data               |
| 8   | `Collection Update`    | PATCH  | /collection              | Edit collection info                      |
| 9   | `Collection Delete`    | DELETE | /collection              | Delete collection data                    |
| 10  | `Todo Create`          | POST   | /todo:collection_id      | Create a todo data                        |
| 11  | `Todo List`            | GET    | /todo:collection_id      | Get list of todo data                     |
| 12  | `Todo Update`          | PATCH  | /todo                    | Edit todo data                            |
| 13  | `Todo Delete`          | DELETE | /todo/check              | Delete todo data                          |

### Database Tables

`user`
| Column          | Datatype    | Defualt           | NULL | KEY |
| --------------- | ----------- | ----------------- | ---- | --- |
| id              | BIGINT      |                   | NO   | PK  |
| email           | VARCHAR     |                   | NO   |     |
| name            | VARCHAR     |                   | NO   |     |
| password        | VARCHAR     |                   | NO   |     |
| create_at       | TIMESTAMP   | NULL              | YES  |     |
| update_at       | TIMESTAMP   | CURRENT_TIMESTAMP | YES  |     |

`collection`
| Column          | Datatype    | Defualt           | NULL | KEY |
| --------------- | ----------- | ----------------- | ---- | --- |
| id              | BIGINT      |                   | NO   | PK  |
| name            | VARCHAR     | NULL              | YES  |     |
| emoji           | VARCHAR     |                   | NO   |     |
| user_id         | INT         |                   | NO   |     |
| create_at       | TIMESTAMP   | NULL              | YES  |     |

`todo`
| Column          | Datatype    | Defualt           | NULL | KEY |
| --------------- | ----------- | ----------------- | ---- | --- |
| id              | BIGINT      |                   | NO   | PK  |
| title           | VARCHAR     |                   | NO   |     |
| description     | VARCHAR     | NULL              | YES  |     |
| complete        | INT         | 0                 | NO   |     |
| collection_id   | INT         |                   | NO   |     |
| user_id         | INT         |                   | NO   |     |
| create_at       | TIMESTAMP   | NULL              | YES  |     |
| update_at       | TIMESTAMP   | CURRENT_TIMESTAMP | YES  |     |
