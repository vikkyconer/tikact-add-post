import { 
    HOME_LIST_OF_VIDEO
   } from './type';

import api from '../services/apiHandler';

export const videoList = (formValues) => {
    return async function(dispatch) {
      // const response = await api.post('/getPostsForYou',{
      //   preferences: [],
      //   isFirstRequest: false,
      //   offSet: 0
      // },
      // {headers:{'Content-Type':'application/json'}}
      // )
      // .catch(err => { console.log(err)});
  
      // dispatch({
      //   type: HOME_LIST_OF_VIDEO,
      //   payload: response.data
      // })
    }
  }