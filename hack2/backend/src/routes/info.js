// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/
    console.log(req.query)
    const sortObj = (sortBy === 'distance') ? { distance: 1 } : { price: 1 }
    Info.find()
    .sort(sortObj)
    .exec((err, data) => {
        if (!err) res.status(200).send({ message: 'success', contents: data })
        else      res.status(403).send({ message: 'error', contents: [] })
    })
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    Info.find({ id }).exec((err, data) => {
        if (!err) res.status(200).send({ message: 'success', contents: data[0] })
        else      res.status(403).send({ message: 'error', contents: [] })
    })


    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}