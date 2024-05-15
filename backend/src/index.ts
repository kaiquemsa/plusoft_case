import "dotenv/config";
import * as express from "express";
const cors = require('cors');
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:4200'
        }
    ));

    app.use(routes);

    app.listen(8000);

    console.log("listening on port 8000");
  })
  .catch((error) => console.log(error));