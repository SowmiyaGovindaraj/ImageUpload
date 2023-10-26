import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ImageUploadCom.css';


function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef(null);

  // Upload Image button click actions goes here
  const handleImageUpload = () => {
    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            
          try {
            const dataUrl = reader.result;
            // To upload the selected image in the server http://localhost:3001/isthisacat.
            await axios.post('http://localhost:3001/isthisacat', {
              image: dataUrl
            });
            setResult('Image uploaded successfully');
            setShowAlert(true);
            setFile(null);
            fileInputRef.current.value = '';
          } catch (error) {
            setResult('Upload Failed');
          }
        };
        reader.readAsDataURL(file);
    }
  };

  // When uploading image taking the value from e.target from input file and setting it to the state varaible
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const closePopup = () => {
    setShowAlert(false);
  };

  return (
    <div className='main-container'>
      <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange}
        ref={fileInputRef}
      />
      <button className='buttonStyle'  disabled={!file || showAlert} onClick={handleImageUpload}>Upload Image</button>
      {showAlert && (
        <div className="popup">
          <div className="popup-content">
            <p>{result}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
