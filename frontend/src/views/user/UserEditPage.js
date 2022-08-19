import EditForm from "components/account/EditForm";
import Header from "components/common/nav/Header";
import styled from "styled-components"

export default function UserEditPage() {
  return (
    <StyledWrapper>
      <Header />
      <EditForm></EditForm>;
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: #faf0d7;
  height: 100vh;
`;