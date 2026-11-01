import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import DashboardPage from "../pages/DashboardPage";
import { FEATURE_CARDS, RECENT_PROJECTS } from "../data/navigation";

afterEach(() => {
  cleanup();
});

describe("<DashboardPage /> (Phase 02)", () => {
  it("renders the welcome section and New Lesson action", () => {
    render(<DashboardPage backendState="checking" />);

    expect(
      screen.getByRole("heading", { name: /Welcome back, teacher/ }),
    ).toBeTruthy();
    expect(screen.getByTestId("new-lesson-button")).toBeTruthy();
  });

  it("toggles the mock New Lesson note without calling the backend", async () => {
    render(<DashboardPage backendState="checking" />);
    expect(screen.getByTestId("new-lesson-note").className).toContain("hidden");

    fireEvent.click(screen.getByTestId("new-lesson-button"));
    expect(screen.getByTestId("new-lesson-note").className).not.toContain("hidden");
    expect(screen.getByTestId("new-lesson-note").textContent).toContain("Mock action");
  });

  it("lists the mock recent projects", () => {
    render(<DashboardPage backendState="checking" />);
    const list = screen.getByTestId("recent-projects");
    expect(list.children.length).toBe(RECENT_PROJECTS.length);
    for (const project of RECENT_PROJECTS) {
      expect(list.textContent).toContain(project.title);
      expect(list.textContent).toContain(project.subject);
    }
  });

  it("renders the feature cards grid", () => {
    render(<DashboardPage backendState="checking" />);
    const cards = screen.getByTestId("feature-cards");
    expect(cards.children.length).toBe(FEATURE_CARDS.length);
    for (const feature of FEATURE_CARDS) {
      expect(cards.textContent).toContain(feature.title);
      expect(cards.textContent).toContain(feature.badge);
    }
  });
});
