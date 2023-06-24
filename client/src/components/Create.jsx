import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Create = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const uploadImage = async () => {
    try { 
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await uploadImage();
    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title,
        img: file ? imgUrl: '',
        description: value,
        cat,
      }) : await axios.post(`/posts/`, {
        title,
        img: file ? imgUrl: '',
        description: value,
        cat,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  return (
    <>
      <div className="create-blog">
        <main>
          <div className="content">
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="uploadImage">
              <label htmlFor="file">Upload Image</label>
              <input type="file" name="img" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="editContainer">
              <ReactQuill className="editor" theme='snow' value={value} onChange={setValue} />
            </div>
          </div>
          <div className="menu">
            <div className="item i-2">
              <h2>Category</h2>
              <div className="category">
                <input type="radio" name="cat" value="sports" id="sports" checked={cat === 'sports'} onChange={(e) => setCat(e.target.value)} />
                <label htmlFor="sports">Sports</label>
              </div>
              <div className="category">
                <input type="radio" name="cat" value="politics" id="politics" checked={cat === 'politics'} onChange={(e) => setCat(e.target.value)} />
                <label htmlFor="politics">Politics</label>
              </div>
              <div className="category">
                <input type="radio" name="cat" value="science" id="science" checked={cat === 'science'} onChange={(e) => setCat(e.target.value)} />
                <label htmlFor="science">Science</label>
              </div>
              <div className="category">
                <input type="radio" name="cat" value="business" id="business" checked={cat === 'business'} onChange={(e) => setCat(e.target.value)} />
                <label htmlFor="business">Business</label>
              </div>
              <div className="category">
                <input type="radio" name="cat" value="cinema" id="cinema" checked={cat === 'cinema'} onChange={(e) => setCat(e.target.value)} />
                <label htmlFor="cinema">Cinema</label>
              </div>
            </div>
            <div className="item">
              <h2>Publish</h2>
              <span><b>Status: </b>Draft</span>
              <span><b>Visibility: </b>Public</span>
              <div className="buttons">
                <button>Save as Draft</button>
                {state ? <button onClick={handleSubmit}>Update</button> : <button onClick={handleSubmit}>Publish</button>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Create;