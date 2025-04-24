import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create default user roles
  await prisma.userRole.createMany({
    data: [
      {
        name: 'administrator',
        description: 'Administrator role with full access',
      },
      {
        name: 'nephrologist',
        description: 'Regular nephrologist role with limited access',
      },
      {
        name: 'staff',
        description: 'Regular staff role with limited access',
      },
      {
        name: 'patient',
        description: 'Regular patient role with limited access',
      },
    ],
    skipDuplicates: true,
  });

  // Get created roles
  const adminRole = await prisma.userRole.findUnique({
    where: { name: 'administrator' },
  });
  const nephrologistRole = await prisma.userRole.findUnique({
    where: { name: 'nephrologist' },
  });
  const staffRole = await prisma.userRole.findUnique({
    where: { name: 'staff' },
  });
  const patientRole = await prisma.userRole.findUnique({
    where: { name: 'patient' },
  });

  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        userRoleId: adminRole.id,
      },
      {
        email: 'doctor@example.com',
        password: hashedPassword,
        name: 'Doctor User',
        userRoleId: nephrologistRole.id,
      },
      {
        email: 'staff@example.com',
        password: hashedPassword,
        name: 'Staff User',
        userRoleId: staffRole.id,
      },
      {
        email: 'patient@example.com',
        password: hashedPassword,
        name: 'Patient User',
        userRoleId: patientRole.id,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
