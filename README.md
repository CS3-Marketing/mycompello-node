# mycompello-node

A wrapper library built on top of [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client)

[![npm version](https://badge.fury.io/js/mycompello.svg)](https://badge.fury.io/js/mycompello)

## Installation

```bash
npm install mycompello
```

## Usage

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.list('/')
.then((files) => {
  console.log(files);
});
.catch((err) => {
  console.log(err);
});
```

## Methods

### list

Fetches a list of files from the provided remote path.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.list('/')
.then((list) => {
  console.log(list);
});
.catch((err) => {
  console.log(err);
});
```

### exists

Check if the provided file or directory exists on the remote server.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.exists('/hello-world.txt')
.then((exists) => {
  console.log(exists);
});
.catch((err) => {
  console.log(err);
});
```

### get

Retrieve a file from the remote server. The file can be saved to the local path provided.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.get('/hello-world.txt', './my-folder/hello-world.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### fastGet

Downloads a file at path to dst using parallel reads for faster throughput.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.fastGet('/hello-world.txt', './my-folder/hello-world.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### put

Uploads a file from local path to the remote server.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.put('/my-local-folder/my-file.txt', '/my-file.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### fastPut

Uploads a file from local path to the remote server using concurrency.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.fastPut('/my-local-folder/my-file.txt', '/my-file.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### append

Append data to remote file.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.append('my new line', '/remote-folder/my-file.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### mkdir

Create a directory on the remote server.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.mkdir('/my-folder')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### rmdir

Remove a directory on the remote server.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.rmdir('/my-folder')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### delete

Delete a file on the remote server.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.delete('/my-folder/hello-world.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### rename

Rename a file on the remote server.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.rename('/my-folder/hello-world.txt', '/my-folder/hello-world-renamed.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### posixRename

Uses openSSH POSIX rename extension to rename a file or directory.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.posixRename('/my-folder/hello-world.txt', '/my-folder/hello-world-renamed.txt')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### chmod

Change the mode (read, write or execution permssions) of a file.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.chmod('/my-folder/hello-world.txt', '777')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### uploadDir

Upload the contents of a local file to a remote file.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.uploadDir('/my-folder-local', '/my-folder-remote')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```

### downloadDir

Download the contents of a remote file to a local file path.

Example Use:

```javascript
const MyCompello = require('mycompello');

let client = new MyCompello({
  host: 'myhost.com',
  port: 22,
  username: 'username',
  password: 'password'
});

await client.downloadDir('/my-folder-remote', '/my-folder-local')
.then((file) => {
  console.log(file);
});
.catch((err) => {
  console.log(err);
});
```
