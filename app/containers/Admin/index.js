import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AdminHeader from 'components/Admin/AdminHeader';
import { BaseContainer, ConditionalRender } from 'components/base_ui';
import Sidebar from 'components/Sidebar';
import injectReducer from 'utils/injectReducer';

import { typeDictionary } from './helpers';
import NotFoundPage from '../NotFoundPage/Loadable';
import { subrouteDictionary, viewDictionary } from './routeDictionary';
import reducer from './reducer';

export const Admin = ({
  handleNav,
  match,
  match: {
    params: { subroute, view, id },
  },
}) => {
  let routesMatch = false;
  const Component = typeDictionary[subroute];

  if (subroute && !view && subrouteDictionary.includes(subroute)) {
    routesMatch = true;
  }
  if (
    subroute &&
    subrouteDictionary.includes(subroute) &&
    view &&
    viewDictionary.includes(view)
  ) {
    routesMatch = true;
  }

  const ComponentToRender = (
    <Fragment key={subroute}>
      <BaseContainer>
        <AdminHeader activePage={subroute} handleNav={handleNav} />
        <Component subroute={subroute} view={view} id={id} match={match} />
      </BaseContainer>
      <Sidebar />
    </Fragment>
  );
  return (
    <ConditionalRender
      Component={ComponentToRender}
      FallbackComponent={NotFoundPage}
      shouldRender={routesMatch}
    />
  );
};

Admin.propTypes = {
  handleNav: T.func,
  match: T.object,
};

const mapDispatchToProps = dispatch => ({
  handleNav: ({ subroute }) => {
    dispatch(push(`/admin/${subroute}`));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin', reducer });

export default compose(
  withReducer,
  withConnect,
)(Admin);
