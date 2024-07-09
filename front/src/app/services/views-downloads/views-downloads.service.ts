import { Injectable } from '@angular/core';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {FirebaseInterfaces} from "../../interface/enums";
import {ViewsDownloads} from "../../interface/models";

@Injectable({
  providedIn: 'root'
})
export class ViewsDownloadsService {

    constructor(private fb: ManagerFirebase) {
    }

    async getById(id: string) {
        const item = await this.fb.getRecord(FirebaseInterfaces.VIEWS_AND_DOWNLOADS, id);
        return item as ViewsDownloads;
    }

    async getList() {
        const itemList = await this.fb.getRecordsOrderBy(FirebaseInterfaces.VIEWS_AND_DOWNLOADS,  "date", 1);
        return itemList as ViewsDownloads[];
    }

    async persist(item: any, id: string = "") {
        if (id !== "") {
            const saved = await this.fb.updateRecord(FirebaseInterfaces.VIEWS_AND_DOWNLOADS, id, item);
        } else {
            const saved = await this.fb.saveRecord(FirebaseInterfaces.VIEWS_AND_DOWNLOADS, item);
        }
    }
}
