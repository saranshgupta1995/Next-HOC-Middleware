<h1 align='center'>Next High Order Middleware</h1>

A utility that lets you add fake middlewares because Next Js currently doesn't support real ones.
<hr>

> 💁 _**Note:** Requires browser support for Promises and ES6

- [Getting Started](#getting-started)
- [Examples](#examples)
        - [Basic Middleware setup](#basic-middleware-setup)
        - [Middlewares that can raise errors ( auth )](#middlewares-that-can-raise-errors--auth)

## Getting Started

```shell
npm i next-high-order-middleware
```

## Examples

#### Basic Middleware setup

```javascript

// middlewares/index.js

import { logger } from './logger';
import { bodyparser } from './bodyparser';

import apply from "next-high-order-middleware";

const applyBasicMiddlewares = apply([bodyparser, logger]);

export const applyBasicMiddlewares;

// next-js-project/pages/api/example

import { applyBasicMiddlewares } from '../../middlewares';

export default applyBasicMiddlewares(async (req, res) => {
    ...
})

```

#### Middlewares that can raise errors ( auth )

```javascript

// middlewares/index.js

import { logger } from './logger';
import { bodyparser } from './bodyparser';
import { verifyAuthToken } from './auth';

import apply from "next-high-order-middleware";

const applyAuthMiddlewares = apply([bodyparser, logger, verifyAuthToken])

export const applyAuthMiddlewares;

//next-js-project/middlewares/auth
...
if(authFailed){
    return {
        ...,
        //this makes the execution flow stop for the api and this data object is sent to the client as a json
        _status:false
    }
}

// next-js-project/pages/api/example

import { applyBasicMiddlewares } from '../../middlewares';

export default applyBasicMiddlewares(async (req, res) => {
    ...
})

```
