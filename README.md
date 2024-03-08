# Blog app using nodejs🚀

- create user model✅
- add user router and controller✅
- setup views folder and home page✅
- add login form✅
- add signup form✅
- add logout functionality✅


## TODOS:

- complete authentication
- CRUD operations in blog


## auth

- user signs up and we will create token and server will send token via req.cookie or in response body
- we will create a middleware function to verify the jwt token
- so for every next resource or route, we will verify token
- if true, redirect to requested resource
- else, redirect to login page