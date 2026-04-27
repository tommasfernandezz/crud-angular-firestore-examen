import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctors.model';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private firestore = inject(Firestore);
    private collectionName = 'doctors';
    private DoctorsCollection = collection(this.firestore, this.collectionName);

    getAll(): Observable<Doctor[]> {
        return collectionData(this.DoctorsCollection, { idField: 'id' }) as Observable<Doctor[]>;
    }

    create(doctor: Doctor) {
        const cleanDoctor = this.removeId(doctor);
        return addDoc(this.DoctorsCollection, cleanDoctor);
    }

    private removeId(doctor: Doctor): Omit<Doctor, 'id'> {
        const { id, ...cleanDoctor } = doctor;
        return cleanDoctor;
    }

    update(id: string, doctor: Doctor) {
        const doctorDoc = doc(this.firestore, `${this.collectionName}/${id}`);
        const cleanDoctor = this.removeId(doctor);
        return updateDoc(doctorDoc, { ...cleanDoctor });
    }

    delete(id: string) {
        const doctorDoc = doc(this.firestore, `${this.collectionName}/${id}`);
        return deleteDoc(doctorDoc);
    }

}
