import { fromJS } from 'immutable';
import {
	CHANGE_AVATAR_SUCCESS,
	CHANGE_COVER_SUCCESS,
	CHANGE_PASSWORD_SUCCESS,
	GET_USER_IMAGES_BY_ID_SUCCESS,
	GET_PROFILE_USER_IMAGES_BY_ID_SUCCESS,
	GET_USER_PROFILE,
	GET_USER_PROFILE_SUCCESS,
	UPDATE_PROFILE,
	UPDATE_PROFILE_ERROR,
	UPDATE_PROFILE_SUCCESS,
	CLEAR_IMAGES,
	CLEAR_PROFILE_IMAGES,
} from './UserProfile.constant';

const initialState = fromJS({
	profile: {},
	loading: false,
	error: null,
	isChangedPassword: false,
	images: [],
	profileImages: [],
	isLoadMoreImage: true,
});
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_PROFILE:
			return state.set('loading', true);
		case GET_USER_PROFILE_SUCCESS:
			return state.set('loading', false).set('profile', action.payload);
		case UPDATE_PROFILE:
			return state.set('loading', true).set('error', null);
		case UPDATE_PROFILE_SUCCESS:
			return state
				.set('loading', false)
				.set('error', null)
				.set('profile', action.payload);
		case UPDATE_PROFILE_ERROR:
			return state.set('loading', false).set('error', action.error);
		case CHANGE_PASSWORD_SUCCESS: {
			return state.set('isChangedPassword', true);
		}
		case GET_USER_IMAGES_BY_ID_SUCCESS: {
			return state
				.set('images', [...state.get('images'), ...action.payload])
				.set('isLoadMoreImage', action.payload.length === 12);
		}
		case GET_PROFILE_USER_IMAGES_BY_ID_SUCCESS: {
			return state
				.set('profileImages', [...state.get('images'), ...action.payload])
		}
		case CHANGE_AVATAR_SUCCESS: {
			return state.set('profile', {
				...state.get('profile'),
				Avatar: action.payload,
			});
		}
		case CHANGE_COVER_SUCCESS: {
            return state.set('profile', {
                ...state.get('profile'),
                ImgCover: action.payload,
            });
        }
		case CLEAR_IMAGES: {
			return state.set('images', []);
		}
		case CLEAR_PROFILE_IMAGES: {
			return state.set('profileImages', []);
		}
		default:
			return state;
	}
};
export default reducer;
