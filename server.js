import app from "./app.js";
const PORT = 8080;
import "dotenv/config";

app.listen(PORT, () => {
  console.log(`server run on port 8080`);
});
