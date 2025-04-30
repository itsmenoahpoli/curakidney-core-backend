export interface PatientTreatment {
  id: number;
  patientId: number;
  doctorId: number;
  doctorName: string;
  treatmentType: string;
  startDate: string;
  endDate: string | null;
  status: 'ONGOING' | 'COMPLETED' | 'SCHEDULED';
  notes: string;
  amount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'CANCELLED';
}

export const patientTreatments: PatientTreatment[] = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    doctorName: 'Dr. Patrick Policarpio',
    treatmentType: 'Hemodialysis',
    startDate: '2023-01-20',
    endDate: null,
    status: 'ONGOING',
    notes: 'Three sessions per week',
    amount: 2500,
    paymentStatus: 'PENDING',
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 1,
    doctorName: 'Dr. Patrick Policarpio',
    treatmentType: 'Peritoneal Dialysis',
    startDate: '2023-02-25',
    endDate: '2023-08-25',
    status: 'COMPLETED',
    notes: 'Daily home treatment',
    amount: 3000,
    paymentStatus: 'PENDING',
  },
  {
    id: 3,
    patientId: 3,
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    treatmentType: 'Hemodialysis',
    startDate: '2023-03-15',
    endDate: null,
    status: 'ONGOING',
    notes: 'Two sessions per week',
    amount: 2500,
    paymentStatus: 'PENDING',
  },
  {
    id: 4,
    patientId: 4,
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    treatmentType: 'Hemodialysis',
    startDate: '2023-04-10',
    endDate: null,
    status: 'ONGOING',
    notes: 'Three sessions per week',
    amount: 2500,
    paymentStatus: 'PENDING',
  },
  {
    id: 5,
    patientId: 5,
    doctorId: 3,
    doctorName: 'Dr. Emily Brown',
    treatmentType: 'Peritoneal Dialysis',
    startDate: '2023-05-05',
    endDate: null,
    status: 'ONGOING',
    notes: 'Daily home treatment',
    amount: 3000,
    paymentStatus: 'PENDING',
  },
  {
    id: 6,
    patientId: 6,
    doctorId: 3,
    doctorName: 'Dr. Emily Brown',
    treatmentType: 'Hemodialysis',
    startDate: '2023-06-01',
    endDate: null,
    status: 'SCHEDULED',
    notes: 'Two sessions per week',
    amount: 2500,
    paymentStatus: 'PENDING',
  },
];
