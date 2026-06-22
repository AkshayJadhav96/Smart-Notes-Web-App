import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import loginRoutes from "./routes/loginRoutes.js"
import registerRoutes from "./routes/registerRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/notes",notesRoutes);
app.use("/",loginRoutes)
app.use("/",registerRoutes)

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running");
});
