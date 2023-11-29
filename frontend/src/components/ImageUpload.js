import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData)

        axios.post('http://localhost:3001/api/add-template', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
