import { PrismaClient, Role, OwnerType, ServiceRequestStatus, SurveyStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function makeRef(prefix: string) {
  const d = new Date();
  const y = d.getFullYear();
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${y}-${n}`;
}

async function main() {
  const existingClient = await prisma.client.findFirst({
    where: { name: "Nova Logistics" }
  });
  
  const clientA =
    existingClient ??
    (await prisma.client.create({
      data: { name: "Nova Logistics", status: "ACTIVE" }
    }));

  const adminEmail = "admin@dcm.local";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash("Admin123!", 10),
      role: Role.ADMIN,
      clientId: clientA.id
    }
  });

  await prisma.serviceRequest.createMany({
    data: [
      {
        reference: makeRef("SR"),
        clientId: clientA.id,
        subject: "Network latency on VLAN 200",
        description: "Users report increased latency; investigate switch uplinks and QoS.",
        status: ServiceRequestStatus.IN_PROGRESS,
        priority: "high",
        assigneeId: admin.id
      },
      {
        reference: makeRef("SR"),
        clientId: clientA.id,
        subject: "Scheduled power maintenance Zone C",
        description: "Planned maintenance; confirm outage window and comms.",
        status: ServiceRequestStatus.ASSIGNED,
        priority: "medium",
        assigneeId: admin.id
      }
    ],
    skipDuplicates: true
  });

  await prisma.asset.createMany({
    data: [
      {
        assetTag: "DC-UPS-004",
        name: "APC Smart-UPS 3000",
        assetType: "UPS",
        ownerType: OwnerType.INTERNAL,
        location: "Rack A3"
      },
      {
        assetTag: "DC-PDU-015",
        name: "Raritan PX3-5000",
        assetType: "PDU",
        ownerType: OwnerType.INTERNAL,
        location: "Rack B1"
      }
    ],
    skipDuplicates: true
  });

  const survey = await prisma.survey.create({
    data: {
      clientId: clientA.id,
      title: "Q1 2026 Facility Walkthrough",
      surveyType: "Facility",
      status: SurveyStatus.IN_PROGRESS,
      scheduledAt: new Date(),
      assigneeId: admin.id,
      items: {
        create: [
          { label: "Fire exits clear and signed" },
          { label: "UPS alarms checked" },
          { label: "Cooling operating within range" }
        ]
      }
    }
  });

  console.log("Seed complete:", { clientA: clientA.id, admin: admin.email, survey: survey.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
