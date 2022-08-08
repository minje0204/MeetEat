import styled from "styled-components";
import ModalFriends from "components/friends/ModalFriends";
import LoginModal from "components/account/LoginModal";
import ProfileIcon from "components/account/ProfileIcon";

export default function Menu() {
  return (
    <StyledWrapper>
      <ModalFriends />
      <LoginModal />
      <ProfileIcon />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  
  a {
    text-decoration: none;
  }
  button {
    font-family: "Jua";
    font-size: 24px;
    color: black;
    padding: 0em 0.5em;
    border-width: 1px;
    border-color: #e2dcc8;
    margin: 0px 4px;
    background-color: #FFEF82;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    transition: top 0.01s linear;
  }
  button:hover {
    background-color: #EFD345;
  }

`;
