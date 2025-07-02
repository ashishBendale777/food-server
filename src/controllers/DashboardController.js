
import { Customer } from "../models/CustomerSchema.js"
import { Food } from "../models/FoodSchema.js"
import { Order } from "../models/OrderSchema.js"

let fetchCounters = async (req, res) => {

    try {
        let fooDCounter = await Food.countDocuments()
        let customerCounter = await Customer.countDocuments()
        let orderCounter = await Order.countDocuments()

        res.status(200).json({
            data: {
                fooDCounter, customerCounter, orderCounter
            },
            message: "Fetched counters successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching counters"
        })
    }
}

export { fetchCounters }