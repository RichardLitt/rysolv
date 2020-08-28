const { createActivity, getActivity } = require('./activity');
const { createComment, getComments, getIssueComments } = require('./comments');
const {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  deleteIssue,
  downvoteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
  updateIssueArray,
  upvoteIssue,
} = require('./issues');
const {
  checkDuplicateOrganization,
  createOrganization,
  deleteOrganization,
  getOneOrganization,
  getOrganizations,
  getOrganizationsWhere,
  searchOrganizations,
  transformOrganization,
  updateOrganizationArray,
} = require('./organizations');
const {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('./payments');
const {
  checkDuplicatePullRequest,
  createPullRequest,
  deletePullRequest,
  getOnePullRequest,
  getPullRequestList,
  getPullRequests,
  getUserPullRequests,
} = require('./pullRequests');
const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  checkUserGithubId,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUsers,
  getUserWatchList,
  getWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
} = require('./users');
const {
  alterTables,
  createTables,
  dropAllTables,
  printTables,
} = require('./tables');
const { toggleWatching } = require('./watching');
const { createWithdrawal, transformUserBalance } = require('./withdrawal');

module.exports = {
  alterTables,
  checkDuplicateIssue,
  checkDuplicateOrganization,
  checkDuplicatePullRequest,
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  checkUserGithubId,
  closeIssue,
  createActivity,
  createComment,
  createIssue,
  createOrganization,
  createPullRequest,
  createTables,
  createUser,
  createWithdrawal,
  deleteIssue,
  deleteOrganization,
  deletePullRequest,
  downvoteIssue,
  dropAllTables,
  getActivity,
  getComments,
  getIssueComments,
  getIssues,
  getOneIssue,
  getOneOrganization,
  getOnePullRequest,
  getOneUser,
  getOneUserSignUp,
  getOrganizations,
  getOrganizationsWhere,
  getPullRequestList,
  getPullRequests,
  getUserPullRequests,
  getUsers,
  getUserWatchList,
  getWatchList,
  printTables,
  searchIssues,
  searchOrganizations,
  searchUsers,
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
  toggleWatching,
  transformIssue,
  transformOrganization,
  transformUser,
  transformUserBalance,
  updateIssueArray,
  updateOrganizationArray,
  updateUserArray,
  upvoteIssue,
};
