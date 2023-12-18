const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems,paymentMethod, time, date, status,month, note, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone,user, isPaid, paidAt,email } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    
                    },
                    {$inc: {
                        
                        selled: +order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                 else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city, phone
                    },
                    note,
                    month,
                    shippingTime:{
                         status,
                         date, time
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid, paidAt
                })
                if (createdOrder) {
                    await EmailService.sendEmailCreateOrder(email,orderItems)
                    resolve({
                        status: 'OK',
                        message: 'success'
                    })
                }
            
        } catch (e) {
        //   console.log('e', e)
            reject(e)
        }
    })
}

// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}
const getMonthRevenue = (monthre) => {
    return new Promise(async (resolve, reject) => {
        try {
            const revenue = await Order.find({
                month: monthre
            })
            if (revenue === null) {
                resolve({
                    status: 'ERR',
                    message: 'This month is not defined'
                })
            }
            var arr = []
            var count = 0
            revenue.forEach((itemorder)=>{
                var obj = {}
                var obj2 = {}
                obj.dayPrice = itemorder.totalPrice
                obj.date = itemorder.shippingTime.date
                var arritem = []
               itemorder.orderItems.forEach(
                (item)=>{
                    arritem.push({
                        name: item.name,
                        amount: item.amount
                    })
                }
                )
                obj.arriem = arritem

               count+= itemorder?.totalPrice;
                arr.push(obj)
                
            })
            var temp = {
                count: count,
                items: arr 
            }

            
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: temp
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}
const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    selled: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: +order.amount,
                        selled: -order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id
            
            if(newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id: id
            })
            if (checkOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrder
            })
        } catch (e) {
        console.log("loi o service", e)

            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find({},{orderItems:{name:1,amount:1,
                price:1,
                discount:1,
                product:1,
             },
                
                note:1,
                month:1,
                shippingTime:1,
                shippingAddress:1,
                paymentMethod:1,
                totalPrice:1,
                user:1,
                isPaid:1,
                paidAt:1,
                isDelivered:1,
                isCancel:1,
                cancelReason:1,
                deliveredAt:1                
                

             }).sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
        console.log("service ERR",e)

            reject(e)
        }
    })
}
const getAllDate = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allDate = await Order.distinct('shippingTime.date')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allDate,
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllDate,
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    getMonthRevenue,
    updateOrder
}