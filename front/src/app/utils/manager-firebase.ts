// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Auth, Unsubscribe, onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
// import { getDatabase, ref, get, DataSnapshot, set, push, update, remove } from 'firebase/database';
import { getFirestore, getDocs, getDoc, collection, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, WhereFilterOp } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, getBlob, listAll, getMetadata } from 'firebase/storage';
import {finalize, forkJoin, from, Observable, switchMap} from 'rxjs';
import firebase from "firebase/compat";
import ThenableReference = firebase.database.ThenableReference;
import {environment} from "../../environments/environment";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {FileData} from "../interface/models";
import {map} from "rxjs/operators";
// import WhereFilterOp = firebase.firestore.WhereFilterOp;

// import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export class ManagerFirebase {

    private app;
    private auth:Auth;
    private database: any;
    private storage: any;

    constructor() {
        this.app = initializeApp(environment.firebaseConfig);

        this.auth = getAuth();
        this.database = getFirestore(this.app); // getFirestore() , getDatabase()
        this.storage = getStorage();
    }
    public async logIn(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    public async regist(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    // public fb_AuthStateChanged_aw(callback: (user: firebase.User | null) => void): Unsubscribe {
    //     return onAuthStateChanged(this.auth, callback);
    // }


    public forgetPwd(email: string): Promise<void> {
        return sendPasswordResetEmail(this.auth, email);
    }

    public fb_signOut(): Promise<void> {
        return signOut(this.auth);
    }

    // **2. Firestore**

    public async getRecord(collecName: string, id: string) {
        const docRef = doc(this.database, collecName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }; // Retorna el documento con su ID
        } else {
            console.log('No se encontró el documento');
            return null;
        }
    }

    public async getRecords(collecName: string) {
        const colRef = collection(this.database, collecName);
        const snapshot = await getDocs(colRef);
        const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return records;
    }

    public async getRecordsCondition(collecName: string, param: string, operator: WhereFilterOp, value: any) {
        const collectionRef = collection(this.database, collecName);
        const q = query(collectionRef, where(param, operator, value));

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    public async getRecordsOrderBy(collecName: string, orderParam: string, typeOrder: number = 1) {
        const collectionRef = collection(this.database, collecName);
        const q = query(collectionRef, orderBy(orderParam, typeOrder === 1 ? 'asc' : 'desc'));

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    public async getRecordsConditionOrderBy(collecName: string, param: string, operator: WhereFilterOp, value: any, orderParam: string, typeOrder: number = 1) {
        const collectionRef = collection(this.database, collecName);
        const q = query(collectionRef, where(param, operator, value), orderBy(orderParam, typeOrder === 1 ? 'asc' : 'desc'));

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    public async saveRecord(collecName: string, params: any) {
        const collectionRef = collection(this.database, collecName);
        const docRef = await addDoc(collectionRef, params);
        return docRef.id; // Retorna el ID del documento creado
    }

    public async updateRecord(collecName: string, id: string, params: any): Promise<void> {
        const docRef = doc(this.database, collecName, id);
        await updateDoc(docRef, params);
    }

    public async deleteRecord(collecName: string, id: string): Promise<void> {
        const docRef = doc(this.database, collecName, id);
        await deleteDoc(docRef);
    }


    public async uploadFile(folderName: string, file: File) {
        const stref = storageRef(this.storage, `/${folderName}/${file.name}`);
        await uploadBytes(stref, file);
        return await getDownloadURL(stref);
    }

    async uploadFiles(folderId: string, files: File[]): Promise<void> {
        for (const file of files) {
            const filePath = `${folderId}/${file.name}`;
            const stref = storageRef(this.storage, filePath);
            try {
                await uploadBytes(stref, file);
                const url = await getDownloadURL(stref);
                console.log('File available at', url);
            } catch (error) {
                console.error('Error uploading file:', file.name, error);
            }
        }
    }
    getFilesInFolder(folderId: string): Observable<FileData[]> {
        const folderRef = storageRef(this.storage, folderId);

        return from(listAll(folderRef)).pipe(
            switchMap(result => {
                const fileDataObservables = result.items.map(fileRef =>
                    from(getMetadata(fileRef)).pipe(
                        switchMap(metadata =>
                            from(getDownloadURL(fileRef)).pipe(
                                map(url => ({
                                    name: fileRef.name,
                                    url,
                                    contentType: metadata.contentType,
                                    size: metadata.size,
                                    timeCreated: metadata.timeCreated,
                                    updated: metadata.updated
                                }))
                            )
                        // from(getBlob(fileRef)).pipe(
                        //         map(blob => ({
                        //             name: fileRef.name,
                        //             blob,
                        //             contentType: metadata.contentType,
                        //             size: metadata.size,
                        //             timeCreated: metadata.timeCreated,
                        //             updated: metadata.updated
                        //         }))
                        //     )
                        )
                    )
                );
                return forkJoin(fileDataObservables);
            })
        );
    }
}
