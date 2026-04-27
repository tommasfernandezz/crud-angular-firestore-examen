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
import { Patient } from '../models/patients.model';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private firestore = inject(Firestore);
    private collectionName = 'patients';
    private PatientsCollection = collection(this.firestore, this.collectionName);

    getAll(): Observable<Patient[]> {
        return collectionData(this.PatientsCollection, { idField: 'id' }) as Observable<Patient[]>;
    }

    create(patient: Patient) {
        const cleanPatient = this.removeId(patient);
        return addDoc(this.PatientsCollection, cleanPatient);
    }

    private removeId(patient: Patient): Omit<Patient, 'id'> {
        const { id, ...cleanPatient } = patient;
        return cleanPatient;
    }

    update(id: string, patient: Patient) {
        const patientDoc = doc(this.firestore, `${this.collectionName}/${id}`);
        const cleanPatient = this.removeId(patient);
        return updateDoc(patientDoc, { ...cleanPatient });
    }

    delete(id: string) {
        const patientDoc = doc(this.firestore, `${this.collectionName}/${id}`);
        return deleteDoc(patientDoc);
    }

}
