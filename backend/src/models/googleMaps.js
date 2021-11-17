import mongoose from 'mongoose'

const addressSchema = mongoose.Schema({
    lat: {
      type: Number,
      required: true
    },
    lng: {
        type: Number,
        required: true, 
    },
    address: {
        type: String,
        required: true
    }
})

export default mongoose.model('Address', addressSchema)  

