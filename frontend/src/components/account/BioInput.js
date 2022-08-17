import { CheckLength } from "utils/filters/CheckLength";
import { TextField } from "@mui/material";

export default function BioInput(props) {
  const { bio, setBio } = props;
  return (
    <TextField
      onChange={e => setBio(e.target.value)}
      onInput={e => CheckLength(e, 40)}
      fullWidth
      id="fullWidth"
      defaultValue={bio}
      placeholder="자기소개를 입력해주세요."
    />
  );
}
