const WarehouseService = require('../services/WarehouseService')

const createElement = async (req, res) => {
    try {
        const { name, weight} = req.body
        if (!name || !weight) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await WarehouseService.createElement(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateElement = async (req, res) => {
    try {
        const elementId = req.params.id
        const data = req.body
        if (!elementId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The elementId is required'
            })
        }
        const response = await WarehouseService.updateElement(elementId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsElement = async (req, res) => {
    try {
        const elementId = req.params.id
        if (!elementId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The elementId is required'
            })
        }
        const response = await WarehouseService.getDetailsElement(elementId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteElement = async (req, res) => {
    try {
        const elementId = req.params.id
        if (!elementId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The elementId is required'
            })
        }
        const response = await WarehouseService.deleteElement(elementId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



const getAllElement = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await WarehouseService.getAllElement(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



module.exports = {
    createElement,
    updateElement,
    getDetailsElement,
    deleteElement,
    getAllElement,
}