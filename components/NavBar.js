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
    <Navbar id="Navigation" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="d-flex align-items-center">
            <Image className="navbar-logo" src="https://i.postimg.cc/Pq1HthH3/MerchCop.png" fluid />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto align-items-center">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/revenue">
              <Nav.Link>Creators</Nav.Link>
            </Link>
            <Link passHref href="/admin">
              <Nav.Link>Admin</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
          <Nav className="align-items-center">
            <Link passHref href="/cart">
              <Nav.Link className="d-flex align-items-center">
                <Image src="https://i.postimg.cc/Sxx0B81K/vecteezy-shopping-cart-creative-icon-design-31832783.png" alt="Bag Icon" fluid className="navbar-bag-icon" id="cart-icon" />
              </Nav.Link>
            </Link>
            <Button variant="danger" id="signout-nav" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
