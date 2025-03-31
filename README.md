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

# Forgot-Password

/api/api/forgot-password =>POST

payload:
{
email
}

response:
{
token generate for update password

}

/api/verify_password/:token =>POST

payload:
{
"password":"",
"confirmPassword":""
}

response:
{
password update succesfully..
}

# Product

/api/product => GET

response:
{
all products list per page vise
}

---

/api/product => POST

payload:

{
(insert feileds)
name,category,price,design,image,type,offer,brand,discount,discription,rating,tags[],

}
(new product add (create))

---

/api/product => PUT
(product update)

---

/api/product/:id => DELETE

response:

{
"acknowledged": true
(product deleted)
}

---

# Cart

/api/cart => POST

payload:

[{
productId,quantity
}]

response:
{
cart_id
}

---

/api/cart/:id => PUT

payload:
{
productId,quantity //product not yet cart then automatic add this product

}

---

/api/cart/:id => DELETE
payload:
{
"acknowledged": true,
"deletedCount": 1
}

---

# product filtering..

category[Men,Women]

/api/product?type=Men =>GET

response:
{
all men types product user can see...
}

product category check user.....

/api/product?category=T-shirt => GET

response:
{
user can get T-shirt typs product
}

# product Searching

/api/product?q=searching words => GET

response:
{
any type seraching user can match then see prodcut then
not avalible this product..
}

# product pagination

/api/product?page=1 => GET

response :
{
per page user see products...
}

# order

http://localhost:3000/api/orders/:id => POST

response:
{
return id or total amount all productss
(order done ..)
}
