import actionTypes from './actionTypes';
import { userService } from '../../services';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            const gender = await userService.getAllCodeByType('gender');
            if (gender.data.length > 0 && gender.errCode === 0) {
                dispatch(fetchGenderSuccess(gender.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            console.log('fetchGenderStart fail', e);
            dispatch(fetchGenderFailed());
        }
    };
};
export const fetchGenderSuccess = (gender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: gender,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FALIED,
});
