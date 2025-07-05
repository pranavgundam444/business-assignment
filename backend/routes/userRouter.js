const express = require('express')
const mongoose = require("mongoose")

const router = express.Router()

const headlinePool = [
    "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
    "Discover the magic of Cake & Co in the Heart of Mumbai",
    "Your Go-To Bakery in Mumbai - Cake & Co's Rising Fame",
    "Mumbai Loves Cake & Co - Here's why you will too!"
]

router.post('/business-data', (req, res) => {
    const {name, location} = req.body
    if (!name || !location) {
        return res.status(400).json({error: "Name and location are required"});
    }

    const randomHeadline = headlinePool[Math.floor(Math.random() * headlinePool.length)]

    res.json({
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 300 + 20),
        headline: randomHeadline.replace("Cake & Co", name).replace("Mumbai", location)
    })
})


router.get('/regenerate-headline', (req, res) => {
    const {name, location} = req.query

    if (!name || !location) {
        return res.status(400).json({error: "Name and location are required"});
    }

    const randomHeadline = headlinePool[Math.floor(Math.random() * headlinePool.length)]

    res.json({
        headline: randomHeadline.replace("Cake & Co", name).replace("Mumbai", location)
    })
})

module.exports = router;