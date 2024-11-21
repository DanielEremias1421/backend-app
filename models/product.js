const mongoose = require('mongoose');


const schema = mongoose.Schema;

const productSchema = new schema({
    
    name: {
        type: String
    },
    image: {
        type: String
    },

    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },

    price: {
        type: String
    },

    type: {
        type: String,
        default: 'Top Sales'
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
const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel; 


module.exports.getProducts = () => {
    return [
        {
            id: Date.now().toString(),
            name: 'ISOTonic',
            price: '$24.00',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p1.jpg',
            shortDescription: '',
            longDescription: '',
            type: 'Top Sales'

        },
        {
            id: Date.now().toString(),
            name: 'JFWatch',
            price: '$24.00',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p2.jpg',
            shortDescription: '',
            longDescription: '',
            type: 'Top Sales'

        },
        {
            id: Date.now().toString(),
            name: 'Weight Bench',
            price: '$24.00',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p3.jpeg',
            shortDescription: '',
            longDescription: '',
            type: 'Top Sales'

        },
        {
            id: Date.now().toString(),
            name: 'JFPRO Headphone',
            price: '$24.00',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p4.jpeg',
            shortDescription: '',
            longDescription: '',
            type: 'Supplementation'

        },
        {
            id: Date.now().toString(),
            name: 'Breakfast',
            price: '$24.00',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p5.jpg',
            shortDescription: '',
            longDescription: '',
            type: 'Supplementation'

        },
        {
            id: Date.now().toString(),
            name: 'Veg Diet',
            price: '$24.00',
            image: 'https://storage.googleapis.com/bucket_jf_pro/p6.jpeg',
            shortDescription: '',
            longDescription: '',
            type: 'Supplementation'

        },
    ]
}