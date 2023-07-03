import '../CSS/CreateBlog.css';
import React, { useState } from 'react';
import warning from '../Images/warning.png';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
    const authorID = JSON.parse(localStorage.getItem("users"))._id;
    const authorName = JSON.parse(localStorage.getItem("users")).fullname;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleCharacters, setTitleCharacters] = useState(0);
    const [descCharacters, setDescCharacters] = useState(0);
    const [titleError, setTitleError] = useState("");
    const [descError, setDescError] = useState("");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const collectData = async (e) => {
        e.preventDefault();
        if (!title || !description || title.length > 50 || description.length > 325) {
            setError("Enter Correct Parameters.");
            return;
        }
        else {
            let likes = 0;
            let response = await fetch('http://localhost:3001/createBlog', {
                method: "POST",
                body: JSON.stringify({ title, description, likes, authorID, authorName }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
                }
            });
            response = await response.json();
            if (response.data) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate("/")
                }, 1500);
            } else {
                setError(response.errors);
            }
        }
    };

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
            {showAlert && <Alert msg="Blog is Published!" />}
            <div className="container mt-4">
                <div className="row">
                    <h1>Publish a Blog</h1>
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
                            <button type="submit" onClick={collectData} className="btn btn-dark mt-2 mb-1">Publish</button>
                            {error && <span><img src={warning} alt="" />{error}</span>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
