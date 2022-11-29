/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {
        const { data } = await instance.get('/getInfo', { params: { id } })
        setInfo(data.contents)
    }
    const getComments = async () => {
        const { data } = await instance.get('/getCommentsByRestaurantId', { params: { restaurantId: id } })
        setComments(data.contents)
    }
    useEffect(() => { if (Object.keys(info).length === 0) getInfo() }, [])
    
    useEffect(() => { getComments() }, [comments])

    
    let rateCnt = 0;
    comments.forEach(cmt => { rateCnt += cmt.rating })
    let rating = (comments.length) ? rateCnt / comments.length : 0
    
    
    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage