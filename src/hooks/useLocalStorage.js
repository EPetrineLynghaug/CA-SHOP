// import { useState, useEffect } from "react";
// const useLocalStorage = (key, initialValue) => {
//   const [Storedvalue, setStoredValue] = useState(() => {
//     try {
//       const items = localStorage.getItem(key);
//       return items ? JSON.parse(items) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(Storedvalue));
//     } catch (error) {
//       console.log(error);
//     }
//   }, [key, Storedvalue]);
//   return [Storedvalue, setStoredValue];
// };
// export default useLocalStorage;
