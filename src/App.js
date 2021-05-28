import { Link, Route, Switch } from 'react-router-dom';
import { ProductsListView } from './views/ProductsListView';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Button,
} from 'reactstrap';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartContext } from './context/cartContext';
import { CartModal } from './components/cart/CartModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartToggle = () => {
    setCartOpen((prev) => !prev);
  };

  const toggle = () => setIsOpen(!isOpen);

  const { cart = { line_items: [] } } = useCartContext();

  const getCartCount = () => {
    if (cart?.total_items < 10) {
      return cart?.total_items;
    } else {
      return '9+';
    }
  };

  return (
    <>
      <Navbar sticky='top' color='dark' dark expand='md'>
        <NavbarBrand tag={Link} to='/'>
          My Store
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink href='/components/'>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <Button
              onClick={cartToggle}
              color='link'
              className='p-0 text-white'
            >
              <FaShoppingCart />{' '}
              {!!cart?.total_items && (
                <Badge pill color='danger'>
                  {getCartCount()}
                </Badge>
              )}
            </Button>
          </Nav>
        </Collapse>
      </Navbar>
      <Switch>
        <Route path='/' exact>
          <ProductsListView />
        </Route>
      </Switch>
      <CartModal
        isOpen={cartOpen}
        toggle={cartToggle}
        line_items={cart.line_items}
      />
    </>
  );
}

export default App;
