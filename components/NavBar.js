/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar id="Navigation" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="d-flex align-items-center">
            <Image className="navbar-logo" src="https://i.ibb.co/Cwgk06t/Bleebos-Bistro-Nav.png" fluid />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto align-items-center">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/items">
              <Nav.Link>Yums</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>Revenue</Nav.Link>
            </Link>
            <Link passHref href="/order/new">
              <Nav.Link>New Order</Nav.Link>
            </Link>
          </Nav>
          <Nav className="align-items-center">
            <Link passHref href="/orders">
              <Nav.Link className="d-flex align-items-center">
                <Image src="https://i.ibb.co/BfgBF1d/vecteezy-shopping-cart-creative-icon-design-31832783.png" alt="Bag Icon" fluid className="navbar-bag-icon" id="cart-icon" />
              </Nav.Link>
            </Link>
            <Button variant="success" id="signout-nav" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
