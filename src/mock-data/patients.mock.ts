export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  diagnosisDate: string;
  contactNumber: string;
}

export const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    bloodType: "A+",
    diagnosisDate: "2023-01-15",
    contactNumber: "+1234567890"
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 38,
    gender: "Female",
    bloodType: "O-",
    diagnosisDate: "2023-02-20",
    contactNumber: "+1234567891"
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 52,
    gender: "Male",
    bloodType: "B+",
    diagnosisDate: "2023-03-10",
    contactNumber: "+1234567892"
  }
];