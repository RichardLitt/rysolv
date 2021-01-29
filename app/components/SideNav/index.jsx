import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { excludedPath, getInitialValue } from './helpers';
import {
  FixedWrapper,
  StyledIconButton,
  StyledListWrapper,
  StyledSideNav,
} from './styledComponents';

const backArrow = iconDictionary('backArrowHalf');
const forwardArrow = iconDictionary('forwardArrowHalf');
const helpIcon = iconDictionary('help');
const issueIcon = iconDictionary('issue');
const newIssueIcon = iconDictionary('upload');
const newOrganizationIcon = iconDictionary('addCircle');
const newProjectIcon = iconDictionary('newProject');
const organizationIcon = iconDictionary('organization');
const projectIcon = iconDictionary('project');
const userIcon = iconDictionary('user');

const SideNav = ({ deviceView, handleNav }) => {
  const path = window.location.pathname;
  const formattedPath = path.replace(/^\/+/, '');

  const [open, setOpen] = useState(true);
  const [currentValue, setCurrentValue] = useState(0);
  const [displaySideNav, setDisplaySideNav] = useState(
    !excludedPath.includes(formattedPath),
  );

  useEffect(() => {
    const { initialValue } = getInitialValue[formattedPath] || 0;
    setCurrentValue(initialValue);
    switch (deviceView) {
      case 'desktopL':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'desktop':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'desktopS':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'laptop':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'laptopS':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'tablet':
        setDisplaySideNav(false);
        break;
      case 'mobile':
        setDisplaySideNav(false);
        break;
      case 'mobileS':
        setDisplaySideNav(false);
        break;
      case 'mobileXS':
        setDisplaySideNav(false);
        break;
      case 'mobileXXS':
        setDisplaySideNav(false);
        break;
      default:
        break;
    }
  }, [deviceView, path]);

  useEffect(() => {
    const isDesktop = deviceView === 'desktop' || deviceView === 'desktopL';
    if (isDesktop) setOpen(true);
    else setOpen(false);
  }, [deviceView]);

  const handleClick = (route, tab) => {
    handleNav(route);
    setCurrentValue(tab);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const SideNavComponent = (
    <FixedWrapper open={open}>
      <StyledSideNav open={open}>
        <List>
          <StyledListWrapper active={currentValue === 0}>
            <ListItem
              button
              key="Issues"
              onClick={() => handleClick('/issues', 0)}
            >
              <ListItemIcon>{issueIcon}</ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 1}>
            <ListItem
              button
              key="Organizations"
              onClick={() => handleClick('/organizations', 1)}
            >
              <ListItemIcon>{organizationIcon}</ListItemIcon>
              <ListItemText primary="Organizations" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 2}>
            <ListItem
              button
              key="Projects"
              onClick={() => handleClick('/projects', 2)}
            >
              <ListItemIcon>{projectIcon}</ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 3}>
            <ListItem
              button
              key="Users"
              onClick={() => handleClick('/users', 3)}
            >
              <ListItemIcon>{userIcon}</ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </StyledListWrapper>
          <Divider />
          <StyledListWrapper active={currentValue === 4}>
            <ListItem
              button
              key="addIssues"
              onClick={() => handleClick('/issues/add', 4)}
            >
              <ListItemIcon>{newIssueIcon}</ListItemIcon>
              <ListItemText primary="New Issue" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 5}>
            <ListItem
              button
              key="addOrganizations"
              onClick={() => handleClick('/organizations/add', 5)}
            >
              <ListItemIcon>{newOrganizationIcon}</ListItemIcon>
              <ListItemText primary="New Organization" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 6}>
            <ListItem
              button
              key="addProjects"
              onClick={() => handleClick('/projects/add', 6)}
            >
              <ListItemIcon>{newProjectIcon}</ListItemIcon>
              <ListItemText primary="New Projects" />
            </ListItem>
          </StyledListWrapper>
        </List>
        <Divider />
        <StyledListWrapper active={currentValue === 7}>
          <ListItem
            button
            key="howTo"
            onClick={() => handleClick('/how-to', 7)}
          >
            <ListItemIcon>{helpIcon}</ListItemIcon>
            <ListItemText primary="How It Works" />
          </ListItem>
        </StyledListWrapper>
        <StyledIconButton disableRipple onClick={toggleDrawer} open>
          {open ? backArrow : forwardArrow}
        </StyledIconButton>
      </StyledSideNav>
    </FixedWrapper>
  );

  return (
    <ConditionalRender
      Component={SideNavComponent}
      shouldRender={displaySideNav}
    />
  );
};

SideNav.propTypes = {
  deviceView: T.string,
  handleNav: T.func,
};

export default SideNav;
