import Collection from "../models/collection_schema.js"
import asyncHandler from "../service/asyncHandler.js"
import customError from "../utils/custom_error"

export const createCollection = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        throw new customError("Collection name required", 400)
    }
    const collection = await Collection.create({
        name
    })

    res.status(200).json({
        success: true,
        message: "Collection was created successfully",
        collection
    })
})

export const updateCollection = asyncHandler(async (req, res) => {
    const { name } = req.body
    const { id: collectionId } = req.params

    if (!name) {
        throw new customError("Collection name required", 400)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(collectionId, {name}, {
        new:true,
        runValidation:true
    })

    if(!updateCollection){
        throw new customError("Collection not found", 400)
    }

    res.status(200).json({
        success: true,
        message: "Collection was created successfully",
        updateCollection
    })
})

export const deleteCollection = asyncHandler(async (req, res) => {
    const { id: collectionId } = req.params

    const collectionToDelete = await Collection.findById(collectionId)
    
    if(!collectionToDelete){
        throw new customError("Collection not found", 400)
    }

    await collectionToDelete.remove()

    res.status(200).json({
        success: true,
        message: "Collection was deleted successfully",
    })
})

export const getAllCollection = asyncHandler(async (req, res) => {

    const collections = await Collection.find()
    
    if(!collections){
        throw new customError("Collection not found", 400)
    }

    res.status(200).json({
        success: true,
        collections
    })
})
