'use client';

import {useRef} from 'react'
import {useState} from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'


// label은 안에 들어갈 텍스트이고 name은 label에 붙이는 이름 (input id,name과 동일하게 설정하여 UX개선)
export default function ImagePicker({label, name}) {
    const imageInput = useRef();
    const [pickedImage, setPickedImage] = useState();

    function handlePickImage() {
        imageInput.current.click();
    }
    function handleImageChange(event) {
        const file = event.target.files[0]; // 첫번째 이미지 파일
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        
        // 파일 읽은 후 onload 호출 시 pickedImage에 result를 저장
        fileReader.onload = () => {
            setPickedImage(fileReader.result); // 선택된 이미지
        }

        fileReader.readAsDataURL(file);
    }
    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image</p>}
                {pickedImage && <Image src={pickedImage} alt = "selected image" fill></Image>}
            </div>
            <input 
            className={classes.input}
            type="file" 
            id={name} 
            accept="image/png, image/jpeg" 
            name={name}
            ref={imageInput}
            onChange={handleImageChange} // 해당 컴포넌트로 event 인자 직접 전당 (props아님)
            >
            </input>
        </div>
        <button type='button' className={classes.button} onClick={handlePickImage}>
            Pick An Image!
        </button>
    </div>
}