
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userSchema=Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items:
        [
            {
                productId:{type:mongoose.Types.ObjectId,ref:'Product', required:true},
                quantity:{type:Number,required:true}
            }
        ]
    }
})

userSchema.methods.addToCart = function(product){
    const cartProductIndex=this.cart.items.findIndex(prod=>{
        return prod.productId.toString()===product._id.toString();
    });
    let newQuantity =1;
    const updatedCartItem=[...this.cart.items];
    if(cartProductIndex>=0){
        newQuantity=this.cart.items[cartProductIndex].quantity+1
        updatedCartItem[cartProductIndex].quantity=newQuantity;
    }else{
        updatedCartItem.push({
            productId:product._id,
            quantity:newQuantity
        })
    }
    const updatedCart={
        items: updatedCartItem
    };
    this.cart=updatedCart;
    return this.save();
}


userSchema.methods.removeFromCart=function(prodId){
    const updatedCart=this.cart.items.filter(item=>{
        return item.productId.toString() !== prodId.toString();
    })
    this.cart.items=updatedCart;
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
};


module.exports=mongoose.model("user",userSchema);



// const getDb = require("../util/database").getDb;
// const mongoDb = require("mongodb");
// class User {
//   constructor(userName, email, cart, id) {
//     this.userName = userName;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }
//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {  
//     const cartProductIndex = this.cart.items.findIndex(p=>{
//         return p.productId==product._id;
//     });
//     let newQuantity =1;
//     const updatedCartItem=[...this.cart.items];
//     if(cartProductIndex>=0){
//         newQuantity=this.cart.items[cartProductIndex].quantity+1;
//         updatedCartItem[cartProductIndex].quantity=newQuantity;
//     }else{
//         updatedCartItem.push({ productId: new mongoDb.ObjectId(product._id), quantity: newQuantity });
//     }
//     const updatedCart = {
//       items: [updatedCartItem],
//     };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongoDb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new mongoDb.ObjectId(userId) })
//       .then((user) => {
//         // console.log(user);
//         return user;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
