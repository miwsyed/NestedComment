import { createRoot } from "react-dom/client";

import App from "./App";
import { CommentsWrapper } from "./Context/CommentsWrapper";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <CommentsWrapper>
    <App />
  </CommentsWrapper>
);
