import { render } from "@testing-library/react";
import type { ReactElement } from "react";

import { Provider } from "../components/ui/provider";

/** Shared render wrapper providing the ChakraProvider/color-mode context. */
export function renderWithProviders(ui: ReactElement) {
  return render(<Provider>{ui}</Provider>);
}
