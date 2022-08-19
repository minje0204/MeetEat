import styled from "styled-components";
import SignupForm from "components/account/SignupForm";
import Header from "components/common/nav/Header";

export default function SignUpPage() {
  return (
    <StyledWrapper>
      <Header />
      <SignupForm></SignupForm>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div``;
