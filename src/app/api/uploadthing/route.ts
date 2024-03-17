// import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

import { createRouteHandler } from "uploadthing/next";

// export default createRouteHandler({
//   router: ourFileRouter,

//   // Apply an (optional) custom config:
//   // config: { ... },
// });

export const { GET } = createRouteHandler({ router: ourFileRouter });
export const { POST } = createRouteHandler({ router: ourFileRouter });
