import { Button, Link, styled, Typography } from "@mui/material";
import React from "react";
import {
  IThemeSwitch,
  ThemeSwitch,
} from "../../_atoms/ThemeSwitch/ThemeSwitch";

type INavBar = IThemeSwitch;

const NavBar = (props: INavBar) => {
  return (
    <Wrapper>
      <Link id="link-hero-title" href="/">
        <Typography variant="h5" component="h1">
          Parakeet
        </Typography>
      </Link>
      <AsideRight>
        <ThemeSwitch {...props} />
        <Button id="button-sign-in">Sign in</Button>
        <Button variant="contained">Sign up</Button>
      </AsideRight>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled("nav")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  border: 1px solid red;

  #link-hero-title {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const AsideRight = styled("aside")`
  display: grid;
  grid-template-rows: 2.5rem;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;

  #button-sign-in {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
