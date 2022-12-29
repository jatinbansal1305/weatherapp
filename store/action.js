import { setWeatherParameter, setCityList, setCityNameList  } from "./actionType";

export const cityList = (x) => {
    
    return{
    type : setCityList,
    payload : x
}};
export const weatherParameter = (y) => ({
    type : setWeatherParameter,
    payload :y
});
export const cityNameList = (z) => ({
    type : setCityNameList,
    payload : z
});
