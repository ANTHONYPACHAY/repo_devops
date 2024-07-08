import {an} from "@fullcalendar/core/internal-common";

export interface CustomSwal {
    status: boolean;
    title: string;
    message: string;
}
export interface InfoDialog {
    title?: string;
    text?: string;
    status: boolean;
}
export interface ObjectItem {
    id: number;
    description: string;
}

export interface Login {
    user: string;
    password: string;
    confirmPassword?: string;
}

export interface Person {
    id?: string;
    uid_fb?: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    rol: number;
    active: boolean;
    dataTransent?: any;
}

export interface Author {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    numUses?: number;
}

export interface BasicEntity {
    id?: string;
    code: string;
    description: string;
    numUses?: number;
    color?: string;
}

export interface DtoBasicEntity {
    id?: string;
    entity?: BasicEntity
}

export interface DtoAuthor {
    id?: string;
    entity?: Author
}
export interface Script {
    id?: string;
    tittle: string;
    description: string;
    scriptType: DtoBasicEntity;
    tecnology: DtoBasicEntity[];
    operativeSystem: DtoBasicEntity;
    tool: DtoBasicEntity;
    authors: DtoAuthor[];
    views: number;
    downloads: number;
    valid: boolean;
    date_register: any;
}

export interface ViewsDownloads {
    id?: string;
    uid_script?: string;
    date: any;
    type: string;
}

export interface FileData {
    name: string;
    url: string;
    contentType?: string;
    size?: number;
    timeCreated?: string;
    updated?: string;
}
