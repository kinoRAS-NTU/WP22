// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/

    Comment.find({ restaurantId: id }).exec((err, data) => {
        if (!err) res.status(200).send({ message: 'success', contents: data })
        else      res.status(403).send({ message: 'error', contents: [] })
    })
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    /****************************************/
    console.log(body)
    // const { restaurantId, rating, name, content } = body
    const comment = new Comment(body)
    try {
        await comment.save()
    } catch (e) {
        throw new Error("Message DB save error: " + e)
    }
    // TODO Part III-3-b: create a new comment to a restaurant
}
