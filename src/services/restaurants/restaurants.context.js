
import React , {useState,createContext,useEffect,useMemo} from 'react'
import {restaurantsRequest,restaurantsTransform} from './restaurants.service' 

export const  RestaurantsContext = createContext();

export const RestaurantContextProvider = ({children}) =>{
   const [restaurants, setRestaurants] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const retrieveRestaurants = ()=>{

    setIsLoading(true);
    setTimeout(()=>{
        restaurantsRequest()
        .then(restaurantsTransform)
        .then((result) => {

            setIsLoading(false)
            setRestaurants(result)
        })
        .catch((err)=>{
            setIsLoading(false)
            setError(err)
        })
    },2000 )


   

    console.log("restaurants=>>",restaurants)
   }
   useEffect(() => {
    retrieveRestaurants();
    

}, [])
    return (

        <RestaurantsContext.Provider
        value={{
        restaurants,
        isLoading,
        error}}>
        {children}
        </RestaurantsContext.Provider>
    )
}