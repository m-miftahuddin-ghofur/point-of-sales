<img src=https://forum.teknologi.id/uploads/discuss/media/501011545189495.png >
<h1 align="center"> POINT OF SALES RESTful API </H1>

# Overview

## Introduction

**_Point of Sales_** is the program written for Task Week 1 of Bootcamp Arkademy : Point of Sales Back-End.



## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-v2..17.1-blue)](https://www.npmjs.com/search?q=mysql) [![body-parser](https://img.shields.io/badge/body--parser-v1.19.0-red?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![morgan](https://img.shields.io/badge/morgan-v1.9.1-success?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![dotenv](https://img.shields.io/badge/dotenv-v1.9.1-black?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![cors](https://img.shields.io/badge/cors-v2.8.5-blueviolet?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.
  
### Authentication
Access to the API is granted by providing your username and password using HTTP basic authentication. The username and password used, is the same username and password you use to register.

### Authorization
For authorization, this API use JWT (jsonwebtoken).

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:3000/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'pos'
```

## Setup Database
You can import file `pos.sql` to **phpmyadmin**.
## Endpoints

 #### **CRUD Product Endpoint**
* **Read All Product**
  - **Request** : **`GET /product`**
  - **Response** :
```{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "sprite",
            "discription": "minuman segar rasa lemon",
            "image": "sprite.jpg",
            "category": "minuman",
            "price": 7000,
            "quantity": 60,
            "date_added": "2019-10-14T23:02:04.000Z",
            "date_updated": "2019-10-18T16:32:02.000Z"
        },
        {
            "id": 4,
            "name": "Clear",
            "discription": "sampo ",
            "image": "clear.jpg",
            "category": "kecantikan",
            "price": 17000,
            "quantity": 50,
            "date_added": "2019-10-15T02:26:30.000Z",
            "date_updated": "2019-10-18T14:30:11.000Z"
        },
        {
            "id": 5,
            "name": "coca cola",
            "discription": "seger walau hitam",
            "image": "cola.jpg",
            "category": "minuman",
            "price": 10000,
            "quantity": 0,
            "date_added": "2019-10-15T05:45:20.000Z",
            "date_updated": "2019-10-18T16:30:43.000Z"
        },
        {
            "id": 6,
            "name": "fanta",
            "discription": "Minuman bersoda warna Pink",
            "image": "fanta.jpg",
            "category": "minuman",
            "price": 4500,
            "quantity": 2,
            "date_added": "2019-10-16T01:52:54.000Z",
            "date_updated": "2019-10-16T01:52:54.000Z"
        },
        {
            "id": 7,
            "name": "davos",
            "discription": "permen semriwing",
            "image": "davos.jpg",
            "category": "makanan",
            "price": 2000,
            "quantity": 4,
            "date_added": "2019-10-16T05:29:17.000Z",
            "date_updated": "2019-10-17T05:31:38.000Z"
        },
        {
            "id": 9,
            "name": "godday",
            "discription": "kopi terbaik",
            "image": "godday.jpg",
            "category": "minuman",
            "price": 100000,
            "quantity": 2,
            "date_added": "2019-10-18T05:42:16.000Z",
            "date_updated": "2019-10-18T16:31:37.000Z"
        }
    ]
}
```

* **Create Product**
  - **Request** : **`POST /product`**
  - **Response** :
```
{
    "status": 200,
    "result": "Succes Add Product!!"
}
```
* **Update Product**
  - **Request** : **`PUT /product`**
  - **Response** :
```
{
    "status": 200,
    "result": "update Product Sucessfully!"
}
```
* **Delete Product**
  - **Request** : **`Delete /product`**
  - **Response** :
```
{
    "status": 200,
    "result": "update Product Sucessfully!"
}
```
* **Search Product By Name**
  - **Request** : **`Get /product/search?name=sprite`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "sprite",
            "discription": "minuman segear rasa lemon",
            "image": "",
            "category_id": 2,
            "price": 7000,
            "quantity": 30,
            "date_added": "2019-10-14T23:02:04.000Z",
            "date_updated": "2019-10-17T11:25:48.000Z"
        }
    ]
}
```
* **Add Product**
  - **Request** : **`Get /product/add`**
  - **Response** :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Reduce Product**
  - **Request** : **`Get /product/reduce`**
  - **Response** :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
#### **CRUD Category Endpoint**
* **Read All Category**
  - **Request** : **`GET /category`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "category": "makanan"
        },
        {
            "id": 2,
            "category": "minuman"
        },
        {
            "id": 5,
            "category": "kecantikan"
        }
    ]
}
```

* **Create Product**
  - **Request** : **`POST /category`**
  - **Response** :
```
{
    "status": 200,
    "result": "Success Add Category!!"
}
```
* **Update Product**
  - **Request** : **`PUT /category/1`**
  - **Response** :
```
{
    "status": 200,
    "result": "Success Update Category!"
}
```
* **Delete Product**
  - **Request** : **`PUT /category/4`**
  - **Response** :
```
{
    "status": 200,
    "result": "Success Delete Category!"
}
```
#### **Transaction  Endpoint**
* **Create Transaction**
  - **Request** : **`POST /transaction`**
  - **Response** :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 3,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

* **Add Transaction**
  - **Request** : **`POST /transaction/2`**
  - **Response** :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
* **Read Transaction**
  - **Request** : **`GET /transaction/1`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "transaction_id": 1,
            "product_id": 1,
            "quantity": 5,
            "date_added": "2019-10-18T04:32:01.000Z"
        },
        {
            "transaction_id": 1,
            "product_id": 2,
            "quantity": 3,
            "date_added": "2019-10-18T13:10:44.000Z"
        }
    ]
}
```

### Support

For API support, please email mmghofur@gmail.com