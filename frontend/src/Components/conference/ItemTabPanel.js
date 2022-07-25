import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getItems from "utils/items";

const ItemTabPanel = props => {
  // const { index, isActive, ...other } = props;

  // return (
  //   <div
  //     role="tabpanel"
  //     hidden={!isActive}
  //     id={`simple-tabpanel-${index}`}
  //     aria-labelledby={`simple-tab-${index}`}
  //     {...other}
  //   >
  //     {isActive && (
  //       <Box sx={{ p: 3 }}>
  //         {getItems(index).map(item => (
  //           <Typography key={item.name}>{item.name}</Typography>
  //         ))}
  //       </Box>
  //     )}
  //   </div>
  // );

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
export default ItemTabPanel;
