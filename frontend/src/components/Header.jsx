//import "../assets/styles/index.css";
import { useNavigate } from 'react-router-dom';
import {Badge ,Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { GiTronArrow } from "react-icons/gi";


const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch ();
    const navigate = useNavigate ();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <header>
        <Navbar style={{ backgroundColor: '#22577A' }} variant="dark" expand="lg" collapseOnSelect>
            <Container>
                
                <LinkContainer to='/'> 
                    <Navbar.Brand >
                        <GiTronArrow
                            size={30}
                            style={{ cursor: "pointer" , marginLeft: "3px" , marginTop: "15px" ,color: "#CCAF31", paddingBottom:"1px"}}
                            onClick={'/HomeScreen'}
                            />
                                <span style={{ color: '#CCAF31' }}>ARROW COMPUTERS</span>
                    </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <SearchBox/>

                    <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/aboutus">
                            <Nav.Link>About Us</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/cart'>
                            <Nav.Link >
                                <FaShoppingCart/> Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                                { cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>
                                        )
                                    }
                            </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Pofile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (<LinkContainer to='/login'>
                            <Nav.Link href="/login">
                                <FaUser/> Sign In
                            </Nav.Link>
                        </LinkContainer>)}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header