import { useRef } from "react";
import styled from "styled-components";

const T = props => {
  const { name } = props;
  const refContainer = useRef(null);

  function isPresentMainParticipant() {
    return document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length != 0;
  }

  const switchContainerClass = () => {
    if (refContainer.current.className === PARTICIPANT_CLASS) {
      let elements = Array.prototype.slice.call(
        document.getElementsByClassName(PARTICIPANT_MAIN_CLASS),
      );
      elements.forEach(function (item) {
        item.className = PARTICIPANT_CLASS;
      });
      refContainer.current.className = PARTICIPANT_MAIN_CLASS;
    } else {
      refContainer.current.className = PARTICIPANT_CLASS;
    }
  };

  return (
    <StyledWrapper>
      <div
        ref={refContainer}
        className={
          isPresentMainParticipant()
            ? PARTICIPANT_CLASS
            : PARTICIPANT_MAIN_CLASS
        }
        id={name}
        onClick={switchContainerClass}
      >
        <video
          controlsList="Fullscreen toggle"
          className="cam-box"
          id={`video-${name}`}
          autoPlay="true"
          controls="false"
        />
        <span>{name}</span>
      </div>
    </StyledWrapper>
  );
};
export default T;

const PARTICIPANT_MAIN_CLASS = "participant main";
const PARTICIPANT_CLASS = "participant";

const StyledWrapper = styled.div`
  .cam-box {
    width: 100%;
  }
`;
