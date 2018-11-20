# cat5th/serializer

## This registry is still in constructing, do not use it in production

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