import { TestTypes } from "../enums/enums";


export interface Admin {
    username: string;
    password: string;
}


export interface InputTest {
    type: TestTypes.InputTest,
    id: string,
    question: string,
}

export interface TrueFalseTest {
    type: TestTypes.TrueFalseTest,
    id: string,
    question: string,
    isTrue: boolean,
}

export interface SelectionTest {
    type: TestTypes.SelectionTest,
    id: string,
    question: string,
}