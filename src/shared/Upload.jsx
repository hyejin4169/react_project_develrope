import React from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getStorage } from "firebase/storage";
import { actionCreators as imageActions } from '../redux/modules/image';
import { Text } from "../elements";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    const uploadFB = () => {
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    }

    return (
    <React.Fragment>
        <BtnStyle>
      <label htmlFor="upload_file">
        <div className="btnStart">
          <Text color="#ffffff">📷 이미지 업로드 📷</Text>
        </div>
      </label>
      <input
        type="file"
        id="upload_file"
        accept="image/jpg, image/png, image/jpeg"
        onChange={selectFile} ref={fileInput} disabled={is_uploading}
      />
        </BtnStyle>
    </React.Fragment>
    )
}

const BtnStyle = styled.div`
  margin: 0 8px 0 8px;
  img {
    max-width: 200px;
  }
  label {
    display: flex;
    margin: auto;
    justify-content: center;
    font-size: inherit;
    line-height: normal;
    vertical-align: justify;
    /* vertical-align: middle; */
    cursor: pointer;
    padding-top: 2vh;
    width: 10vw;
    height: 5vh;
    border: none;
    border-radius: 25px;
    background-color: #000000;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default Upload;