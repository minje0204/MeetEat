// import { useState } from "react";
// import getItems from "utils/items";
// import styled from "styled-components";

// export default function TableItems(props) {
//   const [tableDish, setTableDish] = useState([]);

//   const tableDishHandler = item => {
//     setTableDish([...tableDish, item]);
//   };

//   const rendering = idx => {
//     const result = [];
//     if (idx === 0) {
//       for (let i = 0; i < tableItems.length; i++) {
//         if (tableItems[i].type === "silverware") {
//           result.push(
//             <span
//               key={i}
//               onClick={() => tableDishHandler(tableItems[i].name)}
//               draggable="True"
//             >
//               {tableItems[i].name}
//             </span>,
//           );
//           result.push(<br></br>);
//         }
//       }
//     } else if (idx === 1) {
//       for (let i = 0; i < tableItems.length; i++) {
//         if (tableItems[i].type === "kfood") {
//           result.push(
//             <span
//               key={i}
//               onClick={() => tableDishHandler(tableItems[i].name)}
//               draggable="True"
//             >
//               {tableItems[i].name}
//             </span>,
//           );
//           result.push(<br></br>);
//         }
//       }
//     } else if (idx === 2) {
//       for (let i = 0; i < tableItems.length; i++) {
//         if (tableItems[i].type === "jfood") {
//           result.push(
//             <span
//               key={i}
//               onClick={() => tableDishHandler(tableItems[i].name)}
//               draggable="True"
//             >
//               {tableItems[i].name}
//             </span>,
//           );
//           result.push(<br></br>);
//         }
//       }
//     } else if (idx === 3) {
//       for (let i = 0; i < tableItems.length; i++) {
//         if (tableItems[i].type === "western") {
//           result.push(
//             <span
//               key={i}
//               onClick={() => tableDishHandler(tableItems[i].name)}
//               draggable="True"
//             >
//               {tableItems[i].name}
//             </span>,
//           );
//           result.push(<br></br>);
//         }
//       }
//     }

//     return result;
//   };

//   return (
//     <div>
//       {rendering(props.tabSelect)}
//       선택된 것들 : {tableDish}
//     </div>
//   );
// }
