export interface CreateHeroPayload {
    heroName: string;
    secretIdentity?: string;
    gender: string;
    birthDate: Date;
    firstAppearance: Date;
    powersIds: number[];
}

export interface CreatePowerPayload {
    name: string;
    description: string;
}
