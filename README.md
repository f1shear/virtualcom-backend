
# Start dev server

```
npm install
npm start
```

# API

## Phones

List all phones

` GET: /phones `

---

Register a new phone

` POST: /phones `

---

## Connections

Get all connections

` GET: /connections `

---
Create a new connection

` POST: /connections `

Content-Type: application/json
```
{
  "caller": 9xxxxxxxxx,
  "callee": 9xxxxxxxxx
}
```
---

Get connection

` GET: /connections/:connectionID `

---

Update connection

` POST: /connections/:connectionID/:action `

action = call, ring, accept, reject, cancel, close, ignore

---
