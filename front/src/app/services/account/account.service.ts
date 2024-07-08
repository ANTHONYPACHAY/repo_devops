import { Injectable } from '@angular/core';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {Login, Person} from "../../interface/models";
import {environment} from "../../../environments/environment";
import {Global} from "../../utils/Global";
import {FirebaseInterfaces} from "../../interface/enums";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    constructor(private fb: ManagerFirebase) { }

    public setDataUser(data: Person) {
        console.log('sessionExists ', this.sessionExists());
        if(!this.sessionExists()) {
            localStorage.setItem(environment.userKey, JSON.stringify(data));
        }
    }

    public getDataUser(): Person {
        if(this.sessionExists()) {
            const objS = localStorage.getItem(environment.userKey);
            if (objS !== null && !Global.isNullOrUndefined(objS)) {
                return (JSON.parse(objS) as Person);
            }
        }
        return {} as Person;
    }

    public sessionExists(): boolean {
        return localStorage.getItem(environment.userKey) !== null;
    }

    public havePrivilege(privilege: number): boolean {
        const account: Person = this.getDataUser();
        if (account) {
            if (!Global.isNullOrUndefined(account)) {
                return (account.rol === privilege);
            }
        }
        return false;
    }

    public async login(obj: Login) {
        const userCredential = await this.fb.logIn(obj.user, obj.password).catch((error) => { throw error;});

        const dataLogin = await this.fb.getRecordsCondition(FirebaseInterfaces.USUARIOS, "uid_fb", "==", userCredential.user.uid)
            .catch((error) => { throw error;});
        if (dataLogin.length === 0) {
            throw 'Información de usuario no encontrada.';
        }
        const persona = dataLogin[0] as Person
        if (!persona.active) {
            throw 'El usuario se encuentra deshabilitado.';
        }

        return persona;
    }

    public async register(obj: Login, person: Person){
        const userReg = await this.fb.regist(obj.user, obj.password).catch((error) => { throw error;});
        person.uid_fb = userReg.user.uid;
        const user = await this.fb.saveRecord(FirebaseInterfaces.USUARIOS, person).catch((error) => { throw error;});
        return await this.fb.getRecord(FirebaseInterfaces.USUARIOS, user) as Person;
    }

    public recoverPassword(password: string){
        return  this.fb.forgetPwd(password);
    }
}
