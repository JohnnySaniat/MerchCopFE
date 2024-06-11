/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="navbar bg-base-100" data-theme="dracula" id="Navigation">
      <div className="flex-1">
        <Link href="/" passHref>
          <a className="text-xl">
            <img src="https://i.ibb.co/9p2jyWg/MerchCop.png" alt="MerchCop Logo" className="navbar-logo" />
          </a>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} aria-label="Cart" role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item" />
            </div>
          </div>
          <div className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <div className="card-actions">
                <Link href="/cart" passHref>
                  <a className="btn btn-warning btn-block">View cart</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user && user.image && (
              <div className="w-10 rounded-full">
                <img src={user.image} alt="User Avatar" />
              </div>
            )}
          </div>
          <ul className="menu menu-compact dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/" passHref>
                <a>Current Drop</a>
              </Link>
            </li>
            <li>
              <Link href="/collaborators" passHref>
                <a>Collabs</a>
              </Link>
            </li>
            {user && user.isAdmin && (
            <li>
              <Link href="/product/new" passHref>
                <a>Product Registry</a>
              </Link>
            </li>
            )}
            {user && user.isAdmin && (
              <li>
                <Link href="/admin" passHref>
                  <a>Admin</a>
                </Link>
              </li>
            )}
            <li>
              <Link href="/profile" passHref>
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <a href="#" onClick={handleSignOut}>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
