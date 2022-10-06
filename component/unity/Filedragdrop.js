import React, { useState } from 'react'
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

const Filedragdrop = ({toggleoff,onUpload,count,formats}) => {
  const [File,setFile] = useState('')
  const [dragging, setDragging] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const drop = React.useRef(null);
  const drag = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    onUpload(fileUploaded)
  };
  useEffect(()=> {
    if(File !== ''){
        return toggleoff()
        
        // setFile('')
    }
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('drop', handleDrop);
    drop.current.addEventListener('dragenter', handleDragEnter);
    drop.current.addEventListener('dragleave', handleDragLeave);

    return () => {
    drop.current?.removeEventListener('dragover', handleDragOver);
    drop.current?.removeEventListener('drop', handleDrop);
    drop.current?.removeEventListener('dragenter', handleDragEnter);
    drop.current?.removeEventListener('dragleave', handleDragLeave);
  };
  },[File])
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = [...e.dataTransfer.files];

    if (count && count < files.length) {
        console.log(`Only ${count} file${count === 1 ? 's' : ''} can be uploaded at a time`);
        return;
     } 
     if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
        toast.error(`Nope, only following file formats are acceptable: ${formats.join(', ')}`, 'error', 2000);
        return;
      }
     
    if (files && files) { 
    onUpload(files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target !== drag.current) {
        setDragging(true);
      }
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === drag.current) {
        setDragging(false);
      }
  };





  return (
    <>    <Toaster />
    <div className='file-drag-container'>
        <div className="filedraganddrop-area"
         ref={drop}
        >   
            <h3 style={{color:dragging ? '#000' : ''}} ref={drag}>{dragging ? 'Drop that file down below' :'Drag Files Here'}</h3>
            <p>We support 3D models, images, videos, documents, and more!</p>
            <p>or</p>
        </div>
        <button onClick={handleClick}>Select from your device</button>
        <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
             accept="image/jpeg, .gltf,
            .zip, .glb, .obj,.fbx, .dae,.gif, .shp,.shx, .dbf,
            .stl, .3ds, .igs,.iges, .stp, .blend,
            .dxf, .dwg, .tiff, .tif,.heic, .svg, application/pdf,
            application/vnd.openxmlformats-officedocument.presentationml.presentation,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.ms-powerpoint, application/vnd.ms-excel, application/msword,
            video/avi, video/mp4, video/webm, video/quicktime,
            video/x-ms-wmv, video/x-flv, video/x-matroska,
            image/tiff, image/png, model/vnd.collada+xml,
            model/spatial-fbx, model/gltf-binary,
            application/object, .mkv"
      /> 
    </div>
    </>
  )
}
Filedragdrop.propTypes = {
    onUpload: PropTypes.func.isRequired,
  };

export default Filedragdrop