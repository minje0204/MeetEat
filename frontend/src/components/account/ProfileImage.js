import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

export default function ProfileImage(props) {
  const { setImage } = props;
  const [preview, setPreview] = useState(
    "/images/profile_image/default_profile.png",
  );
  const fileInput = useRef(null);

  const onChange = e => {
    if (e.target.files[0]) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        setImage(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreview(reader.result);
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        console.log("잘못된 파일 형식입니다");
      }
    }
  };
  return (
    <StyledWrapper className="form-row">
      <div className="profile-image-container">
        <div id="profile-image-area">
          <img
            id="profile-image"
            alt="profile_image"
            src={preview}
            onClick={() => {
              fileInput.current.click();
            }}
          />
        </div>
        <i
          className="fa-solid fa-circle-plus"
          onClick={() => {
            fileInput.current.click();
          }}
        ></i>

        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
   {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #profile-image-area {
    width: 160px;
    height: 160px;
    overflow: hidden;
    border-radius: 50%;
  }
  #profile-image-area:hover {
    cursor: pointer;
  }

  .profile-image-container > i {
    font-size: 2rem;
    position: absolute;
    right: 9px;
    bottom: 9px;
  }
  .profile-image-container > i:hover {
    cursor: pointer;
  }
  .profile-image-container {
    width: 160px;
    height: 160px;
    position: relative;
    margin: 1rem auto;
  }
`;
