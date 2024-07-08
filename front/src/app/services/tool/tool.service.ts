import {Injectable} from '@angular/core';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {FirebaseInterfaces} from "../../interface/enums";
import {BasicEntity} from "../../interface/models";

@Injectable({
    providedIn: 'root'
})
export class ToolService {

    constructor(private fb: ManagerFirebase) {
    }

    async getById(id: string) {
        const item = await this.fb.getRecord(FirebaseInterfaces.TOOL, id);
        return item as BasicEntity;
    }

    async getList() {
        const itemList = await this.fb.getRecordsOrderBy(FirebaseInterfaces.TOOL,  "description", 1);
        return itemList as BasicEntity[];
    }

    async persist(item: any, id: string = "") {
        if (id !== "") {
            const saved = await this.fb.updateRecord(FirebaseInterfaces.TOOL, id, item);
        } else {
            const saved = await this.fb.saveRecord(FirebaseInterfaces.TOOL, item);
        }
    }
}
