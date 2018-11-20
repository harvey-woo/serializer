# cat5th/serializer

## This registry is still in constructing, do not use it in production

[documentation](https://harvey-woo.github.io/serializer/index.html)

[![npm version](https://img.shields.io/npm/v/@cat5th/serializer.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/serializer)
[![coverage](https://img.shields.io/codecov/c/github/harvey-woo/serializer.svg?style=flat-square)](https://codecov.io/gh/harvey-woo/serializer)
[![npm downloads](https://img.shields.io/npm/dt/@cat5th/serializer.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/serializer)
[![Build Status](https://img.shields.io/travis/harvey-woo/serializer.svg?style=flat-square)](https://travis-ci.org/harvey-woo/serializer)

## What is it
This is a simple serializer for serializing data, keeping the type and refs in a certain context

## installation and usage

```
npm i @cat5th/serializer -S
```

```javascript

import { Serializer } from '@cat5th/serializer'
import { Unserializer } from '@cat5th/serializer'

```

## example

### serialize

```javascript
const serializer = new Serializer()

class A() {
  hello = 'Hello world!'
}

// after serializer, you can stringify data to string and transport it by ajax or sth
JSON.stringify(serializer(new A))
```

### unserialize

```javascript
const unserizer = new Unserilazer()

class A() {
  hello = 'Hello world!'
}

// get data from string, and unserializer to A instance
unserilazer(JSON.parse(data), { classes: { A } })
```

serializer will keep the references, you will get same reference as following example

```javascript
const obj = {}
cons arr = [obj, obj]
serliazer.serialize(array)
```
```javascript
const arr = unserializer.unserializer(data)
arr[0] === arr[1] // => true
```