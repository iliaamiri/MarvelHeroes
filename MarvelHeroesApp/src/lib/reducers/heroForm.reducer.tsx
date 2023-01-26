import {CreateHeroPayload} from "../dtos";

export enum HeroFormActionType {
    SetHero = "SetHero",
    PowerChange = "PowerChange",
    InputChange = "InputChange",
}

export interface HeroFormAction {
    type: HeroFormActionType;
    payload: any;
}

export const heroFormReduce = (state: CreateHeroPayload, {type, payload}: HeroFormAction) => {
    switch (type) {
        case HeroFormActionType.PowerChange:
            if (payload.checked) {
                return {
                    ...state,
                    powersIds: [...state.powersIds, payload.powerId],
                }
            } else {
                return {
                    ...state,
                    powersIds: state.powersIds.filter((id) => id !== payload.powerId),
                }
            }
        case HeroFormActionType.InputChange:
            return {
                ...state,
                [payload.propertyName]: payload.value,
            }
        case HeroFormActionType.SetHero:
            return {
                ...payload,
            }
    }
};
