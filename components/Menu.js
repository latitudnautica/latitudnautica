import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  RiHome2Line,
  RiSailboatLine,
  RiShoppingBasketLine,
  RiContactsLine,
  RiAdminLine,
} from 'react-icons/ri';
import Burger from './Burger';

const MenuStyled = styled.nav`
  background: ${({ theme }) => theme.menu.background};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  text-align: left;
  top: 0;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 998;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    span {
      margin: 0 5px 0 0;
      font-size: 1.3rem;
    }

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

const LeftMenu = ({ open, setOpen }) => (
  <MenuStyled open={open}>
    <Link href='/'>
      <a onClick={() => setOpen(!open)}>
        <span role='img' aria-label='home'>
          <RiHome2Line />
        </span>
        Home
      </a>
    </Link>
    <Link href='/quienes_somos'>
      <a onClick={() => setOpen(!open)}>
        <span role='img' aria-label='quienes somos'>
          <RiSailboatLine />
        </span>
        Quienes Somos
      </a>
    </Link>
    <Link href='/productos'>
      <a onClick={() => setOpen(!open)}>
        <span role='img' aria-label='productos'>
          <RiShoppingBasketLine />
        </span>
        Productos
      </a>
    </Link>
    <Link href='/contacto'>
      <a onClick={() => setOpen(!open)}>
        <span role='img' aria-label='contacto'>
          <RiContactsLine />
        </span>
        Contacto
      </a>
    </Link>
    <Link href='/cms'>
      <a onClick={() => setOpen(!open)}>
        <span role='img' aria-label='panel de administración'>
          <RiAdminLine />
        </span>
        cms
      </a>
    </Link>
  </MenuStyled>
);

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <LeftMenu open={open} setOpen={setOpen} />
    </>
  );
}
