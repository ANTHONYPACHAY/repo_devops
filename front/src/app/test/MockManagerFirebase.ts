import { TestBed } from '@angular/core/testing';
import {from} from "rxjs";

export class MockManagerFirebase {
    async logIn(email: string, password: string) {
        return Promise.resolve({ user: { email } });
    }

    async regist(email: string, password: string) {
        return Promise.resolve({ user: { email } });
    }

    async forgetPwd(email: string): Promise<void> {
        return Promise.resolve();
    }

    async fb_signOut(): Promise<void> {
        return Promise.resolve();
    }

    async getRecord(collecName: string, id: string) {
        return Promise.resolve({ id, data: 'mockData' });
    }

    async getRecords(collecName: string) {
        return Promise.resolve([{ id: '1', data: 'mockData' }]);
    }

    async getRecordsCondition(collecName: string, param: string, operator: any, value: any) {
        return Promise.resolve([{ id: '1', data: 'mockData' }]);
    }

    async getRecordsOrderBy(collecName: string, orderParam: string, typeOrder: number = 1) {
        return Promise.resolve([{ id: '1', data: 'mockData' }]);
    }

    async getRecordsConditionOrderBy(collecName: string, param: string, operator: any, value: any, orderParam: string, typeOrder: number = 1) {
        return Promise.resolve([{ id: '1', data: 'mockData' }]);
    }

    async saveRecord(collecName: string, params: any) {
        return Promise.resolve('newDocId');
    }

    async updateRecord(collecName: string, id: string, params: any): Promise<void> {
        return Promise.resolve();
    }

    async deleteRecord(collecName: string, id: string): Promise<void> {
        return Promise.resolve();
    }

    async uploadFile(folderName: string, file: any) {
        return Promise.resolve('https://mockurl.com/file');
    }

    async uploadFiles(folderId: string, files: any[]): Promise<void> {
        return Promise.resolve();
    }

    getFilesInFolder(folderId: string) {
        return from(Promise.resolve([
            {
                name: 'mockFile',
                url: 'https://mockurl.com/mockFile',
                contentType: 'text/plain',
                size: 100,
                timeCreated: new Date().toISOString(),
                updated: new Date().toISOString(),
                trans: {
                    fileRef: {},
                    metadata: {},
                    url: 'https://mockurl.com/mockFile'
                }
            }
        ]));
    }

    private getMimeType(file: any): string {
        return 'text/plain';
    }
}

