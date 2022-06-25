import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    roleId: [],
    position: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                gender: action.data,
            };
        case actionTypes.FETCH_GENDER_FALIED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
