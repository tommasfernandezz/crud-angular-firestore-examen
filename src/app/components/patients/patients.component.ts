import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../models/patients.model';
import { PatientService } from '../../services/patient.service';

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.css'
})
export class PatientsComponent {
    private fb = inject(FormBuilder);
    private patientService = inject(PatientService);

    patients$ = this.patientService.getAll();

    editingId: string | null = null;
    errorMessage = '';

    patientForm = this.fb.nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
    });

    async save() {
        this.errorMessage = '';

        if (this.patientForm.invalid) {
            this.patientForm.markAllAsTouched();
            this.errorMessage = 'Revisa los campos obligatorios antes de guardar.';
            return;
        }

        const patient: Patient = {
            ...this.patientForm.getRawValue()
        };

        try {
            if (this.editingId) {
                await this.patientService.update(this.editingId, patient);
            } else {
                await this.patientService.create(patient);
            }

            this.cancel();
        } catch (error) {
            console.error(error);
            this.errorMessage = 'No se pudo guardar el paciente.';
        }
    }

    edit(patient: Patient) {
        this.editingId = patient.id ?? null;

        this.patientForm.patchValue({
            name: patient.name,
            email: patient.email
        });
    }

    async delete(id?: string) {
        if (!id) return;

        const confirmed = confirm('¿Seguro que quieres borrar este paciente?');
        if (!confirmed) return;

        try {
            await this.patientService.delete(id);
        } catch (error) {
            console.error(error);
            this.errorMessage = 'No se pudo borrar el paciente.';
        }
    }

    cancel() {
        this.editingId = null;

        this.patientForm.reset({
            name: '',
            email: ''
        });
    }

    hasError(controlName: keyof typeof this.patientForm.controls, errorName: string): boolean {
        const control = this.patientForm.controls[controlName];
        return control.hasError(errorName) && control.touched;
    }
}