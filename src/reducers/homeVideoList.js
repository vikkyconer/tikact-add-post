import { HOME_LIST_OF_VIDEO } from '../actions/type';

export default (state = [], action) => {

    switch (action.type) {
        case HOME_LIST_OF_VIDEO:
            return {
                videoList: action.payload
            };
       
        default:
            return state;
    }

}