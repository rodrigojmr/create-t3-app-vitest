import { expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../pages";
import { type inferProcedureInput } from "@trpc/server";
import { createContextInner } from "../server/trpc/context";
import { appRouter, type AppRouter } from "../server/trpc/router/_app";
import { trpc } from "../utils/trpc";

test("home", async () => {
  vi.spyOn(trpc.example.hello, "useQuery").mockReturnValue({
    data: "Hello from tRPC",
  });

  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", { level: 1, name: /Create T3 App\.js!/i })
  ).toBeDefined();

  const footer = within(screen.getByRole("contentinfo"));
  const link = within(footer.getByRole("link"));
  expect(link.getByRole("button", { name: /Sign in/i })).toBeDefined();
});
