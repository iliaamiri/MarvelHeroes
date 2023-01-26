import {CreatePowerPayload} from "../dtos";

export enum PowerFormActionType {
    SetPowers = "SetPowers",
    InputChange = "InputChange",
}

export interface PowerFormAction {
    type: PowerFormActionType;
    payload: any;
}

export const powerFormReduce = (state: CreatePowerPayload, {type, payload}: PowerFormAction) => {
    switch (type) {
        case PowerFormActionType.InputChange:
            return {
                ...state,
                [payload.propertyName]: payload.value,
            }
        case PowerFormActionType.SetPowers:
            return {
                ...payload,
            }
    }
};
