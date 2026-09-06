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
