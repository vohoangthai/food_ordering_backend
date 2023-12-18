const Warehouse = require("../models/WarehouseModel")

const createElement = (newElement) => {
    return new Promise(async (resolve, reject) => {
        const { name, weight } = newElement

        try {
            const checkElement = await Warehouse.findOne({
                name: name
            })
            if (checkElement !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of element is already'
                })
            }
            const newElement = await Warehouse.create({
                name,  
                weight: Number(weight), 
                
            })
            if (newElement) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newElement
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateElement = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkElement = await Warehouse.findOne({
                _id: id
            })
            if (checkElement === null) {
                resolve({
                    status: 'ERR',
                    message: 'The element is not defined'
                })
            }

            const updatedElement = await Warehouse.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedElement
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteElement = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkElement = await Warehouse.findOne({
                _id: id
            })
            if (checkElement === null) {
                resolve({
                    status: 'ERR',
                    message: 'The element is not defined'
                })
            }

            await Warehouse.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete element success',
            })
        } catch (e) {
            reject(e)
        }
    })
}



const getDetailsElement = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const element = await Warehouse.findOne({
                _id: id
            })
            if (element === null) {
                resolve({
                    status: 'ERR',
                    message: 'The element is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: element
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllElement = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalElement = await Warehouse.count()
            let allElement = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Warehouse.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalElement,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalElement / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allElementSort = await Warehouse.find().limit(limit).skip(page * limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allElementSort,
                    total: totalElement,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalElement / limit)
                })
            }
            if(!limit) {
                allElement = await Warehouse.find().sort({createdAt: -1, updatedAt: -1})
            }else {
                allElement = await Warehouse.find().limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allElement,
                total: totalElement,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalElement / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createElement,
    updateElement,
    getDetailsElement,
    deleteElement,
    getAllElement,
   
}