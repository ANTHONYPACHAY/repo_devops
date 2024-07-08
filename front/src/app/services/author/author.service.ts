import {Injectable} from '@angular/core';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {FirebaseInterfaces} from "../../interface/enums";
import {Author, BasicEntity} from "../../interface/models";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    constructor(private fb: ManagerFirebase) {
    }

    async getById(id: string) {
        const item = await this.fb.getRecord(FirebaseInterfaces.AUTHOR, id);
        return item as Author;
    }

    async getByEmail(email: string) {
        const itemList = await this.fb.getRecordsConditionOrderBy(FirebaseInterfaces.AUTHOR, "email", "==", email, "lastName", 1);
        return itemList as Author[];
    }

    async getList() {
        const itemList = await this.fb.getRecordsOrderBy(FirebaseInterfaces.AUTHOR,  "lastName", 1);
        return itemList as Author[];
    }

    async persist(item: any, id: string = "") {
        if (id !== "") {
            const saved = await this.fb.updateRecord(FirebaseInterfaces.AUTHOR, id, item);
        } else {
            const saved = await this.fb.saveRecord(FirebaseInterfaces.AUTHOR, item);
        }
    }

}
