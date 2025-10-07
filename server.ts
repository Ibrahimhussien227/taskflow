import { createServer } from "http";
import next from "next";

import { initIO } from "./lib/socket/server";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));

  initIO(server);

  const PORT = dev ? 4000 : process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(
      "✅ Socket.IO initialized and ready for real-time updates"
    );
  });
});
