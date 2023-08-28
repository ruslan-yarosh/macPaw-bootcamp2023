import './UploadModal.scss';

import {ReactComponent as CloseIcon} from '../../assets/icons/close.svg';
import React, { useCallback, useState } from 'react';
import {  upload } from '../../api/fetch';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const UploadModal: React.FC<Props> = ({ setShowModal }) => {
  const [dragActive, setDragActive] = useState(false);
  const [transferImg, setTransferImg] = useState<File | null>(null);
  const [isError, setIsError] = useState(false);

  const inputRef = React.useRef(null);

  const handleDrag = (event: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      console.log(event.dataTransfer.files[0]);
      setTransferImg(event.dataTransfer.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setTransferImg(event.target.files[0]);
    }
  };

  const handleUpload = useCallback( async () => {
    try {
      const res = await upload('images/upload', {
        'file': transferImg,
        'sub_id': 'test'
      });

      setIsError(false);

      console.log(res);
      
    } catch (error) {
      console.log('Error', error);
      setIsError(true)
    }
  }, [transferImg]);

  console.log(transferImg);
  

  return (
    <div className="upload">
      <div className="upload__content">
        <div className="upload__close">
          <button 
            type="button" 
            className="upload__icon" 
            onClick={() => setShowModal(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <h3 className="upload__title">
          Upload a .jpg or .png Cat Image
        </h3>

        <p className="upload__info">
          {`Any uploads must comply with the `}
          <a 
            href="https://thecatapi.com/privacy" 
            target="_blank" 
            className="upload__link"
          >
            upload guidelines
          </a>
          {` or face deletion`}
        </p>

        <form 
          className="upload__form" 
          onDragEnter={handleDrag} 
          onSubmit={(e) => e.preventDefault()
        }>
          <input 
            ref={inputRef} 
            type="file" 
            className="upload__input" 
            id="upload__input" 
            onChange={handleChange} 
          />

          <label 
            htmlFor="upload__input" 
            className="upload__label"
          >
            {!transferImg && (
              <div>
                <span className="upload__tip">{`Drag here `}</span> 
                your file or
                <span className="upload__tip">{` Click here `}</span>
                to upload
              </div>
            )}
          </label>

          {transferImg && (
            <>
              <img src={URL.createObjectURL(transferImg)} className="upload__img" alt="" />

              <div className="upload__bottom">
                <span className="upload__img-name">Image File Name: {transferImg.name}</span>

                {!isError && (
                  <button
                   type="button" 
                   className="upload__btn" 
                   onClick={() => handleUpload()}
                  >
                    Upload photo
                  </button>
                )}
              </div>
            </>
          )}

          {isError && (
            <p className="upload__error">
              No Cat found - try a different one
            </p>
          )}


          {dragActive && (
            <div 
              className="upload__drag" 
              onDragEnter={handleDrag} 
              onDragLeave={handleDrag} 
              onDragOver={handleDrag} 
              onDrop={handleDrop}
            />
          ) }
        </form>
      </div>
    </div>
  )
}