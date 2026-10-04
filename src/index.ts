import app from "./app";
import { PORT } from "./config/config.app";

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//graceful shutdown
function gracefulShutdown() {
    console.log("Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error("Forcing shutdown...");
        process.exit(1);
    }, 10000);
}

// Listen for termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
