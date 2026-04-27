import {Doctor} from "./doctors.model";
import {Patient} from "./patients.model";

export interface Appointment {
    id?: string;
    doctor: Doctor;
    patient: Patient;
    "date & time": Date;
}
