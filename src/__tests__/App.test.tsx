import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

const mockedFetch = vi.fn();

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("<App /> (Phase 01 placeholder screen)", () => {
  it("renders the application title", () => {
    vi.stubGlobal("fetch", mockedFetch.mockRejectedValue(new Error("no backend")));
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /AI Teacher Assistant/i }),
    ).toBeTruthy();
  });

  it("shows the backend as connected when /api/health succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      mockedFetch.mockResolvedValue(
        new Response(
          JSON.stringify({
            status: "ok",
            app: "AI Teacher Assistant API",
            version: "0.1.0",
            environment: "test",
            crew: { initialized: true, agents: ["Teaching Assistant"] },
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
      ),
    );
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("status-backend").textContent).toContain(
        "connected",
      ),
    );
  });

  it("shows the backend as unavailable when /api/health fails", async () => {
    vi.stubGlobal(
      "fetch",
      mockedFetch.mockResolvedValue(new Response(null, { status: 503 })),
    );
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("status-backend").textContent).toContain(
        "unavailable",
      ),
    );
  });
});
