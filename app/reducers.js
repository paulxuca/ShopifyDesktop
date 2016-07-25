import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import mainAppReducer from './containers/App/reducers';
import dashboardMainReducer from './containers/Dashboard/reducers';
import navigationReducer from './containers/DashboardNavigation/reducers';
import searchReducer from './containers/DashboardSearch/reducers';

const rootReducer = combineReducers({
  routing,
  mainAppReducer,
  dashboardMainReducer,
  navigationReducer,
  searchReducer
});

export default rootReducer;
