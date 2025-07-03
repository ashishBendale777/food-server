import { Food } from "../models/FoodSchema.js"
import { Review } from "../models/ReviewSchema.js"

let createFood = async (req, res) => {
    let reqData = req.body
    try {
        let filePath = req.file ? req.file.path : null
        let result = await Food.create({ ...reqData, image: filePath })
        res.status(200).json({
            data: result,
            message: "Food Added Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let fetchFood = async (req, res) => {
    try {
        let result = await Food.find()
        res.status(200).json({
            data: result,
            message: "Fetched.."
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let deleteFood = async (req, res) => {
    try {
        let { foodId } = req.body
        let result = await Food.findByIdAndDelete({ _id: foodId })
        res.status(200).json({
            message: "Food Item Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let updateFood = async (req, res) => {
    let { foodId, price } = req.body
    let result = await Food.findByIdAndUpdate(
        { _id: foodId },
        { price: price },
        { new: true }
    )
    try {
        res.status(200).json({
            data: result,
            message: "Food price Updated"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const fetchDishesWithAvgRatings = async (req, res) => {
    try {

        //const populatedReviews= await Dish.populate(AverageRating,{path:'_id'})

        const populatedDishes = await Food.aggregate([
            {
                $lookup: {
                    from: 'reviews', // Join with the Reviews collection
                    localField: '_id', // Match DishId (from Dishes collection)
                    foreignField: 'food', // Match DishId (from Reviews collection)
                    as: 'reviews' // The alias for the populated data
                }
            },

            {
                $addFields: {
                    averageratings: {
                        $cond: {
                            if: { $gt: [{ $size: "$reviews" }, 0] }, // If there are reviews
                            then: { $avg: "$reviews.rating" }, // Calculate average rating
                            else: 0 // Else set average rating to 0
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    DishName: 1, // Include other fields from the Dishes collection (e.g., name)
                    Price: 1,
                    DishType: 1,
                    Category: 1,
                    Image: 1,
                    ImageId: 1,
                    IsAvailable: 1,
                    averageratings: 1
                }
            }
        ]);

        res.status(200).json({ data: populatedDishes })
    } catch (error) {
        res.status(200).json(error)
    }
}
export { createFood, fetchDishesWithAvgRatings, fetchFood, deleteFood, updateFood }