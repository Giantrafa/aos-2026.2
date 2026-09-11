import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(cors());

// rotas
app.get("/", (req, res) => {
  return res.send("Servidor express exectuando...");
});
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});