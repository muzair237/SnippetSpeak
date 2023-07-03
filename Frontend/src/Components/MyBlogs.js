import { Link } from 'react-router-dom';
import '../CSS/MyBlogs.css';
import React, { useEffect, useState } from 'react';
import Alert from './Alert';

export default function ExploreBlogs() {
    const userID = JSON.parse(localStorage.getItem("users"))._id;
    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let response = await fetch(`http://localhost:3001/getBlogByID/${userID}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
              }
        });
        response = await response.json();
        setData(response.data);
    }
    const deleteBlog = async () => {
        const blogID = (data[0]._id);
        let response = await fetch(`http://localhost:3001/deleteBlog/${blogID}`, {
            method: "DELETE",
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
              }
        });
        response = await response.json();
        setData(response.data);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
        getData();
    }
    return (
        <>
            {showAlert && <Alert msg="Blog is Deleted!" />}
            <div className="container">
                <div className="row text-center mt-4">
                    <h2 className="mainText">WELCOME TO SNIPPETSPEAK</h2>
                    <p className="mainPara">The ultimate platform for expressing your thoughts, ideas, and stories in short, captivating snippets. SnippetSpeak is designed for individuals who love to share their unique perspectives but prefer a concise and impactful format.</p>
                    <hr />
                </div>
            </div>
            <div className="container blogsList mt-4 mb-3">
                <h3>Here is a List of Your Published Blogs:</h3>
            </div>
            <div className="container blogDesign mt-4">
                <div className="row mt-2">
                    {data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="blog blog col-sm-12 mx-3 mb-4">
                                        <div className="content">
                                            <h4 className="text-center mt-2 title">{item.title}</h4>
                                            <hr />
                                            <p className="">{item.description}</p>
                                            <hr />
                                        </div>
                                        <div className="likes">
                                            <h6 className=''>No. of Likes:  {item.likes}</h6>
                                            <hr />
                                        </div>
                                        <div className="operations d-flex align-items-center">
                                            <h5 className='mt-1'>Operations:</h5>
                                            <Link to={`/updateBlog/${item._id}`}><button className='btn btn-sm btn-success mx-4'>Update</button></Link>
                                            <button onClick={deleteBlog} className='btn btn-sm btn-danger'>Delete</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                        :
                        <h4 className="notFound">No Blogs Found.</h4>
                    }
                </div>
            </div>
        </>
    );
}
