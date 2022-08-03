import SignupForm from "components/account/SignupForm";
import styled from "styled-components";
export default function SignupPage() {
  return (
    <StyledWrapper>
      <SignupForm></SignupForm>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
   {
    display: flex;
    justify-content: center;
  }
`;
