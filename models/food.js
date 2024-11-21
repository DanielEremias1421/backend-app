const mongoose = require('mongoose');
const schema = mongoose.Schema;
const FoodSchema = new schema({
    name: {
        type: String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    time: {
        type: String,
        default: '30 min'
    },
    ingredients: [
        {
            type: String
        }
    ],
    instruction: {
        type: String
    },
    description: {
        type: String, 
    },
    foodType: {
        type: String,
    },
    image: {
        type: String
    },
    isDeleted: { type: Boolean, default: false },
    modified_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
const foodModel = mongoose.model('Food', FoodSchema);
module.exports = foodModel; 

module.exports.getFood =    () => {
    return [
        {
            id: Date.now().toString(),
            name: 'FIT BREAKFAST',
            foodType: 'Vegan',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p6.jpeg',
            description: 'Low calorie recipe with several fruits to choose from with a medium caloric intake',
            ingredients: [
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
            ],
            instruction: [
                'Put all the ingredients in the pan',
                'Mix.',
                'Serve cold'
            ]

        },
        {
            id: Date.now().toString(),
            name: 'SNACK',
            foodType: 'Vegan',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p6.jpeg',
            description: 'Low calorie recipe with several fruits to choose from with a medium caloric intake',
            ingredients: [
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
            ],
            instruction: [
                'Put all the ingredients in the pan',
                'Mix.',
                'Serve cold'
            ]
        },
        {
            id: Date.now().toString(),
            name: 'POST WORKOUT',
            foodType: 'Vegan',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p6.jpeg',
            description: 'Low calorie recipe with several fruits to choose from with a medium caloric intake',
            ingredients: [
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
            ],
            instruction: [
                'Put all the ingredients in the pan',
                'Mix.',
                'Serve cold'
            ]
        },
        {
            id: Date.now().toString(),
            name: 'FIT DINNER',
            foodType: 'Meats',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p6.jpeg',
            description: 'Low calorie recipe with several fruits to choose from with a medium caloric intake',
            ingredients: [
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
            ],
            instruction: [
                'Put all the ingredients in the pan',
                'Mix.',
                'Serve cold'
            ]
        },
        {
            id: Date.now().toString(),
            name: 'FIT BREAKFAST',
            foodType: 'Desserts',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p6.jpeg',
            description: 'Low calorie recipe with several fruits to choose from with a medium caloric intake',
            ingredients: [
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
                'Ingredients 1',
            ],
            instruction: [
                'Put all the ingredients in the pan',
                'Mix',
                'Serve cold'
            ]
        },
    ]
}