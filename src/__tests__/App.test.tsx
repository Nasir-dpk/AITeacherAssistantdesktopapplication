import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "../App";
import { NAV_ITEMS } from "../data/navigation";

const mockedFetch = vi.fn();

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("<App /> — dashboard shell (Phase 02)", () => {
  it("renders the app title in the top bar and all nine nav sections", () => {
    vi.stubGlobal("fetch", mockedFetch.mockRejectedValue(new Error("no backend")));
    render(<App />);

    expect(screen.getByRole("heading", { name: "AI Teacher Assistant" })).toBeTruthy();
    const sidebar = screen.getByLabelText("Primary navigation");
    const buttons = within(sidebar).getAllByRole("button");
    expect(buttons.length).toBe(NAV_ITEMS.length);
    expect(buttons.map((b) => b.textContent)).toEqual(NAV_ITEMS.map((n) => n.label));
  });

  it("marks Dashboard as the active section by default", () => {
    vi.stubGlobal("fetch", mockedFetch.mockRejectedValue(new Error("no backend")));
    render(<App />);

    const dashboardButton = screen.getByRole("button", { name: /Dashboard/ });
    expect(dashboardButton.getAttribute("aria-current")).toBe("page");
    expect(screen.getByTestId("current-area").textContent).toBe("Dashboard");
  });

  it("navigates to a placeholder section when its nav item is clicked", async () => {
    vi.stubGlobal("fetch", mockedFetch.mockRejectedValue(new Error("no backend")));
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Lesson Planner/ }));
    expect(screen.getByTestId("current-area").textContent).toBe("Lesson Planner");
    expect(screen.getByTestId("placeholder-panel")).toBeTruthy();
    expect(screen.getByTestId("placeholder-panel").textContent).toContain("Phase 04");
  });

  it("shows the backend as connected when /api/health succeeds (Phase 01 contract)", async () => {
    vi.stubGlobal(
      "fetch",
      mockedFetch.mockResolvedValue(
        new Response(
          JSON.stringify({
            status: "ok",
            app: "AI Teacher Assistant API",
            version: "0.1.0",
            environment: "test",
            crew: { initialized: true, agents: ["AI Teaching Assistant"] },
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
      ),
    );
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("status-backend").textContent).toContain("connected"),
    );
  });

  it("shows the backend as unavailable when /api/health fails (Phase 01 contract)", async () => {
    vi.stubGlobal(
      "fetch",
      mockedFetch.mockResolvedValue(new Response(null, { status: 503 })),
    );
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("status-backend").textContent).toContain("unavailable"),
    );
  });
});
