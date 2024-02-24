import { ReactNode } from "react";
import { AlertAction, AlertState, alertReducer } from "../reducers/AlertReducer";
import React from "react";

interface AlertProviderProps {
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

export const AlertContext = React.createContext<AlertContextType>(initialState);

const AlertProvider = ({ children }: AlertProviderProps) => {
    const [state, dispatch] = React.useReducer(alertReducer, initialState)
    const value = { ...state, dispatch }

    return (<AlertContext.Provider value={value}>{children}</AlertContext.Provider>)
}

export default AlertProvider