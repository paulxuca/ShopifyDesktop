import { combineReducers } from 'redux-immutable';
import routing from './config/ImmutableRouteReducer';

import mainAppReducer from './containers/App/reducers';
import dashboardMainReducer from './containers/Dashboard/reducers';
import navigationReducer from './containers/DashboardNavigation/reducers';
import searchReducer from './containers/DashboardSearch/reducers';
import dashboardListReducer from './containers/DashboardList/reducers';
import dashboardDetailReducer from './containers/DashboardDetail/reducers';

const rootReducer = combineReducers({
  routing,
  mainAppReducer,
  dashboardMainReducer,
  navigationReducer,
  dashboardListReducer,
  searchReducer,
  dashboardDetailReducer
});

export default rootReducer;
