import React, {useReducer} from  'react';

export default (reducer, actions, defaultValue)=>{

    const Context = React.createContext();

    const Provider = ({children})=>{

        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundAction={};

        for( let key in actions ){
            boundAction[key]= actions[key](dispatch);
        }

        return (

            <Context.Provider value={{ state, ...boundAction}}>
                {children}
            </Context.Provider>

        );

    };


    return {Context, Provider};

};