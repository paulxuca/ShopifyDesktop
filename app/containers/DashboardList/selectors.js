import { createSelector } from 'reselect';

const selectDashboardList = () => (state) => state.get('dashboardListReducer');

const selectQueries = () => createSelector(
    selectDashboardList(),
    (dashboardListState) => dashboardListState.get('queries')
);

export {
    selectQueries
};
