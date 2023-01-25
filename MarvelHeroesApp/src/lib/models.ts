export interface Hero {
    id: number;

    heroName: string;
    secretIdentity: Null<string>;
    gender: string;

    birthDate: Date;
    firstAppearance: Date;

    createdAt: Date;
    updatedAt: Date;

    powers: Power[];
}

export interface Power {
    id: number;

    name: string;
    description: string;

    heroes: Hero[];
}