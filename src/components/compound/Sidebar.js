import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { reduce, findIndex } from 'lodash';
import { withRouter } from 'react-router-dom';

import { SideBarWrapper, SideBarItem } from '../basic/Navigation';

import DashboardActiveIcon from '../../resources/home_active.svg';
import DashboardIcon from '../../resources/home.svg';

import OrdersActiveIcon from '../../resources/shopping_cart_active.svg';
import OrdersIcon from '../../resources/shopping_cart.svg';

import CalendarActiveIcon from '../../resources/calendar_active.svg';
import CalendarIcon from '../../resources/calendar.svg';

import ProviderActiveIcon from '../../resources/provider_icon_active.svg';
import ProviderIcon from '../../resources/provider_icon.svg';

import MessageActiveIcon from '../../resources/read_message_active.svg';
import MessageIcon from '../../resources/read_message.svg';

import AnalyticsActiveIcon from '../../resources/bar_chart_active.svg';
import AnalyticsIcon from '../../resources/bar_chart.svg';

import ServicesActiveIcon from '../../resources/maintenance_active.svg';
import ServicesIcon from '../../resources/maintenance.svg';

import TeamActiveIcon from '../../resources/customer_support_active.svg';
import TeamIcon from '../../resources/customer_support.svg';

import CustomersActiveIcon from '../../resources/conference_call_active.svg';
import CustomersIcon from '../../resources/conference_call.svg';



const SideBarContainer = styled.div`
  display: block;
  background-color: #FFFFFF;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 195px;
  height: calc(100vh - 68px);
  &::-webkit-scrollbar {
    width: 10px;
    margin-left: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 1100px) {
    display: block;
    width: 160px;
    margin-left: -160px;
    &.show {
      margin-left: 0px;
    }
  }
  transition: all 0.3s ease;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
`;

const SideBar = ({ privilege, showSidebar, activePage, location, providerLocationId }) => {
  const navItems = [
    {
      activeImage: DashboardActiveIcon,
      mainImage: DashboardIcon,
      title: 'DASHBOARD',
      link: '/dashboard/',
      privileges: ['admin', 'provider']
    },
    {
      activeImage: OrdersActiveIcon,
      mainImage: OrdersIcon,
      title: 'ORDERS',
      link: '/orders/',
      privileges: ['admin', 'provider']
    },
    {
      activeImage: CalendarActiveIcon,
      mainImage: CalendarIcon,
      title: 'CALENDAR',
      link: '/calendar/',
      privileges: ['admin', 'provider']
    },
    {
      activeImage: ProviderActiveIcon,
      mainImage: ProviderIcon,
      title: 'PROVIDERS',
      link: '/providers/',
      privileges: ['admin']
    },
    {
      activeImage: MessageActiveIcon,
      mainImage: MessageIcon,
      title: 'MESSAGES',
      subItems: [
        {
          title: 'Inbox',
          link: '/inbox/'
        },
        {
          title: 'Quick Replies',
          link: '/quick-replies/'
        },
        {
          title: 'Templates',
          link: '/templates/'
        }
      ],
      privileges: ['admin', 'provider']
    },
    {
      activeImage: AnalyticsActiveIcon,
      mainImage: AnalyticsIcon,
      title: 'ANALYTICS',
      link: '/analytics/',
      privileges: ['admin', 'provider']
    },
    {
      activeImage: ServicesActiveIcon,
      mainImage: ServicesIcon,
      title: 'CATEGORIES',
      link: '/categories/',
      privileges: ['admin']
    },
    {
      activeImage: ServicesActiveIcon,
      mainImage: ServicesIcon,
      title: 'SERVICES',
      link: '/services/',
      privileges: ['provider']
    },
    {
      activeImage: TeamActiveIcon,
      mainImage: TeamIcon,
      title: 'TEAM',
      link: '/team/members/list',
      privileges: ['admin', 'provider']
    },
    {
      activeImage: CustomersActiveIcon,
      mainImage: CustomersIcon,
      title: 'USERS',
      link: '/users/',
      privileges: ['admin']
    },
    {
      activeImage: CustomersActiveIcon,
      mainImage: CustomersIcon,
      title: 'CUSTOMERS',
      link: '/customers/',
      privileges: ['provider']
    }
  ];

  const pathname =
    location.pathname === '/' ? '/dashboard/' : location.pathname;
  const navigation = navItems ;
  let activeParent = reduce(
    navigation,
    (result, item) => {
      if (item.link === pathname) {
        return item.title;
      }
      if (item.subItems) {
        const idx = findIndex(item.subItems, item => item.link === pathname);
        if (idx >= 0) return item.title;
      }
      return result;
    },
    ''
  );

  if (pathname.indexOf('/team/') > -1) {
    activeParent = navItems[8]['title'];
  }
  return (
    <SideBarContainer className={showSidebar ? 'show' : 'hide'}>
      <SideBarWrapper>
        {navigation.map((item, idx) => {
          if (item.privileges.lastIndexOf(privilege) > -1) {
            return (
              <SideBarItem
                activePage={activePage}
                isActive={item.title === activeParent}
                {...item}
                key={`nav_item_${idx}`}
              />
            );
          }
          return null;
        })}
      </SideBarWrapper>
    </SideBarContainer>
  );
};

const mapStateToProps = ({ auth: { privilege, providerLocationId } }) => ({
  privilege,
  providerLocationId
});

export default withRouter(connect(mapStateToProps)(SideBar));
