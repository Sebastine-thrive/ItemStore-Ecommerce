// import React, { useState } from 'react';
// import { createContext, useContext } from 'react';

// const StateContext = createContext();

// const initialState = {
//     cartCard: false,
// }

// export const ContextProvider = ({ children }) => {
//     const [isClicked, setIsClicked] = useState(initialState);


// const handleClick = (clicked) => {
//     setIsClicked({ ...initialState, [clicked]: true })
// }
// // export const UserProvider = UserContext.Provider
// // export const UserConsumer = UserContext.Consumer

// // export default UserContext

// return (
//     <StateContext.Provider
//         value={{ isClicked, setIsClicked, handleClick }}
//     >
//         {children}
//     </StateContext.Provider>
// )
// }
// export const useStateContext = () => useContext(StateContext);