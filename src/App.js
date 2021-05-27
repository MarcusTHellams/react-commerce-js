import { Link, Route, Switch } from "react-router-dom";
import { ProductsListView } from "./views/ProductsListView";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Badge,
} from "reactstrap";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "./context/cartContext";
import { Fragment } from "react";
import { CartItem } from "./components/cart/CartItem";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { cart = { line_items: [] } } = useCartContext();
  console.log("cart: ", cart);

  const getCartCount = () => {
    if (cart?.total_items < 10) {
      return cart?.total_items;
    } else {
      return "9+";
    }
  };

  return (
    <>
      <Navbar sticky="top" color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          My Store
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <NavbarText className="text-white position-relative">
                  <FaShoppingCart />{" "}
                  <Badge pill color="danger" className="position-absolute">
                    {getCartCount()}
                  </Badge>
                </NavbarText>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Your Shopping Cart</DropdownItem>
                {cart?.line_items.map((item) => {
                  console.log('item: ', item);
                  return (
                    <Fragment key={item?.id}>
                      <CartItem {...{ item }} />
                    </Fragment>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <Switch>
        <Route path="/" exact>
          <ProductsListView />
        </Route>
      </Switch>
    </>
  );
}

export default App;
