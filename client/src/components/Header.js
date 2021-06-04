import React from 'react';
import logo from "../Assets/logo.png";
import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../actions/userAction';


const Header = ()=>{
  const dispatch = useDispatch();
  const userLogin = useSelector(state=>state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler =()=>{
    dispatch(logout());
  }
  return (
  <header>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Link to="/">
   <Navbar.Brand><img src={logo} width="15%" alt="logo"/> ONLINE STORE</Navbar.Brand>
   </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
    <LinkContainer to="/cart">
      <Nav.Link><i className='fas fa-cart-plus mr-2'></i>CART </Nav.Link>
      </LinkContainer>
      {userInfo?<NavDropdown title={userInfo.name} id='username'>
        <LinkContainer to='/profile'>
          <NavDropdown.Item>
            Profile
          </NavDropdown.Item>
          </LinkContainer>
          
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>:<LinkContainer to="/login">
      <Nav.Link><i className='fas fa-user mr-2'></i>SIGN IN </Nav.Link>
      </LinkContainer>}
      
</Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  );
}

export default Header;
