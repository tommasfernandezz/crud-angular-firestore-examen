import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor } from '../../models/doctors.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
    selector: 'app-doctors-reactive',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
    private fb = inject(FormBuilder);
    private doctorService = inject(DoctorService);

    doctors$ = this.doctorService.getAll();

    editingId: string | null = null;
    errorMessage = '';

    doctorForm = this.fb.nonNullable.group({
        name: ['', Validators.required],
        speciality: ['', Validators.required]
    });

    async save() {
        this.errorMessage = '';

        if (this.doctorForm.invalid) {
            this.doctorForm.markAllAsTouched();
            this.errorMessage = 'Revisa los campos obligatorios antes de guardar.';
            return;
        }

        const doctor: Doctor = {
            ...this.doctorForm.getRawValue()
        };

        try {
            if (this.editingId) {
                await this.doctorService.update(this.editingId, doctor);
            } else {
                await this.doctorService.create(doctor);
            }

            this.cancel();
        } catch (error) {
            console.error(error);
            this.errorMessage = 'No se pudo guardar el doctor.';
        }
    }

    edit(doctor: Doctor) {
        this.editingId = doctor.id ?? null;

        this.doctorForm.patchValue({
            name: doctor.name,
            speciality: doctor.speciality
        });
    }

    async delete(id?: string) {
        if (!id) return;

        const confirmed = confirm('¿Seguro que quieres borrar este doctor?');
        if (!confirmed) return;

        try {
            await this.doctorService.delete(id);
        } catch (error) {
            console.error(error);
            this.errorMessage = 'No se pudo borrar el doctor.';
        }
    }

    cancel() {
        this.editingId = null;

        this.doctorForm.reset({
            name: '',
            speciality: ''
        });
    }

    hasError(controlName: keyof typeof this.doctorForm.controls, errorName: string): boolean {
        const control = this.doctorForm.controls[controlName];
        return control.hasError(errorName) && control.touched;
    }
}