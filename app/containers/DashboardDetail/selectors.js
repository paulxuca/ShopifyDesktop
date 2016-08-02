import { createSelector } from 'reselect';

const selectDashboardDetail = () => (state) => state.get('dashboardDetailReducer');

const selectSingleData = () => createSelector(
    selectDashboardDetail(),
    (dashboardDetailState) => dashboardDetailState.get('data')
);

export {
    selectSingleData
};
