import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import { MenuItem, StyledActivityMenu } from './styledComponents';

const UserActivityMenu = ({
  handleClose,
  handleNav,
  menuClickHandler,
  open,
}) => {
  const handleClick = (e, route) => {
    menuClickHandler(e);
    handleClose();
    handleNav(route);
  };
  const ActivityMenuComponent = (
    <StyledActivityMenu>
      <MenuItem onClick={e => handleClick(e, '/issues/add')}>
        New Issue
      </MenuItem>
      <MenuItem onClick={e => handleClick(e, '/organizations/add')}>
        New Organization
      </MenuItem>
    </StyledActivityMenu>
  );
  return (
    <ConditionalRender Component={ActivityMenuComponent} shouldRender={open} />
  );
};

UserActivityMenu.propTypes = {
  handleClose: T.func.isRequired,
  handleNav: T.func.isRequired,
  menuClickHandler: T.func.isRequired,
  open: T.bool.isRequired,
};
export default UserActivityMenu;
