import { app, port } from "./app.js";
import db from "./config/Db.js";

try {
    await db.authenticate();
    console.log("Database berhasil terhubung");
} catch (error) {
    console.log(error);
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});