import { transform } from "@babel/core";
import { mockImages, mocks } from "./mock";
import camelize from 'camelize'
export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};
export const restaurantsTransform=({results=[]})=>{
  const mappedResults =results.map((restaurant)=> {
    restaurant.photos = restaurant.photos.map((p) =>{

      return mockImages[Math.ceil(Math.random()*(mockImages.length-1))]
    })
    return {
      ...restaurant,
     isOpenNew:restaurant.opening_hours
    }
  })
  

   const newResult= camelize(mappedResults)
  return newResult;
}
restaurantsRequest()
  .then(restaurantsTransform).then((transformResult)=>{
    console.log("transForm=>", transformResult)
  })
  .catch((err) => {
    console.log("error");
  });
