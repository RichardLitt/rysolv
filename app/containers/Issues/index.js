import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueCard from 'components/Issues';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  deleteIssue,
  fetchIssues,
  inputChange,
  searchIssues,
} from './actions';
import {
  makeSelectIssues,
  makeSelectIssuesError,
  makeSelectIssuesLoading,
  makeSelectIssuesSearchDisabled,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Issues extends React.PureComponent {
  componentDidMount() {
    const { dispatchFetchIssues } = this.props;
    dispatchFetchIssues();
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      alerts,
      disabled,
      dispatchDeleteIssues,
      error,
      handleClearAlerts,
      handleInputChange,
      handleNav,
      handleSearchIssues,
      issues,
      loading,
      search,
    } = this.props;

    return (
      <AsyncRender
        asyncData={issues}
        component={IssueCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          disabled,
          handleClearAlerts,
          handleDelete: dispatchDeleteIssues,
          handleInputChange,
          handleNav,
          handleSearchIssues,
          search,
        }}
      />
    );
  }
}

Issues.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  disabled: T.bool,
  dispatchDeleteIssues: T.func,
  dispatchFetchIssues: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  issues: T.array,
  loading: T.bool,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  alerts: makeSelectIssues('alerts'),
  disabled: makeSelectIssuesSearchDisabled(),
  error: makeSelectIssuesError('issues'),
  issues: makeSelectIssues('issues'),
  loading: makeSelectIssuesLoading('issues'),
  search: makeSelectIssues('search'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchDeleteIssues: payload => dispatch(deleteIssue(payload)),
    dispatchFetchIssues: () => dispatch(fetchIssues()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchIssues: payload => dispatch(searchIssues(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// magic
const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

// Adds store to issues
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Issues);
