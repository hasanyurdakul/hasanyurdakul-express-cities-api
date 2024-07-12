const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { consoleArt, twirlTimer } = require("./lib/constants");
const { cityRouter } = require("./routes/cityRouter");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(consoleArt);
      console.log(`@@INFO: SERVER IS RUNNING AT PORT ${PORT}`);
      console.log(
        `@@INFO: SWAGGER DOCUMENTATION: http://localhost:${PORT}/swagger`
      );
      twirlTimer();
    });
    console.log("@@INFO: MONGODB CONNECTED");
  })
  .catch((err) => {
    console.log("@@ERROR: MONGODB CONNECTION FAILED");
    console.log("@@ERROR: PLEASE CHECK MONGO URL");
  });

app.use("/city", cityRouter);
