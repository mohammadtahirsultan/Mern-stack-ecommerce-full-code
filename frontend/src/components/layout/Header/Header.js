import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import FaSearch from '@mui/icons-material/Search';
import FaSearch from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <ReactNavbar
      navColor1="white"
      navColor2={"hsl(219, 410%, 10%)"}
      burgerColor={"#ef4036"}
      burgerColorHover={"#ef4036"}
      logo={logo}
      logoWidth="250px"
      logoHoverColor="white"
      nav2justifyContent="space-around"
      nav3justifyContent="space-around"
      link1Text="Home"
      link2Text="About"
      link3Text="Products"
      link4Text="Contact"
      link1Url="/"
      link2Url="/about"
      link3Url="/products"
      link4Url="/contact"
      link1Color="white"
      link1Size="1.5rem"
      link1Padding="3vmax"
      searchIcon={true}
      SearchIconElement={FaSearch}
      cartIcon={true}
      CartIconElement={FaSearch}
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      profileIconSize={"2.5vmax"}
      cartIconSize={"2.5vmax"}
      searchIconSize={"2.5vmax"}
      searchIconMargin={"10"}
      cartIconMargin={"10"}
      profileIconMargin={"10"}
      searchIconUrl={"/search"}
      cartIconUrl={"/cart"}
      profileIconUrl={"/login"}
      profileIconColorHover= {"#ef4036"}
      searchIconColorHover= {"#ef4036"}
      cartIconColorHover= {"#ef4036"}
      link1ColorHover= {"#ef4036"}
      link2ColorHover= {"#ef4036"}
      link3ColorHover= {"#ef4036"}
      link4ColorHover= {"#ef4036"}
    />
  );
};

export default Header;
