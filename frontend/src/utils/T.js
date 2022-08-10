import { useRef } from "react";

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
    <div
      ref={refContainer}
      className={
        isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS
      }
      id={name}
      onClick={switchContainerClass}
    >
      <video id={`video-${name}`} autoPlay="true" controls="false" />
      <span>{name}</span>
    </div>
  );
};
export default T;

const PARTICIPANT_MAIN_CLASS = "participant main";
const PARTICIPANT_CLASS = "participant";
