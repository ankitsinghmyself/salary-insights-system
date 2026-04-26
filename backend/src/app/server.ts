import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Swagger API docs: http://localhost:${PORT}/api-docs`);
  console.log(`🌐 Local server: http://localhost:${PORT}`);
});