// import { createRouteHandler } from "uploadthing/next";
// import { ourFileRouter } from "@/libs/uploadThing";

// export const { GET, POST } = createRouteHandler({
//     router: ourFileRouter
// })

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/libs/uploadThing";

console.log("📦 UploadThing route initialized");

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter
});


console.log("Uploadthing API Ready!")