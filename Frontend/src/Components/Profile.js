import '../CSS/Profile.css';
import user from '../Images/user.png'
import React, { useEffect, useState } from 'react'

export default function Profile() {
    const userID = JSON.parse(localStorage.getItem("users"))._id;
    const name = JSON.parse(localStorage.getItem("users")).fullname;
    const username = JSON.parse(localStorage.getItem("users")).username;
    const email = JSON.parse(localStorage.getItem("users")).email;
    const [countBlogs, setCountBlogs] = useState("");
    const [totalLikes, setTotalLikes] = useState(0);

    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        let data = await fetch(`http://localhost:3001/getBlogByID/${userID}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
              }
        })
        data = await data.json();
        setCountBlogs(data.count);

        let likesData = await fetch(`http://localhost:3001/getTotalLikes/${userID}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
              }
        });
        likesData = await likesData.json();

        let total = 0;
        likesData.forEach(blog => {
            total += blog.likes;
        });
        setTotalLikes(total);
    }
    return (
        <>
            <div className="container">
                <div className="row text-center mt-4">
                    <h2 className="mainText">WELCOME TO SNIPPETSPEAK</h2>
                    <p className="mainPara">The ultimate platform for expressing your thoughts, ideas, and stories in short, captivating snippets. SnippetSpeak is designed for individuals who love to share their unique perspectives but prefer a concise and impactful format.</p>
                    <hr />
                </div>
            </div>
            <div className="container profileText mt-4">
                <h3>Profile:</h3>
            </div>
            <div className="container mt-4">
                <div className="profile">
                    <div className="userImg">
                        <img src={user} width={"123rem"} alt="" />
                    </div>
                    <div className="profileContent">
                        <h5 className='mt-3'><u>Name:</u> {name}</h5>
                        <h5 className='mt-3'><u>Username</u>: {username}</h5>
                        <h5 className='mt-3'><u>Email:</u> {email}</h5>
                        <h5 className='mt-3'><u>No. of Blogs Published:</u> {countBlogs}</h5>
                        <h5 className='mt-3'><u>Total No. of Likes:</u> {totalLikes}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}
