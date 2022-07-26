import store from "app/store";

export default function ItemsOnTable() {
  const myMenu = store.getState().tableList;

  const menuRender = myMenu.map((menu, index) => (
    <div key={`tableitem-${index}`}>{menu.details} </div>
  ));

  return <div>{[...menuRender]}</div>;
}
