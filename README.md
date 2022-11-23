# storyforger: Make and share your own choose-your-own-adventure stories!

StoryForger is an online application that allows you to create and share 

# API Routes

### Users

<details>
<summary>

#### `POST /api/users/session` - Sign in user
</summary>

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with user's details (without password)

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format format or missing in the req
- `401` if the user login credentials are invalid
</details>

<details>
<summary>
#### `DELETE /api/users/session` - Sign out user

</summary>

**Returns**

- A success message

**Throws**

- `403` if user is not logged in
</details>

<details>
<summary>
#### `POST /api/users` - Create an new user account
</summary>

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if username or password is in the wrong format
- `409` if username is already in use
</details>

<details>
<summary>
#### `PUT /api/users` - Update a user's profile
</summary>

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use
</details>

<details>
<summary>
#### `DELETE /api/users` - Delete user
</summary>

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
</details>

### Book

#### `GET /api/book/` - Gets the books of the currently signed-in users

#### `GET /api/book/:id` - Gets the book and its pages
#### `POST /api/book/` - Creates a new book

#### `DELETE /api/book/:id` - Deletes a book

#### `PATCH /api/book/:id` - Modifies the book

### Page

#### `GET /api/page/:id` - Gets a page

#### `POST /api/page` - Create a new page

#### `PATCH /api/page/:id` - Modifies the page

#### `GET /api/connection/:id` - Gets a connection

#### `POST /api/connection/` - Creates a new connection

#### `DELETE /api/connection/:id` - Deletes a connection