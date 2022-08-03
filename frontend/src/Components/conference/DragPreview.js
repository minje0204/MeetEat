import { DragSource, DragPreviewImage } from "react-dnd";

function DraggableHouse({ connectDragSource, connectDragPreview }) {
  return (
    <>
      <DragPreviewImage src="house_dragged.png" connect={connectDragPreview} />
      <div ref={connectDragSource}>🏠</div>
    </>
  );
}
export default DragSource(
  /* ... */
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }),
);
