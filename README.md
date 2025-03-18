# Login

[methods:GET,POST,PUT,DELETE]

/api/login => POST

payload:
{
email,passwors
}

response:
{
token:string,user:object
}

# Registration

/api/register => POST

payload:

{
name,email,password
}

response:
{
token: jwt token
}

# Product

api/product => GET

response:
{
all products list per page vise
}

---

api/product => POST

payload:

{
(insert feileds)
name,category,price,design,image,type,offer,brand,discount,discription,rating,tags[],

}
(new product add (create))

---

api/product => PUT
(product update)

---

api/product/:id => DELETE

response:

{
"acknowledged": true
(product deleted)
}

---

# Cart

api/cart => POST

payload:

[{
productId,quantity
}]

response:
{
cart_id
}

---

api/cart/:id => PUT

payload:
{
productId,quantity //product not yet cart then automatic add this product

}

---

api/cart/:id => DELETE
payload:
{
"acknowledged": true,
"deletedCount": 1
}
