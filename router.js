const router=require('express').Router();
const con=require('./controller/user_controller');
//const id=require('./controller/C_category_id_generator');
//const key=require('./controller/C_keyword_id_generator');
const product=require('./controller/product_controller');
const v= require('./vairant_id');
const specification=require('./controller/productspecification_controller')
const address=require('./controller/address_controller')
const cart=require('./controller/cart_controller')
const cartitem=require('./controller/cartitems_controller')
const order=require('./controller/order_controller')
const orderitem=require('./controller/orderitem_controller')
const payment=require('./controller/payment_controller')
const role=require('./controller/role_controller')
const review=require('./controller/review_controller')
const combo=require('./controller/productandspecification_controller')
const search=require('./controller/search_controller')

//USER
router.post('/login',con.logincheck)
router.post('/signup',con.signup)
router.post('/forgetpassword',con.forgetpassword)
router.post('/update_user_profile',con.update_user_profile)
router.post('/deleteuser',con.deleteuser)
//router.post('/generateid',key.insertKeyword)
//PRODUCT
router.post('/addproduct',product.addproduct)
router.post('/updateproduct',product.updateproduct)   
router.post('/deleteproduct',product.deleteproduct) 
router.post('/populate',product.populate)       
// VARIANT
router.get('/variant',v.variantid)
//PRODUCT SPECIFICATION 
router.post('/addproductspecification',specification.addspecification)
router.post('/updateproductspecification',specification.updatespecification)
router.post('/deleteprodutspecification',specification.deletespecification)
//ADDRESS
router.post('/createaddress',address.createaddress)
router.post('/updateaddress',address.updateaddress)
router.post('/deleteaddress',address.deleteaddress)
//CART
router.post('/createcart',cart.createcart)
router.post('/updatecart',cart.updatecart)
router.post('/deletecart',cart.deletecart)
//CART ITEMS
router.post('/createcartitems',cartitem.createcartitems)
router.post('/updatecartitems',cartitem.updatecartitems)
router.post('/deletecartitems',cartitem.deletecartitems)
//ORDER
router.post('/addorder',order.addorder)
router.post('/updateorder',order.updateorder)
router.post('/deleteorder',order.deleteorder)
//ORDER ITEMS
router.post('/addorderitems',orderitem.addorderitems)
router.post('/updateorderitems',orderitem.updateorderitems)
router.post('/deleteorderitems',orderitem.deleteorderitems)
//PAYMENT
router.post('/addpayment',payment.addpayment)
router.post('/updatepayment',payment.updatepayment)
router.post('/deletepayment',payment.deletepayment)
//ROLE
router.post('/addrole',role.addrole)
router.post('/updaterole',role.updaterole)
router.post('/deleterole',role.deleterole)
//REVIEW
router.post('/addreview',review.addreview)
router.post('/updatereview',review.updatereview)
router.post('/deletereview',review.deletereview)

//HYBRID
router.post('/addproductandspecification',combo.addproduct)
router.post('/deleteproductandspecification',combo.deleteproduct)

//SEARCH
router.post('/search',search.search)


module.exports=router;
