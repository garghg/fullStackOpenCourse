const mongoose = require('mongoose')

const connectToDatabase = async (uri) => {
    console.log('connecting to database:', uri)

    try {
        await mongoose.connect(uri)
        console.log('connection successful')
    } catch (error) {
        console.log('connection failed')
        process.exit(1)
    }
}

module.exports = connectToDatabase