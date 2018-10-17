import React from 'react';
import styled from 'styled-components';

const NavItem = styled.li`
  display: block;
  margin: 0;
  padding: 0;
  border: 0px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #aaa2aa !important;
  font-family: 'Montserrat', sans-serif;
`;

const Link = styled.a`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0px !important;
  text-decoration: none !important;
  &:hover {
    background-color: #00485e !important;
    cursor: pointer;
  }
`;

const NavIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: ${props => `url(${props.mainImage})`};
  background-repeat: no-repeat;
  background-size: 25px;
  background-position: center;
  &.active {
    background-image: ${props => `url(${props.activeImage})`};
  }
`;

const Title = styled.span`
  display: block;
  text-align: center;
  margin-top: 5px;
  box-sizing: border-box;
  color: #b4bcc8;
  font-size: 13px;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
`;

const SubHeader = styled.ul`
  display: block;
  overflow: hidden;
  max-height: 0;
  height: auto;
  transition: max-height 500ms ease;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  ${NavItem}:hover & {
    max-height: 250px;
    transition: max-height 700ms ease;
  }
`;

const SubMenuItem = styled.a`
  color: #b4bcc8;
  text-decoration: none;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0px !important;
  text-decoration: none !important;
`;

export const SideBarItem = ({
  mainImage,
  activeImage,
  isActive,
  title,
  link,
  subItems
}) => (
  <NavItem>
    <Link>
      <NavIcon
        className={isActive ? 'active' : 'deactive'}
        mainImage={mainImage}
        activeImage={activeImage}
      />
      <Title>{title}</Title>
    </Link>
    {subItems && (
      <SubHeader>
        {subItems.map((item, idx) => (
          <SubMenuItem key={`sub_item_${idx}`}>{item.title}</SubMenuItem>
        ))}
      </SubHeader>
    )}
  </NavItem>
);
