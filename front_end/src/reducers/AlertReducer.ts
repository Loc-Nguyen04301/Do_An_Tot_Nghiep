
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"
const LOADING = "LOADING"

export interface AlertState {
    loading?: boolean;
    success?: string;
    errors?: string[] | string;
}

export type AlertAction = | {
    type: typeof ERROR;
    payload: AlertState;
}
    | {
        type: typeof LOADING;
        payload: AlertState;
    }
    | {
        type: typeof SUCCESS;
        payload: AlertState;
    };

export const alertReducer = (state: AlertState, action: AlertAction) => {
    switch (action.type) {
        case LOADING:
            return action.payload;
        case ERROR:
            return action.payload;
        case SUCCESS:
            return action.payload;
        default:
            return state;
    }
}