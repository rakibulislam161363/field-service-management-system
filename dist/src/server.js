
        import { createRequire } from 'module';
        const require = createRequire(import.meta.url)
        
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express2 from "express";

// src/app/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bak_url: process.env.APP_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  tester_admin_name: process.env.TESTER_ADMIN_NAME,
  tester_admin_email: process.env.TESTER_ADMIN_EMAIL,
  tester_admin_password: process.env.TESTER_ADMIN_PASSWORD,
  tester_doctor_name: process.env.TESTER_DOCTOR_NAME,
  tester_doctor_email: process.env.TESTER_DOCTOR_EMAIL,
  tester_doctor_password: process.env.TESTER_DOCTOR_PASSWORD,
  redis_user: process.env.REDIS_USER,
  redis_password: process.env.REDIS_PASSWORD,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  email_sender: process.env.EMAIL_SENDER,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  bkash_base_url: process.env.BKASH_BASE_URL,
  bkash_username: process.env.BKASH_USERNAME,
  bkash_password: process.env.BKASH_PASSWORD,
  bkash_app_key: process.env.BKASH_APP_KEY,
  bkash_app_secret: process.env.BKASH_APP_SECRET,
  bkash_callback_url: process.env.BKASH_CALLBACK_URL
};

// src/app/module/auth/auth.route.ts
import { Router } from "express";

// src/generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  MANAGER: "MANAGER",
  FINANCE: "FINANCE",
  ADMIN: "ADMIN"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};
var AuthProvider = {
  GOOGLE: "GOOGLE",
  CREDENTIAL: "CREDENTIAL"
};

// src/app/middleware/checkAuth.ts
import httpStatus from "http-status";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.0",
  "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Assignment {\n  id               String           @id @default(cuid())\n  serviceRequestId String\n  technicianId     String\n  assignedById     String\n  scheduledAt      DateTime?\n  status           AssignmentStatus @default(PENDING)\n  notes            String?\n  createdAt        DateTime         @default(now())\n  updatedAt        DateTime         @updatedAt\n\n  serviceRequest ServiceRequest    @relation(fields: [serviceRequestId], references: [id], onDelete: Cascade)\n  technician     TechnicianProfile @relation(fields: [technicianId], references: [id])\n\n  assignedBy User @relation(fields: [assignedById], references: [id])\n\n  workOrder WorkOrder?\n\n  @@index([technicianId, scheduledAt])\n}\n\nmodel Attachment {\n  id               String   @id @default(cuid())\n  serviceRequestId String?\n  workOrderId      String?\n  fileUrl          String\n  fileName         String?\n  fileType         String?\n  createdAt        DateTime @default(now())\n\n  serviceRequest ServiceRequest? @relation(fields: [serviceRequestId], references: [id], onDelete: Cascade)\n\n  workOrder WorkOrder? @relation(fields: [workOrderId], references: [id], onDelete: Cascade)\n}\n\nmodel CustomerProfile {\n  id        String   @id @default(cuid())\n  name      String\n  email     String   @unique\n  userId    String   @unique\n  address   String?\n  city      String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nenum Role {\n  CUSTOMER\n  TECHNICIAN\n  MANAGER\n  FINANCE\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum AuthProvider {\n  GOOGLE\n  CREDENTIAL\n}\n\nenum ServiceRequestStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  ASSIGNED\n  SCHEDULED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum AssignmentStatus {\n  PENDING\n  ACCEPTED\n  REJECTED\n  COMPLETED\n  CANCELLED\n}\n\nenum WorkOrderStatus {\n  ASSIGNED\n  SCHEDULED\n  TECHNICIAN_ARRIVED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum InvoiceStatus {\n  UNPAID\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n}\n\nmodel Feedback {\n  id               String   @id @default(cuid())\n  serviceRequestId String   @unique\n  customerId       String\n  rating           Int\n  comment          String?\n  createdAt        DateTime @default(now())\n\n  serviceRequest ServiceRequest @relation(fields: [serviceRequestId], references: [id], onDelete: Cascade)\n\n  customer User @relation(fields: [customerId], references: [id])\n}\n\nmodel Invoice {\n  id               String        @id @default(cuid())\n  serviceRequestId String        @unique\n  customerId       String\n  amount           Decimal       @db.Decimal(10, 2)\n  status           InvoiceStatus @default(UNPAID)\n  dueDate          DateTime?\n  createdAt        DateTime      @default(now())\n  updatedAt        DateTime      @updatedAt\n\n  serviceRequest ServiceRequest @relation(fields: [serviceRequestId], references: [id])\n\n  customer User @relation(fields: [customerId], references: [id])\n\n  payments Payment[]\n}\n\nmodel Notification {\n  id String @id @default(cuid())\n\n  title     String\n  message   String\n  isRead    Boolean  @default(false)\n  createdAt DateTime @default(now())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel Payment {\n  id            String        @id @default(cuid())\n  invoiceId     String\n  customerId    String\n  amount        Decimal       @db.Decimal(10, 2)\n  status        PaymentStatus @default(PENDING)\n  transactionId String?       @unique\n  paymentMethod String?\n  paidAt        DateTime?\n  createdAt     DateTime      @default(now())\n\n  invoice Invoice @relation(fields: [invoiceId], references: [id])\n\n  customer User @relation(fields: [customerId], references: [id])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel ServiceCategory {\n  id          String   @id @default(cuid())\n  name        String   @unique\n  description String?\n  basePrice   Decimal? @db.Decimal(10, 2)\n  createdAt   DateTime @default(now())\n\n  serviceRequests ServiceRequest[]\n}\n\nmodel ServiceReport {\n  id               String   @id @default(cuid())\n  serviceRequestId String   @unique\n  workOrderId      String   @unique\n  technicianNotes  String?\n  workDescription  String?\n  materialsUsed    String?\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  serviceRequest ServiceRequest @relation(fields: [serviceRequestId], references: [id], onDelete: Cascade)\n\n  workOrder WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade)\n}\n\nmodel ServiceRequest {\n  id            String               @id @default(cuid())\n  customerId    String\n  categoryId    String\n  title         String\n  description   String\n  address       String\n  preferredDate DateTime?\n  status        ServiceRequestStatus @default(PENDING)\n  createdAt     DateTime             @default(now())\n  updatedAt     DateTime             @updatedAt\n\n  customer User @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  category ServiceCategory @relation(fields: [categoryId], references: [id])\n\n  assignments   Assignment[]\n  workOrder     WorkOrder?\n  attachments   Attachment[]\n  serviceReport ServiceReport?\n  invoice       Invoice?\n  feedback      Feedback?\n}\n\nmodel Skill {\n  id          String   @id @default(cuid())\n  name        String   @unique\n  description String?\n  createdAt   DateTime @default(now())\n\n  technicianSkills TechnicianSkill[]\n}\n\nmodel TechnicianProfile {\n  id          String   @id @default(cuid())\n  userId      String   @unique\n  bio         String?\n  experience  Int?\n  isAvailable Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  technicianSkills TechnicianSkill[]\n  assignments      Assignment[]\n}\n\nmodel TechnicianSkill {\n  id           String @id @default(cuid())\n  technicianId String\n  skillId      String\n\n  technician TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade)\n\n  skill Skill @relation(fields: [skillId], references: [id], onDelete: Cascade)\n\n  @@unique([technicianId, skillId])\n}\n\nmodel User {\n  id                 String       @id @default(cuid())\n  name               String\n  email              String       @unique\n  password           String?\n  phone              String?\n  googleId           String?      @unique\n  role               Role         @default(CUSTOMER)\n  createdAt          DateTime     @default(now())\n  updatedAt          DateTime     @updatedAt\n  authProvider       AuthProvider @default(CREDENTIAL)\n  emailVerified      Boolean      @default(false)\n  status             UserStatus   @default(ACTIVE)\n  needPasswordChange Boolean      @default(false)\n  imageUrl           String       @default("")\n  imagePublicId      String       @default("")\n  isDeleted          Boolean      @default(false)\n\n  customerProfile   CustomerProfile?\n  technicianProfile TechnicianProfile?\n\n  serviceRequests ServiceRequest[]\n  assignments     Assignment[]\n  notifications   Notification[]\n  invoices        Invoice[]\n  payments        Payment[]\n  feedbacks       Feedback[]\n\n  @@map("users")\n}\n\nmodel WorkOrder {\n  id               String          @id @default(cuid())\n  serviceRequestId String          @unique\n  assignmentId     String          @unique\n  status           WorkOrderStatus @default(ASSIGNED)\n  startedAt        DateTime?\n  completedAt      DateTime?\n  createdAt        DateTime        @default(now())\n  updatedAt        DateTime        @updatedAt\n\n  serviceRequest ServiceRequest @relation(fields: [serviceRequestId], references: [id], onDelete: Cascade)\n\n  assignment Assignment @relation(fields: [assignmentId], references: [id])\n\n  attachments   Attachment[]\n  serviceReport ServiceReport?\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Assignment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceRequestId","kind":"scalar","type":"String"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"assignedById","kind":"scalar","type":"String"},{"name":"scheduledAt","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"AssignmentStatus"},{"name":"notes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequest","kind":"object","type":"ServiceRequest","relationName":"AssignmentToServiceRequest"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"AssignmentToTechnicianProfile"},{"name":"assignedBy","kind":"object","type":"User","relationName":"AssignmentToUser"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"AssignmentToWorkOrder"}],"dbName":null,"schema":null},"Attachment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceRequestId","kind":"scalar","type":"String"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"fileUrl","kind":"scalar","type":"String"},{"name":"fileName","kind":"scalar","type":"String"},{"name":"fileType","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequest","kind":"object","type":"ServiceRequest","relationName":"AttachmentToServiceRequest"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"AttachmentToWorkOrder"}],"dbName":null,"schema":null},"CustomerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"CustomerProfileToUser"}],"dbName":null,"schema":null},"Feedback":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceRequestId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequest","kind":"object","type":"ServiceRequest","relationName":"FeedbackToServiceRequest"},{"name":"customer","kind":"object","type":"User","relationName":"FeedbackToUser"}],"dbName":null,"schema":null},"Invoice":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceRequestId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"InvoiceStatus"},{"name":"dueDate","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequest","kind":"object","type":"ServiceRequest","relationName":"InvoiceToServiceRequest"},{"name":"customer","kind":"object","type":"User","relationName":"InvoiceToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"InvoiceToPayment"}],"dbName":null,"schema":null},"Notification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"NotificationToUser"}],"dbName":null,"schema":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"invoiceId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"invoice","kind":"object","type":"Invoice","relationName":"InvoiceToPayment"},{"name":"customer","kind":"object","type":"User","relationName":"PaymentToUser"}],"dbName":null,"schema":null},"ServiceCategory":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"basePrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequests","kind":"object","type":"ServiceRequest","relationName":"ServiceCategoryToServiceRequest"}],"dbName":null,"schema":null},"ServiceReport":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceRequestId","kind":"scalar","type":"String"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"technicianNotes","kind":"scalar","type":"String"},{"name":"workDescription","kind":"scalar","type":"String"},{"name":"materialsUsed","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequest","kind":"object","type":"ServiceRequest","relationName":"ServiceReportToServiceRequest"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ServiceReportToWorkOrder"}],"dbName":null,"schema":null},"ServiceRequest":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"preferredDate","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"ServiceRequestStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"ServiceRequestToUser"},{"name":"category","kind":"object","type":"ServiceCategory","relationName":"ServiceCategoryToServiceRequest"},{"name":"assignments","kind":"object","type":"Assignment","relationName":"AssignmentToServiceRequest"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ServiceRequestToWorkOrder"},{"name":"attachments","kind":"object","type":"Attachment","relationName":"AttachmentToServiceRequest"},{"name":"serviceReport","kind":"object","type":"ServiceReport","relationName":"ServiceReportToServiceRequest"},{"name":"invoice","kind":"object","type":"Invoice","relationName":"InvoiceToServiceRequest"},{"name":"feedback","kind":"object","type":"Feedback","relationName":"FeedbackToServiceRequest"}],"dbName":null,"schema":null},"Skill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"technicianSkills","kind":"object","type":"TechnicianSkill","relationName":"SkillToTechnicianSkill"}],"dbName":null,"schema":null},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"technicianSkills","kind":"object","type":"TechnicianSkill","relationName":"TechnicianProfileToTechnicianSkill"},{"name":"assignments","kind":"object","type":"Assignment","relationName":"AssignmentToTechnicianProfile"}],"dbName":null,"schema":null},"TechnicianSkill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"skillId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToTechnicianSkill"},{"name":"skill","kind":"object","type":"Skill","relationName":"SkillToTechnicianSkill"}],"dbName":null,"schema":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"customerProfile","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToUser"},{"name":"technicianProfile","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"serviceRequests","kind":"object","type":"ServiceRequest","relationName":"ServiceRequestToUser"},{"name":"assignments","kind":"object","type":"Assignment","relationName":"AssignmentToUser"},{"name":"notifications","kind":"object","type":"Notification","relationName":"NotificationToUser"},{"name":"invoices","kind":"object","type":"Invoice","relationName":"InvoiceToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"},{"name":"feedbacks","kind":"object","type":"Feedback","relationName":"FeedbackToUser"}],"dbName":"users","schema":null},"WorkOrder":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"serviceRequestId","kind":"scalar","type":"String"},{"name":"assignmentId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"WorkOrderStatus"},{"name":"startedAt","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"serviceRequest","kind":"object","type":"ServiceRequest","relationName":"ServiceRequestToWorkOrder"},{"name":"assignment","kind":"object","type":"Assignment","relationName":"AssignmentToWorkOrder"},{"name":"attachments","kind":"object","type":"Attachment","relationName":"AttachmentToWorkOrder"},{"name":"serviceReport","kind":"object","type":"ServiceReport","relationName":"ServiceReportToWorkOrder"}],"dbName":null,"schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","customerProfile","orderBy","cursor","technician","technicianSkills","_count","skill","assignments","technicianProfile","serviceRequests","notifications","serviceRequest","customer","invoice","payments","invoices","feedbacks","category","assignment","workOrder","attachments","serviceReport","feedback","assignedBy","Assignment.findUnique","Assignment.findUniqueOrThrow","Assignment.findFirst","Assignment.findFirstOrThrow","Assignment.findMany","data","Assignment.createOne","Assignment.createMany","Assignment.createManyAndReturn","Assignment.updateOne","Assignment.updateMany","Assignment.updateManyAndReturn","create","update","Assignment.upsertOne","Assignment.deleteOne","Assignment.deleteMany","having","_min","_max","Assignment.groupBy","Assignment.aggregate","Attachment.findUnique","Attachment.findUniqueOrThrow","Attachment.findFirst","Attachment.findFirstOrThrow","Attachment.findMany","Attachment.createOne","Attachment.createMany","Attachment.createManyAndReturn","Attachment.updateOne","Attachment.updateMany","Attachment.updateManyAndReturn","Attachment.upsertOne","Attachment.deleteOne","Attachment.deleteMany","Attachment.groupBy","Attachment.aggregate","CustomerProfile.findUnique","CustomerProfile.findUniqueOrThrow","CustomerProfile.findFirst","CustomerProfile.findFirstOrThrow","CustomerProfile.findMany","CustomerProfile.createOne","CustomerProfile.createMany","CustomerProfile.createManyAndReturn","CustomerProfile.updateOne","CustomerProfile.updateMany","CustomerProfile.updateManyAndReturn","CustomerProfile.upsertOne","CustomerProfile.deleteOne","CustomerProfile.deleteMany","CustomerProfile.groupBy","CustomerProfile.aggregate","Feedback.findUnique","Feedback.findUniqueOrThrow","Feedback.findFirst","Feedback.findFirstOrThrow","Feedback.findMany","Feedback.createOne","Feedback.createMany","Feedback.createManyAndReturn","Feedback.updateOne","Feedback.updateMany","Feedback.updateManyAndReturn","Feedback.upsertOne","Feedback.deleteOne","Feedback.deleteMany","_avg","_sum","Feedback.groupBy","Feedback.aggregate","Invoice.findUnique","Invoice.findUniqueOrThrow","Invoice.findFirst","Invoice.findFirstOrThrow","Invoice.findMany","Invoice.createOne","Invoice.createMany","Invoice.createManyAndReturn","Invoice.updateOne","Invoice.updateMany","Invoice.updateManyAndReturn","Invoice.upsertOne","Invoice.deleteOne","Invoice.deleteMany","Invoice.groupBy","Invoice.aggregate","Notification.findUnique","Notification.findUniqueOrThrow","Notification.findFirst","Notification.findFirstOrThrow","Notification.findMany","Notification.createOne","Notification.createMany","Notification.createManyAndReturn","Notification.updateOne","Notification.updateMany","Notification.updateManyAndReturn","Notification.upsertOne","Notification.deleteOne","Notification.deleteMany","Notification.groupBy","Notification.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","ServiceCategory.findUnique","ServiceCategory.findUniqueOrThrow","ServiceCategory.findFirst","ServiceCategory.findFirstOrThrow","ServiceCategory.findMany","ServiceCategory.createOne","ServiceCategory.createMany","ServiceCategory.createManyAndReturn","ServiceCategory.updateOne","ServiceCategory.updateMany","ServiceCategory.updateManyAndReturn","ServiceCategory.upsertOne","ServiceCategory.deleteOne","ServiceCategory.deleteMany","ServiceCategory.groupBy","ServiceCategory.aggregate","ServiceReport.findUnique","ServiceReport.findUniqueOrThrow","ServiceReport.findFirst","ServiceReport.findFirstOrThrow","ServiceReport.findMany","ServiceReport.createOne","ServiceReport.createMany","ServiceReport.createManyAndReturn","ServiceReport.updateOne","ServiceReport.updateMany","ServiceReport.updateManyAndReturn","ServiceReport.upsertOne","ServiceReport.deleteOne","ServiceReport.deleteMany","ServiceReport.groupBy","ServiceReport.aggregate","ServiceRequest.findUnique","ServiceRequest.findUniqueOrThrow","ServiceRequest.findFirst","ServiceRequest.findFirstOrThrow","ServiceRequest.findMany","ServiceRequest.createOne","ServiceRequest.createMany","ServiceRequest.createManyAndReturn","ServiceRequest.updateOne","ServiceRequest.updateMany","ServiceRequest.updateManyAndReturn","ServiceRequest.upsertOne","ServiceRequest.deleteOne","ServiceRequest.deleteMany","ServiceRequest.groupBy","ServiceRequest.aggregate","Skill.findUnique","Skill.findUniqueOrThrow","Skill.findFirst","Skill.findFirstOrThrow","Skill.findMany","Skill.createOne","Skill.createMany","Skill.createManyAndReturn","Skill.updateOne","Skill.updateMany","Skill.updateManyAndReturn","Skill.upsertOne","Skill.deleteOne","Skill.deleteMany","Skill.groupBy","Skill.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","TechnicianSkill.findUnique","TechnicianSkill.findUniqueOrThrow","TechnicianSkill.findFirst","TechnicianSkill.findFirstOrThrow","TechnicianSkill.findMany","TechnicianSkill.createOne","TechnicianSkill.createMany","TechnicianSkill.createManyAndReturn","TechnicianSkill.updateOne","TechnicianSkill.updateMany","TechnicianSkill.updateManyAndReturn","TechnicianSkill.upsertOne","TechnicianSkill.deleteOne","TechnicianSkill.deleteMany","TechnicianSkill.groupBy","TechnicianSkill.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","WorkOrder.findUnique","WorkOrder.findUniqueOrThrow","WorkOrder.findFirst","WorkOrder.findFirstOrThrow","WorkOrder.findMany","WorkOrder.createOne","WorkOrder.createMany","WorkOrder.createManyAndReturn","WorkOrder.updateOne","WorkOrder.updateMany","WorkOrder.updateManyAndReturn","WorkOrder.upsertOne","WorkOrder.deleteOne","WorkOrder.deleteMany","WorkOrder.groupBy","WorkOrder.aggregate","AND","OR","NOT","id","serviceRequestId","assignmentId","WorkOrderStatus","status","startedAt","completedAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","name","email","password","phone","googleId","Role","role","AuthProvider","authProvider","emailVerified","UserStatus","needPasswordChange","imageUrl","imagePublicId","isDeleted","technicianId","skillId","userId","bio","experience","isAvailable","description","customerId","categoryId","title","address","preferredDate","ServiceRequestStatus","workOrderId","technicianNotes","workDescription","materialsUsed","basePrice","invoiceId","amount","PaymentStatus","transactionId","paymentMethod","paidAt","message","isRead","InvoiceStatus","dueDate","rating","comment","city","fileUrl","fileName","fileType","assignedById","scheduledAt","AssignmentStatus","notes","technicianId_skillId","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "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_ACABAAAAcwAgAQAAAAMAIAUHAACBBwAgLAAAgwcAIC0AAIIHACDFAgAAngQAINkCAACeBAAgC5ICAACABAAwkwIAAIgBABCUAgAAgAQAMJUCAQCjAwAhnAJAAKYDACGdAkAApgMAIawCAQCjAwAhrQIBAKMDACG9AgEAowMAIcUCAQC6AwAh2QIBALoDACEDAAAAAwAgAwAAhwEAMCsAAIgBACADAAAAAwAgAwAAdgAwBAAAcwAgAQAAACcAIAEAAAAnACADAAAAJQAgAwAAJgAwBAAAJwAgAwAAACUAIAMAACYAMAQAACcAIAMAAAAlACADAAAmADAEAAAnACAIDQAA5QQAIA4AAM8FACCVAgEAAAABlgIBAAAAAZwCQAAAAAHCAgEAAAAB1wICAAAAAdgCAQAAAAEBHwAAkAEAIAaVAgEAAAABlgIBAAAAAZwCQAAAAAHCAgEAAAAB1wICAAAAAdgCAQAAAAEBHwAAkgEAMAEfAACSAQAwCA0AAOMEACAOAADOBQAglQIBAKIEACGWAgEAogQAIZwCQAClBAAhwgIBAKIEACHXAgIA4QQAIdgCAQCvBAAhAgAAACcAIB8AAJUBACAGlQIBAKIEACGWAgEAogQAIZwCQAClBAAhwgIBAKIEACHXAgIA4QQAIdgCAQCvBAAhAgAAACUAIB8AAJcBACACAAAAJQAgHwAAlwEAIAMAAAAnACAmAACQAQAgJwAAlQEAIAEAAAAnACABAAAAJQAgBgcAAPwGACAsAAD_BgAgLQAA_gYAIF4AAP0GACBfAACABwAg2AIAAJ4EACAJkgIAAPwDADCTAgAAngEAEJQCAAD8AwAwlQIBAKMDACGWAgEAowMAIZwCQACmAwAhwgIBAKMDACHXAgIA_QMAIdgCAQC6AwAhAwAAACUAIAMAAJ0BADArAACeAQAgAwAAACUAIAMAACYAMAQAACcAIAEAAAAdACABAAAAHQAgAwAAABsAIAMAABwAMAQAAB0AIAMAAAAbACADAAAcADAEAAAdACADAAAAGwAgAwAAHAAwBAAAHQAgCw0AAJAFACAOAADWBQAgEAAAkQUAIJUCAQAAAAGWAgEAAAABmQIAAADWAgKcAkAAAAABnQJAAAAAAcICAQAAAAHOAhAAAAAB1gJAAAAAAQEfAACmAQAgCJUCAQAAAAGWAgEAAAABmQIAAADWAgKcAkAAAAABnQJAAAAAAcICAQAAAAHOAhAAAAAB1gJAAAAAAQEfAACoAQAwAR8AAKgBADALDQAAggUAIA4AANUFACAQAACDBQAglQIBAKIEACGWAgEAogQAIZkCAACABdYCIpwCQAClBAAhnQJAAKUEACHCAgEAogQAIc4CEADwBAAh1gJAAKQEACECAAAAHQAgHwAAqwEAIAiVAgEAogQAIZYCAQCiBAAhmQIAAIAF1gIinAJAAKUEACGdAkAApQQAIcICAQCiBAAhzgIQAPAEACHWAkAApAQAIQIAAAAbACAfAACtAQAgAgAAABsAIB8AAK0BACADAAAAHQAgJgAApgEAICcAAKsBACABAAAAHQAgAQAAABsAIAYHAAD3BgAgLAAA-gYAIC0AAPkGACBeAAD4BgAgXwAA-wYAINYCAACeBAAgC5ICAAD4AwAwkwIAALQBABCUAgAA-AMAMJUCAQCjAwAhlgIBAKMDACGZAgAA-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_AEAIAUNAADEBAAgFQAA2wYAIMkCAACeBAAgygIAAJ4EACDLAgAAngQAIAMAAAA6ACADAAD_AQAwBAAA_AEAIAMAAAA6ACADAAD_AQAwBAAA_AEAIAMAAAA6ACADAAD_AQAwBAAA_AEAIAoNAACxBAAgFQAA3QUAIJUCAQAAAAGWAgEAAAABnAJAAAAAAZ0CQAAAAAHIAgEAAAAByQIBAAAAAcoCAQAAAAHLAgEAAAABAR8AAIMCACAIlQIBAAAAAZYCAQAAAAGcAkAAAAABnQJAAAAAAcgCAQAAAAHJAgEAAAABygIBAAAAAcsCAQAAAAEBHwAAhQIAMAEfAACFAgAwCg0AALAEACAVAADcBQAglQIBAKIEACGWAgEAogQAIZwCQAClBAAhnQJAAKUEACHIAgEAogQAIckCAQCvBAAhygIBAK8EACHLAgEArwQAIQIAAAD8AQAgHwAAiAIAIAiVAgEAogQAIZYCAQCiBAAhnAJAAKUEACGdAkAApQQAIcgCAQCiBAAhyQIBAK8EACHKAgEArwQAIcsCAQCvBAAhAgAAADoAIB8AAIoCACACAAAAOgAgHwAAigIAIAMAAAD8AQAgJgAAgwIAICcAAIgCACABAAAA_AEAIAEAAAA6ACAGBwAA2AYAICwAANoGACAtAADZBgAgyQIAAJ4EACDKAgAAngQAIMsCAACeBAAgC5ICAADnAwAwkwIAAJECABCUAgAA5wMAMJUCAQCjAwAhlgIBAKMDACGcAkAApgMAIZ0CQACmAwAhyAIBAKMDACHJAgEAugMAIcoCAQC6AwAhywIBALoDACEDAAAAOgAgAwAAkAIAMCsAAJECACADAAAAOgAgAwAA_wEAMAQAAPwBACABAAAAFAAgAQAAABQAIAMAAAASACADAAATADAEAAAUACADAAAAEgAgAwAAEwAwBAAAFAAgAwAAABIAIAMAABMAMAQAABQAIBIJAAD7BQAgDgAA1wYAIA8AAP8FACATAAD6BQAgFQAA_AUAIBYAAP0FACAXAAD-BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAR8AAJkCACAKlQIBAAAAAZkCAAAAyAICnAJAAAAAAZ0CQAAAAAHBAgEAAAABwgIBAAAAAcMCAQAAAAHEAgEAAAABxQIBAAAAAcYCQAAAAAEBHwAAmwIAMAEfAACbAgAwEgkAAMMFACAOAADWBgAgDwAAxwUAIBMAAMIFACAVAADEBQAgFgAAxQUAIBcAAMYFACAYAADIBQAglQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcMCAQCiBAAhxAIBAKIEACHFAgEAogQAIcYCQACkBAAhAgAAABQAIB8AAJ4CACAKlQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcMCAQCiBAAhxAIBAKIEACHFAgEAogQAIcYCQACkBAAhAgAAABIAIB8AAKACACACAAAAEgAgHwAAoAIAIAMAAAAUACAmAACZAgAgJwAAngIAIAEAAAAUACABAAAAEgAgBAcAANMGACAsAADVBgAgLQAA1AYAIMYCAACeBAAgDZICAADjAwAwkwIAAKcCABCUAgAA4wMAMJUCAQCjAwAhmQIAAOQDyAIinAJAAKYDACGdAkAApgMAIcECAQCjAwAhwgIBAKMDACHDAgEAowMAIcQCAQCjAwAhxQIBAKMDACHGAkAApQMAIQMAAAASACADAACmAgAwKwAApwIAIAMAAAASACADAAATADAEAAAUACAIBgAA4AMAIJICAADiAwAwkwIAAK0CABCUAgAA4gMAMJUCAQAAAAGcAkAAtAMAIawCAQAAAAHBAgEAywMAIQEAAACqAgAgAQAAAKoCACAIBgAA4AMAIJICAADiAwAwkwIAAK0CABCUAgAA4gMAMJUCAQDKAwAhnAJAALQDACGsAgEAygMAIcECAQDLAwAhAgYAAMQGACDBAgAAngQAIAMAAACtAgAgAwAArgIAMAQAAKoCACADAAAArQIAIAMAAK4CADAEAACqAgAgAwAAAK0CACADAACuAgAwBAAAqgIAIAUGAADSBgAglQIBAAAAAZwCQAAAAAGsAgEAAAABwQIBAAAAAQEfAACyAgAgBJUCAQAAAAGcAkAAAAABrAIBAAAAAcECAQAAAAEBHwAAtAIAMAEfAAC0AgAwBQYAAMgGACCVAgEAogQAIZwCQAClBAAhrAIBAKIEACHBAgEArwQAIQIAAACqAgAgHwAAtwIAIASVAgEAogQAIZwCQAClBAAhrAIBAKIEACHBAgEArwQAIQIAAACtAgAgHwAAuQIAIAIAAACtAgAgHwAAuQIAIAMAAACqAgAgJgAAsgIAICcAALcCACABAAAAqgIAIAEAAACtAgAgBAcAAMUGACAsAADHBgAgLQAAxgYAIMECAACeBAAgB5ICAADhAwAwkwIAAMACABCUAgAA4QMAMJUCAQCjAwAhnAJAAKYDACGsAgEAowMAIcECAQC6AwAhAwAAAK0CACADAAC_AgAwKwAAwAIAIAMAAACtAgAgAwAArgIAMAQAAKoCACANAQAA3wMAIAYAAOADACAJAADTAwAgkgIAAN0DADCTAgAABQAQlAIAAN0DADCVAgEAAAABnAJAALQDACGdAkAAtAMAIb0CAQAAAAG-AgEAywMAIb8CAgDeAwAhwAIgAM4DACEBAAAAwwIAIAEAAADDAgAgBQEAAMMGACAGAADEBgAgCQAAsgYAIL4CAACeBAAgvwIAAJ4EACADAAAABQAgAwAAxgIAMAQAAMMCACADAAAABQAgAwAAxgIAMAQAAMMCACADAAAABQAgAwAAxgIAMAQAAMMCACAKAQAAwgYAIAYAAKAGACAJAAChBgAglQIBAAAAAZwCQAAAAAGdAkAAAAABvQIBAAAAAb4CAQAAAAG_AgIAAAABwAIgAAAAAQEfAADKAgAgB5UCAQAAAAGcAkAAAAABnQJAAAAAAb0CAQAAAAG-AgEAAAABvwICAAAAAcACIAAAAAEBHwAAzAIAMAEfAADMAgAwCgEAAMEGACAGAACHBgAgCQAAiAYAIJUCAQCiBAAhnAJAAKUEACGdAkAApQQAIb0CAQCiBAAhvgIBAK8EACG_AgIAhgYAIcACIADNBAAhAgAAAMMCACAfAADPAgAgB5UCAQCiBAAhnAJAAKUEACGdAkAApQQAIb0CAQCiBAAhvgIBAK8EACG_AgIAhgYAIcACIADNBAAhAgAAAAUAIB8AANECACACAAAABQAgHwAA0QIAIAMAAADDAgAgJgAAygIAICcAAM8CACABAAAAwwIAIAEAAAAFACAHBwAAvAYAICwAAL8GACAtAAC-BgAgXgAAvQYAIF8AAMAGACC-AgAAngQAIL8CAACeBAAgCpICAADZAwAwkwIAANgCABCUAgAA2QMAMJUCAQCjAwAhnAJAAKYDACGdAkAApgMAIb0CAQCjAwAhvgIBALoDACG_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_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_A7cCIgSeAgAAALcCAp8CAAAAtwIIoAIAAAC3AgilAgAAwAO3AiIFBwAAqAMAICwAAMIDACAtAADCAwAgngIgAAAAAaUCIADBAwAhAp4CIAAAAAGlAiAAwgMAIQcHAACoAwAgLAAAxAMAIC0AAMQDACCeAgAAALQCAp8CAAAAtAIIoAIAAAC0AgilAgAAwwO0AiIEngIAAAC0AgKfAgAAALQCCKACAAAAtAIIpQIAAMQDtAIiBwcAAKgDACAsAADGAwAgLQAAxgMAIJ4CAAAAsgICnwIAAACyAgigAgAAALICCKUCAADFA7ICIgSeAgAAALICAp8CAAAAsgIIoAIAAACyAgilAgAAxgOyAiIOBwAAqwMAICwAAMgDACAtAADIAwAgngIBAAAAAZ8CAQAAAAWgAgEAAAAFoQIBAAAAAaICAQAAAAGjAgEAAAABpAIBAAAAAaUCAQDHAwAhpgIBAAAAAacCAQAAAAGoAgEAAAABC54CAQAAAAGfAgEAAAAFoAIBAAAABaECAQAAAAGiAgEAAAABowIBAAAAAaQCAQAAAAGlAgEAyAMAIaYCAQAAAAGnAgEAAAABqAIBAAAAARsCAADQAwAgCQAA0wMAIAoAANEDACALAADSAwAgDAAA1AMAIBAAANYDACARAADVAwAgEgAA1wMAIJICAADJAwAwkwIAAPQCABCUAgAAyQMAMJUCAQDKAwAhmQIAAM8DtwIinAJAALQDACGdAkAAtAMAIawCAQDKAwAhrQIBAMoDACGuAgEAywMAIa8CAQDLAwAhsAIBAMsDACGyAgAAzAOyAiK0AgAAzQO0AiK1AiAAzgMAIbcCIADOAwAhuAIBAMoDACG5AgEAygMAIboCIADOAwAhC54CAQAAAAGfAgEAAAAEoAIBAAAABKECAQAAAAGiAgEAAAABowIBAAAAAaQCAQAAAAGlAgEAsAMAIaYCAQAAAAGnAgEAAAABqAIBAAAAAQueAgEAAAABnwIBAAAABaACAQAAAAWhAgEAAAABogIBAAAAAaMCAQAAAAGkAgEAAAABpQIBAMgDACGmAgEAAAABpwIBAAAAAagCAQAAAAEEngIAAACyAgKfAgAAALICCKACAAAAsgIIpQIAAMYDsgIiBJ4CAAAAtAICnwIAAAC0AgigAgAAALQCCKUCAADEA7QCIgKeAiAAAAABpQIgAMIDACEEngIAAAC3AgKfAgAAALcCCKACAAAAtwIIpQIAAMADtwIiDgEAAN8DACCSAgAAgQQAMJMCAAADABCUAgAAgQQAMJUCAQDKAwAhnAJAALQDACGdAkAAtAMAIawCAQDKAwAhrQIBAMoDACG9AgEAygMAIcUCAQDLAwAh2QIBAMsDACHiAgAAAwAg4wIAAAMAIA8BAADfAwAgBgAA4AMAIAkAANMDACCSAgAA3QMAMJMCAAAFABCUAgAA3QMAMJUCAQDKAwAhnAJAALQDACGdAkAAtAMAIb0CAQDKAwAhvgIBAMsDACG_AgIA3gMAIcACIADOAwAh4gIAAAUAIOMCAAAFACADqQIAABIAIKoCAAASACCrAgAAEgAgA6kCAAANACCqAgAADQAgqwIAAA0AIAOpAgAAFwAgqgIAABcAIKsCAAAXACADqQIAABsAIKoCAAAbACCrAgAAGwAgA6kCAAAfACCqAgAAHwAgqwIAAB8AIAOpAgAAJQAgqgIAACUAIKsCAAAlACAGkgIAANgDADCTAgAA7gIAEJQCAADYAwAwlQIBAKMDACG7AgEAowMAIbwCAQCjAwAhCpICAADZAwAwkwIAANgCABCUAgAA2QMAMJUCAQCjAwAhnAJAAKYDACGdAkAApgMAIb0CAQCjAwAhvgIBALoDACG_AgIA2gMAIcACIAC9AwAhDQcAAKsDACAsAACrAwAgLQAAqwMAIF4AANwDACBfAACrAwAgngICAAAAAZ8CAgAAAAWgAgIAAAAFoQICAAAAAaICAgAAAAGjAgIAAAABpAICAAAAAaUCAgDbAwAhDQcAAKsDACAsAACrAwAgLQAAqwMAIF4AANwDACBfAACrAwAgngICAAAAAZ8CAgAAAAWgAgIAAAAFoQICAAAAAaICAgAAAAGjAgIAAAABpAICAAAAAaUCAgDbAwAhCJ4CCAAAAAGfAggAAAAFoAIIAAAABaECCAAAAAGiAggAAAABowIIAAAAAaQCCAAAAAGlAggA3AMAIQ0BAADfAwAgBgAA4AMAIAkAANMDACCSAgAA3QMAMJMCAAAFABCUAgAA3QMAMJUCAQDKAwAhnAJAALQDACGdAkAAtAMAIb0CAQDKAwAhvgIBAMsDACG_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_AMAMJMCAACeAQAQlAIAAPwDADCVAgEAowMAIZYCAQCjAwAhnAJAAKYDACHCAgEAowMAIdcCAgD9AwAh2AIBALoDACENBwAAqAMAICwAAKgDACAtAACoAwAgXgAA_wMAIF8AAKgDACCeAgIAAAABnwICAAAABKACAgAAAAShAgIAAAABogICAAAAAaMCAgAAAAGkAgIAAAABpQICAP4DACENBwAAqAMAICwAAKgDACAtAACoAwAgXgAA_wMAIF8AAKgDACCeAgIAAAABnwICAAAABKACAgAAAAShAgIAAAABogICAAAAAaMCAgAAAAGkAgIAAAABpQICAP4DACEIngIIAAAAAZ8CCAAAAASgAggAAAAEoQIIAAAAAaICCAAAAAGjAggAAAABpAIIAAAAAaUCCAD_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-wcAICcAAP4HACDkAgAA_AcAIOUCAAD9BwAg5gIAABIAIOcCAAASACDoAgAAFAAgBw0AAL8EACCVAgEAAAABlgIBAAAAAZwCQAAAAAHaAgEAAAAB2wIBAAAAAdwCAQAAAAEDJgAA-wcAIOQCAAD8BwAg6AIAABQAIAMmAAD5BwAg5AIAAPoHACDoAgAAFAAgAyYAAPcHACDkAgAA-AcAIOgCAAABACAEJgAAsgQAMOQCAACzBAAw6AIAALYEADDpAgAAtQQAIAMmAACqBAAg5AIAAKsEACDoAgAA_AEAIAkJAACyBgAgDgAAwwYAIA8AAIwHACATAACNBwAgFQAA2wYAIBYAAMYEACAXAADHBAAgGAAAjgcAIMYCAACeBAAgBgUAALAGACANAADEBAAgFQAA2wYAIBkAAMMGACDeAgAAngQAIOACAACeBAAgAAUNAADEBAAgFQAA2wYAIMkCAACeBAAgygIAAJ4EACDLAgAAngQAIAAAAAHqAgAAALICAgHqAgAAALQCAgHqAiAAAAABAeoCAAAAtwICByYAAKIGACAnAAClBgAg5AIAAKMGACDlAgAApAYAIOYCAAADACDnAgAAAwAg6AIAAHMAIAcmAACBBgAgJwAAhAYAIOQCAACCBgAg5QIAAIMGACDmAgAABQAg5wIAAAUAIOgCAADDAgAgCyYAALYFADAnAAC7BQAw5AIAALcFADDlAgAAuAUAMOYCAAC6BQAw5wIAALoFADDoAgAAugUAMOkCAAC5BQAg6gIAALoFADDrAgAAvAUAMOwCAAC9BQAwCyYAAJ4FADAnAACjBQAw5AIAAJ8FADDlAgAAoAUAMOYCAACiBQAw5wIAAKIFADDoAgAAogUAMOkCAAChBQAg6gIAAKIFADDrAgAApAUAMOwCAAClBQAwCyYAAJIFADAnAACXBQAw5AIAAJMFADDlAgAAlAUAMOYCAACWBQAw5wIAAJYFADDoAgAAlgUAMOkCAACVBQAg6gIAAJYFADDrAgAAmAUAMOwCAACZBQAwCyYAAPYEADAnAAD7BAAw5AIAAPcEADDlAgAA-AQAMOYCAAD6BAAw5wIAAPoEADDoAgAA-gQAMOkCAAD5BAAg6gIAAPoEADDrAgAA_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_gQAIB8AAP8EACALkgIAAP0EADCTAgAA_gQAEJQCAAD9BAAwlQIBAMoDACGWAgEAygMAIZkCAACRBNYCIpwCQAC0AwAhnQJAALQDACHCAgEAygMAIc4CEACNBAAh1gJAALMDACELkgIAAP0EADCTAgAA_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-wUAIA8AAP8FACATAAD6BQAgFQAA_AUAIBYAAP0FACAXAAD-BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcMCAQAAAAHEAgEAAAABxQIBAAAAAcYCQAAAAAECAAAAFAAgJgAA-QUAIAMAAAAUACAmAAD5BQAgJwAAwQUAIAEfAADSBwAwFQkAANMDACAOAADfAwAgDwAAlgQAIBMAAJUEACAVAACJBAAgFgAAtwMAIBcAALgDACAYAACXBAAgkgIAAJMEADCTAgAAEgAQlAIAAJMEADCVAgEAAAABmQIAAJQEyAIinAJAALQDACGdAkAAtAMAIcECAQDKAwAhwgIBAMoDACHDAgEAygMAIcQCAQDKAwAhxQIBAMoDACHGAkAAswMAIQIAAAAUACAfAADBBQAgAgAAAL4FACAfAAC_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_BQAgEwAA-gUAIBUAAPwFACAWAAD9BQAgFwAA_gUAIBgAAIAGACCVAgEAAAABmQIAAADIAgKcAkAAAAABnQJAAAAAAcECAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAyYAALIHACDkAgAAswcAIOgCAADjAQAgBCYAAO4FADDkAgAA7wUAMOgCAACiBQAw6QIAAPEFACADJgAA6QUAIOQCAADqBQAg6AIAAIoDACAEJgAA3gUAMOQCAADfBQAw6AIAALYEADDpAgAA4QUAIAMmAADXBQAg5AIAANgFACDoAgAA_AEAIAMmAADQBQAg5AIAANEFACDoAgAAHQAgAyYAAMkFACDkAgAAygUAIOgCAAAnACAIBgAAoAYAIAkAAKEGACCVAgEAAAABnAJAAAAAAZ0CQAAAAAG-AgEAAAABvwICAAAAAcACIAAAAAECAAAAwwIAICYAAIEGACADAAAABQAgJgAAgQYAICcAAIUGACAKAAAABQAgBgAAhwYAIAkAAIgGACAfAACFBgAglQIBAKIEACGcAkAApQQAIZ0CQAClBAAhvgIBAK8EACG_AgIAhgYAIcACIADNBAAhCAYAAIcGACAJAACIBgAglQIBAKIEACGcAkAApQQAIZ0CQAClBAAhvgIBAK8EACG_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-wUAIA4AANcGACAPAAD_BQAgFQAA_AUAIBYAAP0FACAXAAD-BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHEAgEAAAABxQIBAAAAAcYCQAAAAAECAAAAFAAgJgAA6wYAIAMAAAAUACAmAADrBgAgJwAA6gYAIAEfAACaBwAwAgAAABQAIB8AAOoGACACAAAAvgUAIB8AAOkGACAJlQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIRAJAADDBQAgDgAA1gYAIA8AAMcFACAVAADEBQAgFgAAxQUAIBcAAMYFACAYAADIBQAglQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIRAJAAD7BQAgDgAA1wYAIA8AAP8FACAVAAD8BQAgFgAA_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_AUAIBYAAP0FACAXAAD-BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAgAAABQAICYAANUHACADAAAABQAgJgAA0wcAICcAANkHACALAAAABQAgAQAAwQYAIAYAAIcGACAfAADZBwAglQIBAKIEACGcAkAApQQAIZ0CQAClBAAhvQIBAKIEACG-AgEArwQAIb8CAgCGBgAhwAIgAM0EACEJAQAAwQYAIAYAAIcGACCVAgEAogQAIZwCQAClBAAhnQJAAKUEACG9AgEAogQAIb4CAQCvBAAhvwICAIYGACHAAiAAzQQAIQMAAAASACAmAADVBwAgJwAA3AcAIBMAAAASACAOAADWBgAgDwAAxwUAIBMAAMIFACAVAADEBQAgFgAAxQUAIBcAAMYFACAYAADIBQAgHwAA3AcAIJUCAQCiBAAhmQIAAMAFyAIinAJAAKUEACGdAkAApQQAIcECAQCiBAAhwgIBAKIEACHDAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIREOAADWBgAgDwAAxwUAIBMAAMIFACAVAADEBQAgFgAAxQUAIBcAAMYFACAYAADIBQAglQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcMCAQCiBAAhxAIBAKIEACHFAgEAogQAIcYCQACkBAAhCJUCAQAAAAGWAgEAAAABmQIAAADgAgKcAkAAAAABnQJAAAAAAbsCAQAAAAHeAkAAAAAB4AIBAAAAAQWVAgEAAAABnAJAAAAAAcQCAQAAAAHTAgEAAAAB1AIgAAAAAREJAAD7BQAgDgAA1wYAIBMAAPoFACAVAAD8BQAgFgAA_QUAIBcAAP4FACAYAACABgAglQIBAAAAAZkCAAAAyAICnAJAAAAAAZ0CQAAAAAHBAgEAAAABwgIBAAAAAcMCAQAAAAHEAgEAAAABxQIBAAAAAcYCQAAAAAECAAAAFAAgJgAA3wcAIBcCAACnBgAgCQAAqgYAIAoAAKgGACALAACpBgAgDAAAqwYAIBEAAKwGACASAACuBgAglQIBAAAAAZkCAAAAtwICnAJAAAAAAZ0CQAAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAAAABsAIBAAAAAbICAAAAsgICtAIAAAC0AgK1AiAAAAABtwIgAAAAAbgCAQAAAAG5AgEAAAABugIgAAAAAQIAAADxAgAgJgAA4QcAIAMAAAD0AgAgJgAA4QcAICcAAOUHACAZAAAA9AIAIAIAAM8EACAJAADSBAAgCgAA0AQAIAsAANEEACAMAADTBAAgEQAA1AQAIBIAANYEACAfAADlBwAglQIBAKIEACGZAgAAzgS3AiKcAkAApQQAIZ0CQAClBAAhrAIBAKIEACGtAgEAogQAIa4CAQCvBAAhrwIBAK8EACGwAgEArwQAIbICAADLBLICIrQCAADMBLQCIrUCIADNBAAhtwIgAM0EACG4AgEAogQAIbkCAQCiBAAhugIgAM0EACEXAgAAzwQAIAkAANIEACAKAADQBAAgCwAA0QQAIAwAANMEACARAADUBAAgEgAA1gQAIJUCAQCiBAAhmQIAAM4EtwIinAJAAKUEACGdAkAApQQAIawCAQCiBAAhrQIBAKIEACGuAgEArwQAIa8CAQCvBAAhsAIBAK8EACGyAgAAywSyAiK0AgAAzAS0AiK1AiAAzQQAIbcCIADNBAAhuAIBAKIEACG5AgEAogQAIboCIADNBAAhCJUCAQAAAAGZAgAAANACApwCQAAAAAHCAgEAAAABzgIQAAAAAdACAQAAAAHRAgEAAAAB0gJAAAAAAQMAAAASACAmAADfBwAgJwAA6QcAIBMAAAASACAJAADDBQAgDgAA1gYAIBMAAMIFACAVAADEBQAgFgAAxQUAIBcAAMYFACAYAADIBQAgHwAA6QcAIJUCAQCiBAAhmQIAAMAFyAIinAJAAKUEACGdAkAApQQAIcECAQCiBAAhwgIBAKIEACHDAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIREJAADDBQAgDgAA1gYAIBMAAMIFACAVAADEBQAgFgAAxQUAIBcAAMYFACAYAADIBQAglQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcMCAQCiBAAhxAIBAKIEACHFAgEAogQAIcYCQACkBAAhB5UCAQAAAAGWAgEAAAABmQIAAADWAgKcAkAAAAABnQJAAAAAAc4CEAAAAAHWAkAAAAABCg0AAJAFACAOAADWBQAglQIBAAAAAZYCAQAAAAGZAgAAANYCApwCQAAAAAGdAkAAAAABwgIBAAAAAc4CEAAAAAHWAkAAAAABAgAAAB0AICYAAOsHACADAAAAGwAgJgAA6wcAICcAAO8HACAMAAAAGwAgDQAAggUAIA4AANUFACAfAADvBwAglQIBAKIEACGWAgEAogQAIZkCAACABdYCIpwCQAClBAAhnQJAAKUEACHCAgEAogQAIc4CEADwBAAh1gJAAKQEACEKDQAAggUAIA4AANUFACCVAgEAogQAIZYCAQCiBAAhmQIAAIAF1gIinAJAAKUEACGdAkAApQQAIcICAQCiBAAhzgIQAPAEACHWAkAApAQAIQiVAgEAAAABmQIAAADQAgKcAkAAAAABzQIBAAAAAc4CEAAAAAHQAgEAAAAB0QIBAAAAAdICQAAAAAERCQAA-wUAIA4AANcGACAPAAD_BQAgEwAA-gUAIBUAAPwFACAWAAD9BQAgFwAA_gUAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAgAAABQAICYAAPEHACADAAAAEgAgJgAA8QcAICcAAPUHACATAAAAEgAgCQAAwwUAIA4AANYGACAPAADHBQAgEwAAwgUAIBUAAMQFACAWAADFBQAgFwAAxgUAIB8AAPUHACCVAgEAogQAIZkCAADABcgCIpwCQAClBAAhnQJAAKUEACHBAgEAogQAIcICAQCiBAAhwwIBAKIEACHEAgEAogQAIcUCAQCiBAAhxgJAAKQEACERCQAAwwUAIA4AANYGACAPAADHBQAgEwAAwgUAIBUAAMQFACAWAADFBQAgFwAAxgUAIJUCAQCiBAAhmQIAAMAFyAIinAJAAKUEACGdAkAApQQAIcECAQCiBAAhwgIBAKIEACHDAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIQWVAgEAAAABlgIBAAAAAZwCQAAAAAHXAgIAAAAB2AIBAAAAAQwFAAC0BQAgDQAAswUAIBkAAPgFACCVAgEAAAABlgIBAAAAAZkCAAAA4AICnAJAAAAAAZ0CQAAAAAG7AgEAAAAB3QIBAAAAAd4CQAAAAAHgAgEAAAABAgAAAAEAICYAAPcHACARCQAA-wUAIA4AANcGACAPAAD_BQAgEwAA-gUAIBYAAP0FACAXAAD-BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAgAAABQAICYAAPkHACARCQAA-wUAIA4AANcGACAPAAD_BQAgEwAA-gUAIBUAAPwFACAXAAD-BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAgAAABQAICYAAPsHACADAAAAEgAgJgAA-wcAICcAAP8HACATAAAAEgAgCQAAwwUAIA4AANYGACAPAADHBQAgEwAAwgUAIBUAAMQFACAXAADGBQAgGAAAyAUAIB8AAP8HACCVAgEAogQAIZkCAADABcgCIpwCQAClBAAhnQJAAKUEACHBAgEAogQAIcICAQCiBAAhwwIBAKIEACHEAgEAogQAIcUCAQCiBAAhxgJAAKQEACERCQAAwwUAIA4AANYGACAPAADHBQAgEwAAwgUAIBUAAMQFACAXAADGBQAgGAAAyAUAIJUCAQCiBAAhmQIAAMAFyAIinAJAAKUEACGdAkAApQQAIcECAQCiBAAhwgIBAKIEACHDAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIQaVAgEAAAABlgIBAAAAAZwCQAAAAAHaAgEAAAAB2wIBAAAAAdwCAQAAAAERCQAA-wUAIA4AANcGACAPAAD_BQAgEwAA-gUAIBUAAPwFACAWAAD9BQAgGAAAgAYAIJUCAQAAAAGZAgAAAMgCApwCQAAAAAGdAkAAAAABwQIBAAAAAcICAQAAAAHDAgEAAAABxAIBAAAAAcUCAQAAAAHGAkAAAAABAgAAABQAICYAAIEIACADAAAAEgAgJgAAgQgAICcAAIUIACATAAAAEgAgCQAAwwUAIA4AANYGACAPAADHBQAgEwAAwgUAIBUAAMQFACAWAADFBQAgGAAAyAUAIB8AAIUIACCVAgEAogQAIZkCAADABcgCIpwCQAClBAAhnQJAAKUEACHBAgEAogQAIcICAQCiBAAhwwIBAKIEACHEAgEAogQAIcUCAQCiBAAhxgJAAKQEACERCQAAwwUAIA4AANYGACAPAADHBQAgEwAAwgUAIBUAAMQFACAWAADFBQAgGAAAyAUAIJUCAQCiBAAhmQIAAMAFyAIinAJAAKUEACGdAkAApQQAIcECAQCiBAAhwgIBAKIEACHDAgEAogQAIcQCAQCiBAAhxQIBAKIEACHGAkAApAQAIQMAAAANACAmAAD3BwAgJwAAiAgAIA4AAAANACAFAACrBQAgDQAAqgUAIBkAAPYFACAfAACICAAglQIBAKIEACGWAgEAogQAIZkCAACoBeACIpwCQAClBAAhnQJAAKUEACG7AgEAogQAId0CAQCiBAAh3gJAAKQEACHgAgEArwQAIQwFAACrBQAgDQAAqgUAIBkAAPYFACCVAgEAogQAIZYCAQCiBAAhmQIAAKgF4AIinAJAAKUEACGdAkAApQQAIbsCAQCiBAAh3QIBAKIEACHeAkAApAQAIeACAQCvBAAhAwAAABIAICYAAPkHACAnAACLCAAgEwAAABIAIAkAAMMFACAOAADWBgAgDwAAxwUAIBMAAMIFACAWAADFBQAgFwAAxgUAIBgAAMgFACAfAACLCAAglQIBAKIEACGZAgAAwAXIAiKcAkAApQQAIZ0CQAClBAAhwQIBAKIEACHCAgEAogQAIcMCAQCiBAAhxAIBAKIEACHFAgEAogQAIcYCQACkBAAhEQkAAMMFACAOAADWBgAgDwAAxwUAIBMAAMIFACAWAADFBQAgFwAAxgUAIBgAAMgFACCVAgEAogQAIZkCAADABcgCIpwCQAClBAAhnQJAAKUEACHBAgEAogQAIcICAQCiBAAhwwIBAKIEACHEAgEAogQAIcUCAQCiBAAhxgJAAKQEACEEBQAFDQACFUMSGQADCQcAFgkxAQ4AAw8_CxMAEBUzEhY9Exc-FBhADgkCBAQHAA8JFgEKBgULFQIMGgoQJAwRHgsSKA4BAQADBAEAAwYKBgcACQkPAQIFAAUIAAcCBgsGBwAIAQYMAAIGEAAJEQABAQADBAcADQ0AAg4AAxAiDAIOAAMPAAsBECMAAg0AAg4AAwYJKgALKQAMKwAQLQARLAASLgACBwARCy8CAQswAAUHABUNAAIUAAEWNxMXOxQCDTgCFTkSAg0AAhUAEgEWPAACCUEAFkIAAAMFAAUNAAIZAAMDBQAFDQACGQADAwcAGywAHC0AHQAAAAMHABssABwtAB0CDWMCFWQSAg1qAhVrEgMHACIsACMtACQAAAADBwAiLAAjLQAkAQEAAwEBAAMDBwApLAAqLQArAAAAAwcAKSwAKi0AKwINAAIOAAMCDQACDgADBQcAMCwAMy0ANF4AMV8AMgAAAAAABQcAMCwAMy0ANF4AMV8AMgINAAIOAAMCDQACDgADBQcAOSwAPC0APV4AOl8AOwAAAAAABQcAOSwAPC0APV4AOl8AOwEBAAMBAQADAwcAQiwAQy0ARAAAAAMHAEIsAEMtAEQCDgADDwALAg4AAw8ACwUHAEksAEwtAE1eAEpfAEsAAAAAAAUHAEksAEwtAE1eAEpfAEsAAAUHAFIsAFUtAFZeAFNfAFQAAAAAAAUHAFIsAFUtAFZeAFNfAFQCDQACFQASAg0AAhUAEgMHAFssAFwtAF0AAAADBwBbLABcLQBdAg4AAxMAEAIOAAMTABADBwBiLABjLQBkAAAAAwcAYiwAYy0AZAAAAwcAaSwAai0AawAAAAMHAGksAGotAGsBAQADAQEAAwUHAHAsAHMtAHReAHFfAHIAAAAAAAUHAHAsAHMtAHReAHFfAHICBQAFCAAHAgUABQgABwMHAHksAHotAHsAAAADBwB5LAB6LQB7AAADBwCAASwAgQEtAIIBAAAAAwcAgAEsAIEBLQCCAQINAAIUAAECDQACFAABAwcAhwEsAIgBLQCJAQAAAAMHAIcBLACIAS0AiQEaAgEbRAEcRQEdRgEeRwEgSQEhSxciTBgjTgEkUBclURkoUgEpUwEqVBcuVxovWB4wWRMxWhMyWxMzXBM0XRM1XxM2YRc3Yh84ZhM5aBc6aSA7bBM8bRM9bhc-cSE_ciVAdARBdQRCdwRDeAREeQRFewRGfRdHfiZIgAEESYIBF0qDASdLhAEETIUBBE2GARdOiQEoT4oBLFCLAQ5RjAEOUo0BDlOOAQ5UjwEOVZEBDlaTARdXlAEtWJYBDlmYARdamQEuW5oBDlybAQ5dnAEXYJ8BL2GgATVioQELY6IBC2SjAQtlpAELZqUBC2enAQtoqQEXaaoBNmqsAQtrrgEXbK8BN22wAQtusQELb7IBF3C1AThxtgE-crcBCnO4AQp0uQEKdboBCna7AQp3vQEKeL8BF3nAAT96wgEKe8QBF3zFAUB9xgEKfscBCn_IAReAAcsBQYEBzAFFggHNAQyDAc4BDIQBzwEMhQHQAQyGAdEBDIcB0wEMiAHVAReJAdYBRooB2AEMiwHaAReMAdsBR40B3AEMjgHdAQyPAd4BF5AB4QFIkQHiAU6SAeQBEJMB5QEQlAHoARCVAekBEJYB6gEQlwHsARCYAe4BF5kB7wFPmgHxARCbAfMBF5wB9AFQnQH1ARCeAfYBEJ8B9wEXoAH6AVGhAfsBV6IB_QEUowH-ARSkAYACFKUBgQIUpgGCAhSnAYQCFKgBhgIXqQGHAliqAYkCFKsBiwIXrAGMAlmtAY0CFK4BjgIUrwGPAhewAZICWrEBkwJesgGUAgKzAZUCArQBlgICtQGXAgK2AZgCArcBmgICuAGcAhe5AZ0CX7oBnwICuwGhAhe8AaICYL0BowICvgGkAgK_AaUCF8ABqAJhwQGpAmXCAasCB8MBrAIHxAGvAgfFAbACB8YBsQIHxwGzAgfIAbUCF8kBtgJmygG4AgfLAboCF8wBuwJnzQG8AgfOAb0CB88BvgIX0AHBAmjRAcICbNIBxAIF0wHFAgXUAccCBdUByAIF1gHJAgXXAcsCBdgBzQIX2QHOAm3aAdACBdsB0gIX3AHTAm7dAdQCBd4B1QIF3wHWAhfgAdkCb-EB2gJ14gHbAgbjAdwCBuQB3QIG5QHeAgbmAd8CBucB4QIG6AHjAhfpAeQCduoB5gIG6wHoAhfsAekCd-0B6gIG7gHrAgbvAewCF_AB7wJ48QHwAnzyAfICA_MB8wID9AH2AgP1AfcCA_YB-AID9wH6AgP4AfwCF_kB_QJ9-gH_AgP7AYEDF_wBggN-_QGDAwP-AYQDA_8BhQMXgAKIA3-BAokDgwGCAosDEoMCjAMShAKOAxKFAo8DEoYCkAMShwKSAxKIApQDF4kClQOEAYoClwMSiwKZAxeMApoDhQGNApsDEo4CnAMSjwKdAxeQAqADhgGRAqEDigE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AssignmentScalarFieldEnum: () => AssignmentScalarFieldEnum,
  AttachmentScalarFieldEnum: () => AttachmentScalarFieldEnum,
  CustomerProfileScalarFieldEnum: () => CustomerProfileScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  FeedbackScalarFieldEnum: () => FeedbackScalarFieldEnum,
  InvoiceScalarFieldEnum: () => InvoiceScalarFieldEnum,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NotificationScalarFieldEnum: () => NotificationScalarFieldEnum,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ServiceCategoryScalarFieldEnum: () => ServiceCategoryScalarFieldEnum,
  ServiceReportScalarFieldEnum: () => ServiceReportScalarFieldEnum,
  ServiceRequestScalarFieldEnum: () => ServiceRequestScalarFieldEnum,
  SkillScalarFieldEnum: () => SkillScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TechnicianProfileScalarFieldEnum: () => TechnicianProfileScalarFieldEnum,
  TechnicianSkillScalarFieldEnum: () => TechnicianSkillScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  WorkOrderScalarFieldEnum: () => WorkOrderScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.0",
  engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Assignment: "Assignment",
  Attachment: "Attachment",
  CustomerProfile: "CustomerProfile",
  Feedback: "Feedback",
  Invoice: "Invoice",
  Notification: "Notification",
  Payment: "Payment",
  ServiceCategory: "ServiceCategory",
  ServiceReport: "ServiceReport",
  ServiceRequest: "ServiceRequest",
  Skill: "Skill",
  TechnicianProfile: "TechnicianProfile",
  TechnicianSkill: "TechnicianSkill",
  User: "User",
  WorkOrder: "WorkOrder"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AssignmentScalarFieldEnum = {
  id: "id",
  serviceRequestId: "serviceRequestId",
  technicianId: "technicianId",
  assignedById: "assignedById",
  scheduledAt: "scheduledAt",
  status: "status",
  notes: "notes",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var AttachmentScalarFieldEnum = {
  id: "id",
  serviceRequestId: "serviceRequestId",
  workOrderId: "workOrderId",
  fileUrl: "fileUrl",
  fileName: "fileName",
  fileType: "fileType",
  createdAt: "createdAt"
};
var CustomerProfileScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  userId: "userId",
  address: "address",
  city: "city",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var FeedbackScalarFieldEnum = {
  id: "id",
  serviceRequestId: "serviceRequestId",
  customerId: "customerId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt"
};
var InvoiceScalarFieldEnum = {
  id: "id",
  serviceRequestId: "serviceRequestId",
  customerId: "customerId",
  amount: "amount",
  status: "status",
  dueDate: "dueDate",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var NotificationScalarFieldEnum = {
  id: "id",
  title: "title",
  message: "message",
  isRead: "isRead",
  createdAt: "createdAt",
  userId: "userId"
};
var PaymentScalarFieldEnum = {
  id: "id",
  invoiceId: "invoiceId",
  customerId: "customerId",
  amount: "amount",
  status: "status",
  transactionId: "transactionId",
  paymentMethod: "paymentMethod",
  paidAt: "paidAt",
  createdAt: "createdAt"
};
var ServiceCategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  basePrice: "basePrice",
  createdAt: "createdAt"
};
var ServiceReportScalarFieldEnum = {
  id: "id",
  serviceRequestId: "serviceRequestId",
  workOrderId: "workOrderId",
  technicianNotes: "technicianNotes",
  workDescription: "workDescription",
  materialsUsed: "materialsUsed",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ServiceRequestScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  categoryId: "categoryId",
  title: "title",
  description: "description",
  address: "address",
  preferredDate: "preferredDate",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SkillScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  createdAt: "createdAt"
};
var TechnicianProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  experience: "experience",
  isAvailable: "isAvailable",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TechnicianSkillScalarFieldEnum = {
  id: "id",
  technicianId: "technicianId",
  skillId: "skillId"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  phone: "phone",
  googleId: "googleId",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  authProvider: "authProvider",
  emailVerified: "emailVerified",
  status: "status",
  needPasswordChange: "needPasswordChange",
  imageUrl: "imageUrl",
  imagePublicId: "imagePublicId",
  isDeleted: "isDeleted"
};
var WorkOrderScalarFieldEnum = {
  id: "id",
  serviceRequestId: "serviceRequestId",
  assignmentId: "assignmentId",
  status: "status",
  startedAt: "startedAt",
  completedAt: "completedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/utils/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/app/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, {
    expiresIn
  });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/app/middleware/checkAuth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new AppError(httpStatus.UNAUTHORIZED, verifiedToken.error);
    }
    const { email, name, userId, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found. Please log in again.");
    }
    if (user.status === "BLOCKED") {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Your account has been blocked. Please contact support."
      );
    }
    req.user = {
      email,
      name,
      userId,
      role
    };
    next();
  });
};

// src/app/middleware/validateRequest.ts
import httpStatus2 from "http-status";
var validateRequest = (zodSchema) => {
  return catchAsync((req, res, next) => {
    const payload = req.body ?? {};
    const result = zodSchema.safeParse(payload);
    if (!result.success) {
      console.log(result.error);
      console.log(result.error.issues);
      throw new AppError(httpStatus2.BAD_REQUEST, result.error.issues[0].message);
    }
    req.body = result.data;
    next();
  });
};

// src/app/module/auth/auth.controller.ts
import httpStatus4 from "http-status";

// src/app/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/app/module/auth/auth.service.ts
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ejs from "ejs";
import httpStatus3 from "http-status";
import path3 from "path";

// src/app/lib/googleAuth.ts
import { OAuth2Client } from "google-auth-library";
var googleClient = new OAuth2Client({
  client_id: config_default.google_client_id
});

// src/app/lib/nodemailer.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config_default.smtp_user,
    pass: config_default.smtp_password
  }
});

// src/app/lib/redis.ts
import { createClient } from "redis";
var redisClient = createClient({
  username: config_default.redis_user,
  password: config_default.redis_password,
  socket: {
    host: config_default.redis_host,
    port: Number(config_default.redis_port)
  }
});

// src/app/module/auth/auth.service.ts
var registerCustomer = async (payload) => {
  const { name, password } = payload;
  const email = payload.email.trim().toLowerCase();
  const isUserExists = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExists) {
    throw new AppError(httpStatus3.CONFLICT, "User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const expirationSeconds = 5 * 60;
  const otpKey = `patient-registration-otp:${email}`;
  const otpValue = crypto.randomInt(1e5, 1e6).toString();
  await redisClient.set(otpKey, otpValue, {
    expiration: {
      type: "EX",
      value: expirationSeconds
    }
  });
  const patientRegistrationKey = `patient-registration-data:${email}`;
  const redisUserDataPayload = {
    name,
    email,
    password: hashedPassword
  };
  await redisClient.set(
    patientRegistrationKey,
    JSON.stringify(redisUserDataPayload),
    {
      expiration: {
        type: "EX",
        value: expirationSeconds
      }
    }
  );
  const tempatePath = path3.join(
    process.cwd(),
    "src/app/templates/registration-user-otp.ejs"
  );
  const templateData = {
    name,
    email,
    otp: otpValue,
    expirationMinutes: expirationSeconds / 60
  };
  const html = await ejs.renderFile(tempatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: email,
    subject: "Email Verification",
    // text : `Your OTP is ${otp}`
    // html: `<h1>Your OTP is ${otp}</h1>`
    html
  });
};
var verifyPatientEmail = async (payload) => {
  const otp = payload.otp;
  const email = payload.email.trim().toLowerCase();
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExist?.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is Blocked");
  }
  if (isUserExist?.emailVerified) {
    throw new AppError(httpStatus3.CONFLICT, "Email ALready Verified");
  }
  if (isUserExist?.isDeleted || isUserExist?.status === "DELETED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is Deleted");
  }
  const otpKey = `patient-registration-otp:${email}`;
  const redisOtp = await redisClient.get(otpKey);
  if (!redisOtp) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOtp !== otp) {
    throw new AppError(httpStatus3.BAD_REQUEST, "OTP Does Not Match");
  }
  await redisClient.del(otpKey);
  const patientRegistrationKey = `patient-registration-data:${email}`;
  const redisPatientData = await redisClient.get(patientRegistrationKey);
  if (!redisPatientData) {
    throw new AppError(httpStatus3.NOT_FOUND, "Patient Doesnt Exist");
  }
  const customerPayload = JSON.parse(redisPatientData);
  const createdUser = await prisma.user.create({
    data: {
      name: customerPayload.name,
      email: customerPayload.email,
      password: customerPayload.password,
      role: Role.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      customerProfile: {
        create: {
          name: customerPayload.name,
          email: customerPayload.email
          // contactNumber: customerPayload?.customerProfile?.contactNumber || "",
        }
      }
    },
    omit: { password: true },
    include: { customerProfile: true }
  });
  await redisClient.del(patientRegistrationKey);
  const tempatePath = path3.join(
    process.cwd(),
    "src/app/templates/patient-welcome-email.ejs"
  );
  const templateData = {
    name: createdUser.name
  };
  const html = await ejs.renderFile(tempatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: email,
    subject: "Welcome To PH Healthcare System",
    // text : `Your OTP is ${otp}`
    // html: `<h1>Your OTP is ${otp}</h1>`
    html
  });
  const { customerProfile, ...user } = createdUser;
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    user,
    customerProfile,
    accessToken,
    refreshToken: refreshToken3
  };
};
var loginUser = async (payload) => {
  const { password } = payload;
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(httpStatus3.NOT_FOUND, "User Not Found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus3.FORBIDDEN, "User is blocked");
  }
  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus3.FORBIDDEN, "User is deleted");
  }
  if (user.password === null && user.googleId !== null) {
    throw new AppError(
      httpStatus3.BAD_REQUEST,
      "User Already Has Account Registered With Google. Try To Login With Google."
    );
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus3.UNAUTHORIZED, "Invalid credentials");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var getMe = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      customerProfile: true
    },
    omit: {
      password: true
    }
  });
  if (!isUserExists) {
    throw new AppError(httpStatus3.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var refreshToken = async (token) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    token,
    config_default.jwt_refresh_secret
  );
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(
      httpStatus3.UNAUTHORIZED,
      config_default.node_env === "development" ? verifiedRefreshToken.error : "Invalid refresh token"
    );
  }
  const data = verifiedRefreshToken.data;
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new AppError(httpStatus3.UNAUTHORIZED, "User is inactive or not found");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var googleLogin = async (payload) => {
  let googleIdTokenPayload = null;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: payload.idToken,
      audience: config_default.google_client_id
    });
    googleIdTokenPayload = ticket.getPayload();
  } catch (error) {
    console.log("Google ID Token Verification Failed", error);
    throw new AppError(httpStatus3.UNAUTHORIZED, "Invalid Or Expired Google Id Token");
  }
  if (!googleIdTokenPayload) {
    throw new AppError(httpStatus3.UNAUTHORIZED, "Invalid Or Expired Google Id Token");
  }
  if (!googleIdTokenPayload.email) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Google Email Not Found");
  }
  if (!googleIdTokenPayload.name) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Google Email User Name Not Found");
  }
  const ifPatientExistWithGoogleAuth = await prisma.user.findUnique({
    where: {
      email: googleIdTokenPayload.email,
      role: Role.CUSTOMER,
      googleId: googleIdTokenPayload.sub
    }
  });
  let user = ifPatientExistWithGoogleAuth;
  if (!ifPatientExistWithGoogleAuth) {
    const ifPatientExistWithCredentials = await prisma.user.findUnique({
      where: {
        email: googleIdTokenPayload.email,
        role: Role.CUSTOMER,
        authProvider: AuthProvider.CREDENTIAL
      }
    });
    if (ifPatientExistWithCredentials) {
      if (!ifPatientExistWithCredentials.emailVerified) {
        throw new AppError(httpStatus3.FORBIDDEN, "Email Not Verified");
      }
      if (ifPatientExistWithCredentials.status === UserStatus.BLOCKED) {
        throw new AppError(httpStatus3.FORBIDDEN, "User Is Blocked");
      }
      if (ifPatientExistWithCredentials.isDeleted || ifPatientExistWithCredentials.status === UserStatus.DELETED) {
        throw new AppError(httpStatus3.FORBIDDEN, "User Is Deleted");
      }
      user = await prisma.user.update({
        where: {
          id: ifPatientExistWithCredentials.id
        },
        data: {
          googleId: googleIdTokenPayload.sub
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: googleIdTokenPayload.name,
          email: googleIdTokenPayload.email,
          role: Role.CUSTOMER,
          googleId: googleIdTokenPayload.sub,
          authProvider: AuthProvider.GOOGLE,
          emailVerified: true,
          customerProfile: {
            create: {
              name: googleIdTokenPayload.name,
              email: googleIdTokenPayload.email
            }
          }
        }
      });
      const tempatePath = path3.join(
        process.cwd(),
        "src/app/templates/patient-welcome-email.ejs"
      );
      const templateData = {
        name: user.name
      };
      const html = await ejs.renderFile(tempatePath, templateData);
      await transporter.sendMail({
        from: config_default.email_sender,
        to: user.email,
        subject: "Welcome To PH Healthcare System",
        // text : `Your OTP is ${otp}`
        // html: `<h1>Your OTP is ${otp}</h1>`
        html
      });
    }
  }
  if (!user) {
    throw new AppError(httpStatus3.NOT_FOUND, "User Not Found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus3.FORBIDDEN, "User Is Blocked");
  }
  if (user.isDeleted || user.status === UserStatus.DELETED) {
    throw new AppError(httpStatus3.FORBIDDEN, "User Is Deleted");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var forgotPassword = async (payload) => {
  const { email } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError(httpStatus3.NOT_FOUND, "User Does Not Exist!");
  }
  if (isUserExist.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is Blocked");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError(httpStatus3.FORBIDDEN, "User Not Verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === "DELETED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is Deleted");
  }
  if (isUserExist.googleId && isUserExist.authProvider === "GOOGLE") {
    throw new AppError(httpStatus3.BAD_REQUEST, "User Has Account With Google");
  }
  const otp = crypto.randomInt(1e5, 1e6).toString();
  const key = `forgor-password-otp:${isUserExist.email}`;
  const expirationSeconds = 5 * 60;
  await redisClient.set(key, otp, {
    expiration: {
      type: "EX",
      value: expirationSeconds
    }
  });
  const tempatePath = path3.join(
    process.cwd(),
    "src/app/templates/forgot-password.ejs"
  );
  const templateData = {
    name: isUserExist.name,
    otp,
    expirationMinutes: expirationSeconds / 60
  };
  const html = await ejs.renderFile(tempatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: isUserExist.email,
    subject: "Forgot Password",
    // text : `Your OTP is ${otp}`
    // html: `<h1>Your OTP is ${otp}</h1>`
    html
  });
};
var resetPassword = async (payload) => {
  const { email, otp, newPassword } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError(httpStatus3.NOT_FOUND, "User Does Not Exist!");
  }
  if (isUserExist.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is Blocked");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError(httpStatus3.FORBIDDEN, "User Not Verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === "DELETED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is Deleted");
  }
  if (isUserExist.googleId && isUserExist.authProvider === "GOOGLE") {
    throw new AppError(httpStatus3.BAD_REQUEST, "User Has Account With Google");
  }
  const key = `forgor-password-otp:${isUserExist.email}`;
  const redisOtp = await redisClient.get(key);
  if (!redisOtp) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOtp !== otp) {
    throw new AppError(httpStatus3.BAD_REQUEST, "OTP Does Not Match");
  }
  const hashedNewPassword = await bcrypt.hash(
    newPassword,
    Number(config_default.bcrypt_salt_rounds)
  );
  await prisma.user.update({
    where: {
      email: isUserExist.email
    },
    data: {
      password: hashedNewPassword
    }
  });
  await redisClient.del([key]);
  const tempatePath = path3.join(
    process.cwd(),
    "src/app/templates/reset-password-success.ejs"
  );
  const templateData = {
    name: isUserExist.name
  };
  const html = await ejs.renderFile(tempatePath, templateData);
  await transporter.sendMail({
    from: config_default.email_sender,
    to: isUserExist.email,
    subject: "Password Changed",
    // text : `Your OTP is ${otp}`
    // html: `<h1>Your Password Is Changed</h1>`
    html
  });
};
var AuthService = {
  registerCustomer,
  verifyPatientEmail,
  loginUser,
  getMe,
  refreshToken,
  googleLogin,
  forgotPassword,
  resetPassword
};

// src/app/module/auth/auth.controller.ts
var registerPatient = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.registerCustomer(payload);
  sendResponse(res, {
    statusCode: httpStatus4.CREATED,
    success: true,
    message: "Verification OTP Sent",
    data: null
  });
});
var verifyPatientEmail2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.verifyPatientEmail(payload);
  const { accessToken, refreshToken: refreshToken3, user, customerProfile } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.CREATED,
    success: true,
    message: "Email Verified Successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3,
      user,
      customerProfile
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(httpStatus4.UNAUTHORIZED, "User information is missing in the request");
  }
  const result = await AuthService.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var refreshToken2 = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(httpStatus4.UNAUTHORIZED, "Refresh token is missing");
  }
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken
    }
  });
});
var googleLogin2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.googleLogin(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var forgotPassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.forgotPassword(payload);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: `OTP Sent To Email : ${payload.email}`,
    data: null
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.resetPassword(payload);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Password Changed Successfully",
    data: null
  });
});
var AuthController = {
  registerPatient,
  verifyPatientEmail: verifyPatientEmail2,
  loginUser: loginUser2,
  getMe: getMe2,
  refreshToken: refreshToken2,
  googleLogin: googleLogin2,
  forgotPassword: forgotPassword2,
  resetPassword: resetPassword2
};

// src/app/module/auth/auth.validation.ts
import z from "zod";
var CustomerRegistrationZodSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name must be a string!!!!!" }).min(3, "Name must be at least 3 characters long!!!").max(10, "Name cannot exceed 10 characters"),
    email: z.string({ message: "Email must be a string!!!!!" }).email("Not a valid email!!"),
    password: z.string({ message: "Password must be a string!!!!!" }).min(8, "Password Must Minimum 8 Characters Long.").regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter").regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter").regex(/[0-9]/, "Password must contain at least 1 Number").regex(/[^A-Za-z0-9]/, "Password must contain at least 1 Special Character"),
    // আপনার প্রিজমা স্কিমা অনুযায়ী এখানে সম্ভবত 'patient' এর বদলে 'customerProfile' বা এমন কিছু হওয়া উচিত ছিল। 
    // তবে আপনার আগের স্কিমা ঠিক রেখে টাইপো ফিক্স করা হলো:
    customerProfile: z.object({
      contactNumber: z.string({ message: "Contact number must be a string" }).optional()
    }).optional()
  })
});
var PatientEmailVerifyZodSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email must be a string!!!!!" }).email("Not a valid email!!"),
    otp: z.string({ message: "OTP must be a string!!!!!" }).length(6, "OTP must be exactly 6 characters long!!!")
  })
});
var LoginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password Must Minimum 8 Characters Long.").regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter").regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter").regex(/[0-9]/, "Password must contain atleast 1 Number").regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character")
});
var ForgotPasswordZodSchema = z.object({
  email: z.email()
});
var ResetPasswordZodSchema = z.object({
  email: z.email(),
  newPassword: z.string().min(8, "Password Must Minimum 8 Characters Long.").regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter").regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter").regex(/[0-9]/, "Password must contain atleast 1 Number").regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
  otp: z.string().length(6)
});
var UserValidation = {
  CustomerRegistrationZodSchema,
  PatientEmailVerifyZodSchema,
  LoginZodSchema,
  ForgotPasswordZodSchema,
  ResetPasswordZodSchema
};

// src/app/module/auth/auth.route.ts
var router = Router();
router.post(
  "/register",
  // validateRequest(UserValidation.CustomerRegistrationZodSchema),
  AuthController.registerPatient
);
router.post(
  "/verify-email",
  // validateRequest(UserValidation.PatientEmailVerifyZodSchema),
  AuthController.verifyPatientEmail
);
router.post(
  "/login",
  validateRequest(UserValidation.LoginZodSchema),
  AuthController.loginUser
);
router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  // validateRequest
  AuthController.getMe
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
router.post(
  "/forgot-password",
  validateRequest(UserValidation.ForgotPasswordZodSchema),
  AuthController.forgotPassword
);
router.post(
  "/reset-password",
  validateRequest(UserValidation.ResetPasswordZodSchema),
  AuthController.resetPassword
);
var AuthRoutes = router;

// src/app/middleware/globalErrorHandler.ts
import httpStatus5 from "http-status";
var globalErrorHandler = async (err, _req, res, _next) => {
  if (config_default.node_env === "development") {
    console.log("Error from Global Error Handler", err);
  }
  let statusCode = httpStatus5.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  const errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus5.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus5.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus5.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus5.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus5.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus5.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus5.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof AppError) {
    errorMessage = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode || httpStatus5.INTERNAL_SERVER_ERROR,
    name: config_default.node_env === "development" ? errorName : "Internal Server Error",
    message: config_default.node_env === "development" ? errorMessage : "Internal Server Error",
    error: config_default.node_env === "development" ? err : void 0,
    stack: config_default.node_env === "development" ? err.stack : void 0
  });
};

// src/app/middleware/notFound.ts
import httpStatus6 from "http-status";
var notFound = (req, res) => {
  res.status(httpStatus6.NOT_FOUND).json({
    message: "Route not found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/app/module/ServiceCategory/serviceCatagory.route.ts
import express from "express";

// src/app/module/ServiceCategory/serviceCatagory.service.ts
var createServiceCategory = async (payload) => {
  const existingCategory = await prisma.serviceCategory.findUnique({
    where: {
      name: payload.name
    }
  });
  if (existingCategory) {
    throw new Error("Service category already exists");
  }
  const result = await prisma.serviceCategory.create({
    data: {
      name: payload.name,
      description: payload.description,
      basePrice: payload.basePrice
    }
  });
  return result;
};
var getAllServiceCategories = async () => {
  const result = await prisma.serviceCategory.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSingleServiceCategory = async (id) => {
  const result = await prisma.serviceCategory.findUnique({
    where: {
      id
    }
  });
  if (!result) {
    throw new Error("Service category not found");
  }
  return result;
};
var updateServiceCategory = async (id, payload) => {
  const category = await prisma.serviceCategory.findUnique({
    where: {
      id
    }
  });
  if (!category) {
    throw new Error("Service category not found");
  }
  if (payload.name) {
    const existingCategory = await prisma.serviceCategory.findFirst({
      where: {
        name: payload.name,
        NOT: {
          id
        }
      }
    });
    if (existingCategory) {
      throw new Error("Service category name already exists");
    }
  }
  const result = await prisma.serviceCategory.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};
var deleteServiceCategory = async (id) => {
  const category = await prisma.serviceCategory.findUnique({
    where: {
      id
    }
  });
  if (!category) {
    throw new Error("Service category not found");
  }
  const result = await prisma.serviceCategory.delete({
    where: {
      id
    }
  });
  return result;
};
var ServiceCategoryService = {
  createServiceCategory,
  getAllServiceCategories,
  getSingleServiceCategory,
  updateServiceCategory,
  deleteServiceCategory
};

// src/app/module/ServiceCategory/serviceCatagory.controller.ts
var createServiceCategory2 = catchAsync(
  async (req, res) => {
    const result = await ServiceCategoryService.createServiceCategory(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Service category created successfully",
      data: result
    });
  }
);
var getAllServiceCategories2 = catchAsync(
  async (req, res) => {
    const result = await ServiceCategoryService.getAllServiceCategories();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service categories retrieved successfully",
      data: result
    });
  }
);
var getSingleServiceCategory2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await ServiceCategoryService.getSingleServiceCategory(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service category retrieved successfully",
      data: result
    });
  }
);
var updateServiceCategory2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await ServiceCategoryService.updateServiceCategory(
      id,
      req.body
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service category updated successfully",
      data: result
    });
  }
);
var deleteServiceCategory2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await ServiceCategoryService.deleteServiceCategory(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service category deleted successfully",
      data: result
    });
  }
);
var ServiceCategoryController = {
  createServiceCategory: createServiceCategory2,
  getAllServiceCategories: getAllServiceCategories2,
  getSingleServiceCategory: getSingleServiceCategory2,
  updateServiceCategory: updateServiceCategory2,
  deleteServiceCategory: deleteServiceCategory2
};

// src/app/module/ServiceCategory/serviceCatagory.route.ts
var router2 = express.Router();
router2.post(
  "/",
  auth("ADMIN", "MANAGER"),
  ServiceCategoryController.createServiceCategory
);
router2.get(
  "/",
  auth("ADMIN", "MANAGER", "CUSTOMER", "TECHNICIAN"),
  ServiceCategoryController.getAllServiceCategories
);
router2.get(
  "/:id",
  auth("ADMIN", "MANAGER", "CUSTOMER", "TECHNICIAN"),
  ServiceCategoryController.getSingleServiceCategory
);
router2.patch(
  "/:id",
  auth("ADMIN", "MANAGER"),
  ServiceCategoryController.updateServiceCategory
);
router2.delete(
  "/:id",
  auth("ADMIN", "MANAGER"),
  ServiceCategoryController.deleteServiceCategory
);
var ServiceCategoryRoutes = router2;

// src/app.ts
var app = express2();
app.use(
  cors({
    origin: config_default.frontend_url,
    credentials: true
  })
);
app.use(express2.urlencoded({ extended: true }));
app.use(express2.json());
app.use(cookieParser());
app.use("/api/auth", AuthRoutes);
app.use("/api/service-categories", ServiceCategoryRoutes);
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/server.ts
var PORT = config_default.port;
var main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    await redisClient.connect();
    console.log("Redis Connected Successfully.");
    await transporter.verify();
    console.log("Nodemailer Connected Successfully.");
    app_default.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.js.map