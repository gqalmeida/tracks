import React, { useReducer } from "react";

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        //Setting up the 'useReducer' call.
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        //Using the 'for in' loop to loop over all of the different actions(functions) inside the 'actions' object.
        for (let key in actions){
            //Looking up after each of the actions functions that are being passed in and calling each one with dispatch.
            boundActions[key] = actions[key](dispatch);
        }

        return (
            //The 'value' prop is the actual information that gets shared with the child components.
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };
    //Provider is the component that makes our data available to everything else inside of the application.
    //Context is the object that we are gonna use to get access to that information from the child components.
    return { Context, Provider };
};
