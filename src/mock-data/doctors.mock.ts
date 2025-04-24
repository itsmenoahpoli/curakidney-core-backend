export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  contactNumber: string;
  email: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Nephrology",
    experience: 15,
    contactNumber: "+1234567893",
    email: "sarah.wilson@hospital.com"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Nephrology",
    experience: 12,
    contactNumber: "+1234567894",
    email: "michael.chen@hospital.com"
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialization: "Nephrology",
    experience: 8,
    contactNumber: "+1234567895",
    email: "emily.brown@hospital.com"
  }
];