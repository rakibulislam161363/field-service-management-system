import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { ServiceCategoryRoutes } from "./app/module/ServiceCategory/serviceCatagory.route";
import { ServiceRequestRoutes } from "./app/module/serviceRequest/serviceRequest.route";
import { TechnicianRoutes } from "./app/module/technician/technician.route";
import { AssignmentRoutes } from "./app/module/assignment/assignment.route";
import { WorkOrderRoutes } from "./app/module/workOrder/workOrder.route";
import { ServiceReportRoutes } from "./app/module/serviceReport/serviceReport.route";
import { SkillRoutes } from "./app/module/skill/skill.route";
import { CustomerProfileRoutes } from "./app/module/customerProfile/customerProfile.route";
import { InvoiceRoutes } from "./app/module/invoice/invoice.route";
import { FeedbackRoutes } from "./app/module/feedback/feedback.route";
import { NotificationRoutes } from "./app/module/notification/notification.route";
import { AttachmentRoutes } from "./app/module/attachment/attachment.route";
import { UserRoutes } from "./app/module/user/user.route";

const app: Application = express();

app.use(
	cors({
		origin: config.frontend_url,
		credentials: true,
	}),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/service-categories", ServiceCategoryRoutes);
app.use("/api/service-requests", ServiceRequestRoutes);
app.use("/api/technicians", TechnicianRoutes);
app.use("/api/assignments", AssignmentRoutes);
app.use("/api/work-orders", WorkOrderRoutes);
app.use("/api/service-reports", ServiceReportRoutes);
app.use("/api/skills", SkillRoutes);
app.use("/api/customer-profiles", CustomerProfileRoutes);
app.use("/api/invoices", InvoiceRoutes);
app.use("/api/feedbacks", FeedbackRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/attachments", AttachmentRoutes);
app.use("/api/users", UserRoutes);
// app.use("/api/v1/appointment", AppointementRoutes);
// app.use("/api/v1/doctor", DoctorRoutes);
// app.use("/api/v1/schedule", ScheduleRoutes);
// app.use("/api/v1/payment", PaymentRoutes);
// app.use("/api/v1/prescription", PrescriptionRoutes);
// app.use("/api/v1/analytics", AnalyticsRoutes);

app.get("/", async (req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		message: "Welcome to Field Service Management System Backend",
	});
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
