import { makeAutoObservable } from "mobx"
import { Admin, InputTest, SelectionTest, TrueFalseTest } from "../types/types";
import { AuthApi } from "../api/AuthApi";
import { TestTypes } from "../enums/enums";
import { v4 as uuid } from 'uuid';

class Store {
    admin: Admin | null = null;
    isAuth = false;
    userName: string = ''; 
    testLink: string = '';
    tests: (InputTest | TrueFalseTest | SelectionTest)[] = [];
    testResult: number = 0;

    constructor() {
        makeAutoObservable(this)
      
    }

    setAdmin(admin: Admin) {
        this.admin = admin;
    }

    async authorize(){
        const token = localStorage.getItem('token');
        if(token){
            const admin = await AuthApi.auth(token);
            this.admin = admin;
            this.isAuth = true;
        }
    }
    async login(adminData: Admin){
        const data = await AuthApi.login(adminData)
        console.log('logn',data)
        if(data){
            localStorage.setItem("token", data.access_token);
            this.admin = data.admin;
            this.isAuth = true;
            return this.admin;
        }

        return null
    }

    async registration(adminData: Admin){
        const data = await AuthApi.registration(adminData)
        console.log(data)
        if(data){
            localStorage.setItem("token", data.access_token);
            this.admin = data.admin;
            this.isAuth = true;
        }
    }

    setAuth(isAuth: boolean){
        this.isAuth = isAuth;
    }

    setUserName(userName: string){
        this.userName = userName;
    }

    addInputTest(){
        this.tests.push({
            type: TestTypes.InputTest,
            question: '',
            id: uuid(),
        })
    }

    addTrueFalseTest(){
        this.tests.push({
            type: TestTypes.TrueFalseTest,
            isTrue: false,
            question: '',
            id: uuid(),
        })
    }

    addSelectionTest(){
        this.tests.push({
            type: TestTypes.SelectionTest,
            question: '',
            id: uuid(),
        })
    }

    setTestLink(link: string){
        this.testLink = link;
    }

    setTestResult(testResult: number, testId: number){
        localStorage.setItem(testId.toString(),testResult.toString())
        this.testResult = testResult;
    }
}



export const store = new Store();