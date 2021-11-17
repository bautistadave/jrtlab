import express from 'express'
import Address from '../models/googleMaps'

const router = express.Router()

router.get('/', async (req, res) =>  {
    try {
        const address = await Address.find()
        res.json({address})
    } catch (error) {
        res.status(200).json({
            message: error
        })
    }    
    
})


router.post('/', async (req, res) => {

    const addressData = new Address({
        lat: req.body.lat,
        lng: req.body.lng,
        address: req.body.address
    })

    try {
        const addressSaved = await addressData.save()
        res.json({
            message: 'Address was saved',
            data: addressSaved
        })
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }

})

export default router