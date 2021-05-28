import PropTypes from "prop-types";
import { ListGroupItem } from "reactstrap";

export const CartItem = ({ item }) => {
  return (
    <>
      <ListGroupItem>
        {item.name}
      </ListGroupItem>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
