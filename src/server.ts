import "dotenv/config";
import { logger } from "@/utils/logger";

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.debug("Debug mode is enabled");
});
