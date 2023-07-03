import '../CSS/CreateBlog.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import warning from '../Images/warning.png';
import Alert from './Alert';

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleCharacters, setTitleCharacters] = useState(0);
    const [descCharacters, setDescCharacters] = useState(0);
    const [titleError, setTitleError] = useState("");
    const [descError, setDescError] = useState("");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let response = await fetch(`http://localhost:3001/getDataforUpdation/${params.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setTitle(response.title);
        setDescription(response.description);
        setTitleCharacters(response.title.length);
        setDescCharacters(response.description.length);
    };
    const updateData = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://localhost:3001/updateBlog/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        });
        response = await response.json();
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate("/")
        }, 1500);
    }

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setError("");
        if (value.length > 50) {
            setTitleError("Maximum 50 Characters are Allowed in Title!");
        } else {
            setTitle(value);
            setTitleCharacters(value.length);
            setTitleError("");
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setError("");
        if (value.length > 325) {
            setDescError("Maximum 325 Characters are Allowed in Description!");
        } else {
            setDescription(value);
            setDescCharacters(value.length);
            setDescError("");
        }
    };

    return (
        <>
            {showAlert && <Alert msg="Blog is Updated!" />}
            <div className="container mt-4">
                <div className="row">
                    <h1>Update Blog</h1>
                    <p className="text-muted">Share your thoughts and ideas with the world by creating and publishing engaging blog posts. Write about your passions, expertise, or experiences, and let your voice be heard through compelling content.</p>
                </div>
                <div className="row form mt-3">
                    <div className="col-12">
                        <form>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Title:</label>
                                <input type="text" value={title} onChange={handleTitleChange} className="form-control" />
                                <span className="character-count mx-2">Characters: {titleCharacters}/50</span>
                                {titleError && <span><img src={warning} alt="" />{titleError}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    rows={5}
                                    className="form-control"
                                />
                                <span className="character-count mx-2">Characters: {descCharacters}/325</span>
                                {descError && <span><img src={warning} alt="" />{descError}</span>}
                            </div>
                            <button type="submit" onClick={updateData} className="btn btn-dark mt-2 mb-1">Update</button>
                            {error && <span><img src={warning} alt="" />{error}</span>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
