import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getItems from "utils/items";

const ItemTabPanel = props => {
  const { index, isActive, ...other } = props;

  const handleClick = item => {
    console.log(`${item.name} is clicked!!`);
  };

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isActive && (
        <Box sx={{ p: 3 }}>
          {getItems(index).map(item => (
            <Typography onClick={e => handleClick(item)} key={item.name}>
              {item.name}
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};
export default ItemTabPanel;
