export interface PatientTreatment {
  id: number;
  patientId: number;
  doctorId: number;
  treatmentType: string;
  startDate: string;
  endDate: string | null;
  status: 'ONGOING' | 'COMPLETED' | 'SCHEDULED';
  notes: string;
}

export const patientTreatments: PatientTreatment[] = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    treatmentType: 'Hemodialysis',
    startDate: '2023-01-20',
    endDate: null,
    status: 'ONGOING',
    notes: 'Three sessions per week',
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    treatmentType: 'Peritoneal Dialysis',
    startDate: '2023-02-25',
    endDate: '2023-08-25',
    status: 'COMPLETED',
    notes: 'Daily home treatment',
  },
  {
    id: 3,
    patientId: 3,
    doctorId: 3,
    treatmentType: 'Hemodialysis',
    startDate: '2023-03-15',
    endDate: null,
    status: 'ONGOING',
    notes: 'Two sessions per week',
  },
];
