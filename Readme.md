# Full stack taskmanager application

## Backend

- Node js, Express js, Typescript
- The login and signup is unified, if user already exist they will be loged in, else the account will be created and login response is sent back.
- SQLite is used for persistant data storage, maintaining two tables, one for User data and one for Tasks data. 

## Frontend

- React, Typescript
- The application landing page is Login/Signup page.
- after login or signup, Dashboard is displayed.
- users can create, edit, delete tasks.


### How to install the application?
  1. clone the repository.
  2. create seperate terminal instances for backend and frontend
  3. install dependencies on both (npm install)
  4. npm run dev for development server on both instances.
  5. open the frontend vite sever address in browser
  6. make sure the backend server is also running.
  7. application will work smoothly.

user profiles for testing:
email : test2@gmail.com
password: test2

email : test3@gmail.com
password: test3

since the database file is also included in the project repo, there is some data exists in the sqlite database file.


