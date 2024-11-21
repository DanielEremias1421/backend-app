const mongoose = require('mongoose');
const opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(process.env.MONGO_URI, opts, () => console.log(`Mongo db connected !`));
