export interface PersonInterface {
    id:string,
    name:string,
    age:number,
    x?:number
}

// export type Persons = Array<PersonInterface>
export type Persons = PersonInterface[]