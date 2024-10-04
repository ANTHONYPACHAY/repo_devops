import {Injectable} from '@angular/core';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {catchError, firstValueFrom, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FirebaseInterfaces} from "../../interface/enums";
import {Author, BasicEntity, FileData, Script} from "../../interface/models";
import {Global} from "../../utils/Global";
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ScriptService {

    private scriptTypeList: BasicEntity[] = [];
    private operativeSystemList: BasicEntity[] = [];
    private toolList: BasicEntity[] = [];
    private tecnologiasList: BasicEntity[] = [];
    private authorsList: Author[] = [];
    public initialized: boolean = false;
    constructor(private http: HttpClient, private fb: ManagerFirebase) {
        this.fb.logIn('abc@gmail.com', 'Abc12345');
    }

    getJsonData(): Observable<any> {
        return this.http.get<any>('assets/datos.json');
    }

    public setPropesties(scriptTypeList: BasicEntity[],
                  operativeSystemList: BasicEntity[],
                  toolList: BasicEntity[],
                  tecnologiasList: BasicEntity[],
                  authorsList: Author[]) {
        this.scriptTypeList = scriptTypeList;
        this.operativeSystemList = operativeSystemList;
        this.toolList = toolList;
        this.tecnologiasList = tecnologiasList;
        this.authorsList = authorsList;
        this.initialized = true;
    }

    async getById(id: string) {
        const item = await this.fb.getRecord(FirebaseInterfaces.SCRIPTS, id);
        return item as Script;
    }
    async getByIdTurbo(id: string) {
        const script = await this.fb.getRecord(FirebaseInterfaces.SCRIPTS, id) as Script;
        let findItemScriptType = Global.filtrar(this.scriptTypeList, 'id', script.scriptType.id);
        if (findItemScriptType.length > 0) {
            script.scriptType.entity = findItemScriptType[0];
        }

        let findItemOperativeSystem = Global.filtrar(this.operativeSystemList, 'id', script.operativeSystem.id);
        if (findItemOperativeSystem.length > 0) {
            script.operativeSystem.entity = findItemOperativeSystem[0];
        }

        for (let ind = 0; ind < script.tecnology.length; ind++) {
            let findItemTecnologias = Global.filtrar(this.tecnologiasList, 'id', script.tecnology[ind].id);
            if (findItemTecnologias.length > 0) {
                script.tecnology[ind].entity =  findItemTecnologias[0];
            }
        }

        let findItemTool = Global.filtrar(this.toolList, 'id', script.tool.id);
        if (findItemTool.length > 0) {
            script.tool.entity = findItemTool[0];
        }

        for (let ind = 0; ind < script.authors.length; ind++) {
            let findItemAutor = Global.filtrar(this.authorsList, 'id', script.authors[ind].id);
            if (findItemAutor.length > 0) {
                script.authors[ind].entity =  findItemAutor[0];
            }
        }
        return script;
    }

    async getList() {
        const itemList = await this.fb.getRecordsOrderBy(FirebaseInterfaces.SCRIPTS,  "tittle", 1);
        return itemList as Script[];
    }

    async getListTurbo(sortParam: string, sortType: number) {
        const itemList: Script[] = await this.fb.getRecordsOrderBy(FirebaseInterfaces.SCRIPTS,  sortParam, sortType) as Script[];
        for (const script of itemList) {

            let findItemScriptType = Global.filtrar(this.scriptTypeList, 'id', script.scriptType.id);
            if (findItemScriptType.length > 0) {
                script.scriptType.entity = findItemScriptType[0];
            }

            let findItemOperativeSystem = Global.filtrar(this.operativeSystemList, 'id', script.operativeSystem.id);
            if (findItemOperativeSystem.length > 0) {
                script.operativeSystem.entity = findItemOperativeSystem[0];
            }

            for (let ind = 0; ind < script.tecnology.length; ind++) {
                let findItemTecnologias = Global.filtrar(this.tecnologiasList, 'id', script.tecnology[ind].id);
                if (findItemTecnologias.length > 0) {
                    script.tecnology[ind].entity =  findItemTecnologias[0];
                }
            }

            let findItemTool = Global.filtrar(this.toolList, 'id', script.tool.id);
            if (findItemTool.length > 0) {
                script.tool.entity = findItemTool[0];
            }

            for (let ind = 0; ind < script.authors.length; ind++) {
                let findItemAutor = Global.filtrar(this.authorsList, 'id', script.authors[ind].id);
                if (findItemAutor.length > 0) {
                    script.authors[ind].entity =  findItemAutor[0];
                }
            }
        }
        return itemList;
    }

    async persist(item: any, id: string = "") {
        if (id !== "") {
            await this.fb.updateRecord(FirebaseInterfaces.SCRIPTS, id, item)
            return id;
        } else {
            return await this.fb.saveRecord(FirebaseInterfaces.SCRIPTS, item);
        }
    }

    async saveFile(id: string = "", files: File[]) {
        const saved = await this.fb.uploadFiles(id, files);
    }
    async getFileList(id: string = ""): Promise<FileData[]> {
        try {
            return await firstValueFrom(this.fb.getFilesInFolder(id));
        } catch (error) {
            console.log('Error retrieving file list:', error);
            return [];
        }
    }

    readFile(url: string) {
        let backendUrl = 'https://vercel-view-file.vercel.app/download';
        return this.http.get(`${backendUrl}?url=${encodeURIComponent(url)}`, { responseType: 'blob' });
    }
    downloadFile(url: string, fileName: string): void {

        let backendUrl = 'https://vercel-view-file.vercel.app/download';

        this.http.get(`${backendUrl}?url=${encodeURIComponent(url)}`, { responseType: 'blob' })
            .pipe(
                catchError(error => {
                    console.error('Error al descargar el archivo:', error);
                    return throwError(error);
                })
            )
            .subscribe(blob => {
                saveAs(blob, fileName);
            });
    }



}
