import express from "express";
import CONFIG_SERVICE from "./services/config-service";
import DataGenerationService from "./services/data-generation-servive";
import FAKER_SERVICE from "./services/faker-service";
import fakeType from "./api/fake-type";
import languageAndType from "./api/fake-lang-type";
import ImageGeneration from './api/generate-image';
import Locale from "./locale-options.json";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { PORT } = CONFIG_SERVICE;
const DATA_KEYS = Object.keys(FAKER_SERVICE.dataGenerationFunctions);
const availableOptions = {
  fakerKeys: DATA_KEYS,
  languages: Locale.locale,
};

app.get("/", (req, res) => {
  const data = DataGenerationService.fakerKeyToValueMapper();
  res.send({ data });
});

app.get("/available-options", (req, res) => res.send(availableOptions));

// Language and Type
app.get("/api/:type", fakeType);

// Language and Type
app.get("/api/:type/:locale", languageAndType);

// Image Generation
app.post("/api/placeholder", ImageGeneration);

app.listen(PORT, () => console.log(`App listening at PORT ${PORT}`));

export default app;
