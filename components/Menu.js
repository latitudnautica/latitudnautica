import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Burger from "./Burger";
import {
  RiHome2Line,
  RiSailboatLine,
  RiShoppingBasketLine,
  RiContactsLine,
  RiAdminLine
} from "react-icons/ri";

const MenuStyled = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #effffa;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

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

const MenuLogo = styled.img`
  width: 250px;
`;
const LeftMenu = ({ open, setOpen }) => {
  return (
    <MenuStyled open={open}>
      <MenuLogo src='/images/logo.png' />
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
};

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <LeftMenu open={open} setOpen={setOpen} />
    </>
  );
}
