import styled from "@emotion/styled";

export default function TableArea () {

  return (
    <div>
      <Table className="dropzone"></Table>
    </div>
  )
};

const Table=styled.div`
  width: 700px;
  height: 400px;
  background: #999900;
`