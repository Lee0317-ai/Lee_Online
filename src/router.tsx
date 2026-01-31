import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shiguang from "./pages/products/Shiguang";
import MindMap from "./pages/tools/MindMap";
import OCR from "./pages/tools/OCR";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Index />,
    },
    {
      path: "/products/shiguang",
      name: 'shiguang',
      element: <Shiguang />,
    },
    {
      path: "/tools/mindmap",
      name: 'mindmap',
      element: <MindMap />,
    },
    {
      path: "/tools/ocr",
      name: 'ocr',
      element: <OCR />,
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;