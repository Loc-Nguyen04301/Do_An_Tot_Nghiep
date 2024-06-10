export const ALERT = "ALERT"

export interface AlertState {
    id?: string;
    loading?: boolean;
    success?: string;
    errors?: string[] | string;
}

export type AlertAction = {
    type: typeof ALERT;
    payload: AlertState;
}

export const alertReducer = (state: AlertState, action: AlertAction) => {
    switch (action.type) {
        case ALERT:
            return action.payload;
        default:
            return state;
    }
}