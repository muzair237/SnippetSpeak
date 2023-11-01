import { useDispatch, useSelector } from 'react-redux';
import '../CSS/ExploreBlogs.css';
import like from '../Images/like.png'
import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../slices/Blogs/thunk';

export default function ExploreBlogs() {
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  let data = useSelector((state)=> state?.Blogs?.blogs)
  console.log(data?.data);
  useEffect(() => {
    // dispatch(getAllBlogs());
    dispatch(getAllBlogs());
  }, []);

  // const getData = async () => {
  //   let response = await fetch('http://localhost:3001/getBlog', {
  //     headers: {
  //       authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
  //     }
  //   });
  //   response = await response.json();
  //   setData(response);
  // };
  
  const collectData = async (author, id) => {
    if (likedBlogs.includes(author)) {
      let response = await fetch(`http://localhost:3001/decLikes/${id}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
        }
      });
      response = await response.json();
      likedBlogs.splice(likedBlogs.indexOf(author), 1);
      dispatch(getAllBlogs());
      return;
    } else {
      let response = await fetch(`http://localhost:3001/updateLikes/${id}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
        }
      });
      response = await response.json();
      setLikedBlogs([...likedBlogs, author]);
      dispatch(getAllBlogs());
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let data = await fetch(`http://localhost:3001/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
        }
      });
      data = await data.json();
      if (data) {
        // setData(data);
      }
    } else {
      dispatch(getAllBlogs());
    }
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
      <div className="container blogsList mt-4 mb-3">
        <h3>Here is a List of Blogs You Can Explore:</h3>
      </div>
      <div className="container mt-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"><strong>Search in Blogs:</strong></label>
          <input type="email" onChange={searchHandle} className="form-control" placeholder='Search' />
        </div>
      </div>
      <div className="container blogDesign mt-4">
        <div className="row mt-2">
          {data?.data?.length > 0 ?
            data?.data?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="blog col-sm-12 mx-3 mb-4">
                    <div className="content">
                      <h4 className="text-center mt-2 title">{item.title}</h4>
                      <hr />
                      <p className="">{item.description}</p>
                      <hr />
                    </div>
                    <div className="likes">
                      <button onClick={() => {
                        collectData(item.author, item._id)
                      }} className='btn btn-sm btn-success mx-1'>Like <img src={like} width={"18rem"} alt="" /></button>
                      <h6 className=''>No. of Likes:  {item.likes}</h6>
                      <hr />
                    </div>
                    <div className="identification">
                      <h5 className="mt-2 mx-1">
                        <strong>Posted By:</strong> {item.authorName}
                      </h5>
                    </div>

                  </div>
                </React.Fragment>
              );
            })
            :
            <h4 className="notFound">No Data Found.</h4>
          }
        </div>
      </div>
    </>
  );
}
