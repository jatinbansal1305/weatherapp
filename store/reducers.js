import { setWeatherParameter, setCityList, setCityNameList } from "./actionType";

const initialState ={
    cityList : [],
    weatherParameterList : [],
    cityNameList : [],
};
export const mainReducer = (state=initialState,action) =>{
    
   
    switch(action.type) {
        case setCityList : {
        return {...state,cityList : action.payload};}
        case setWeatherParameter : 
        return {...state,weatherParameterList : action.payload};
        case setCityNameList : 
        return {...state,cityNameList: action.payload};
        default:
            return state;

    }
}; 