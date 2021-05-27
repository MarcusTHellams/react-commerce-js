import PropTypes from "prop-types";
import { DropdownItem, Media } from "reactstrap";

export const CartItem = ({ item }) => {
  return (
    <>
      <DropdownItem toggle={false}>
        <Media>
          <Media left href="#">
            <Media
                style={{height: 'auto', width:'20%'}}
              object
              src={item?.media?.source}
              alt="Generic placeholder image"
            />
          </Media>
          <Media body>
            <Media heading>Media heading</Media>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          </Media>
        </Media>
      </DropdownItem>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
