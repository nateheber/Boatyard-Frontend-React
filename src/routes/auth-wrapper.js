import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { isAuthenticatedSelector } from 'store/selectors/selectors'

const locationHelper = locationHelperBuilder({})

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: isAuthenticatedSelector,
  wrapperDisplayName: 'UserIsAuthenticated'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !isAuthenticatedSelector(state),
  wrapperDisplayName: 'UserIsNotAuthenticated'
});
