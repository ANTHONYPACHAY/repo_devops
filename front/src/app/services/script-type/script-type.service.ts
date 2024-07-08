import {Injectable} from '@angular/core';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {BasicEntity} from "../../interface/models";
import {FirebaseInterfaces} from "../../interface/enums";

@Injectable({
    providedIn: 'root'
})
export class ScriptTypeService {

    constructor(private fb: ManagerFirebase) {
    }

    async getById(id: string) {
        const item = await this.fb.getRecord(FirebaseInterfaces.SCRIPT_TYPE, id);
        return item as BasicEntity;
    }

    async getList() {
        const itemList = await this.fb.getRecordsOrderBy(FirebaseInterfaces.SCRIPT_TYPE,  "description", 1);
        return itemList as BasicEntity[];
    }

    async persist(item: any, id: string = "") {
        if (id !== "") {
            const saved = await this.fb.updateRecord(FirebaseInterfaces.SCRIPT_TYPE, id, item);
        } else {
            const saved = await this.fb.saveRecord(FirebaseInterfaces.SCRIPT_TYPE, item);
        }
    }
}
