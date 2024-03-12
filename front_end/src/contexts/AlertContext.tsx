import { ReactNode } from "react";
import { ALERT, AlertAction, AlertState, alertReducer } from "../reducers/AlertReducer";
import React from "react";

interface AlertContextProviderProps {
    children: ReactNode;
}

interface AlertContextType {
    loading?: boolean;
    success?: string;
    errors?: string[] | string;
    dispatch: React.Dispatch<AlertAction>;
}

const initialState = {
    loading: false,
    success: undefined,
    errors: undefined,
    dispatch: () => null
}

const AlertContext = React.createContext<AlertContextType>(initialState);

const useAlertContext = () => {
    const context = React.useContext(AlertContext);
    if (!context) {
        throw new Error('useAlertContext must be used within a AlertContextProvider');
    }
    return context;
}

const useAlertDispatch = () => {
    const { dispatch } = useAlertContext();

    const showAlert = (payload: AlertState) => {
        dispatch({
            type: ALERT,
            payload: payload,
        });
    };

    return showAlert;
};

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
    const [state, dispatch] = React.useReducer(alertReducer, initialState)
    const value = { ...state, dispatch }

    return (<AlertContext.Provider value={value}>{children}</AlertContext.Provider>)
}

export { AlertContextProvider, useAlertContext, useAlertDispatch }