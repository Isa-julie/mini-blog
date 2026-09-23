import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Post from "./Post";
import type { Post as PostType } from "../types/Post";

const basePost: PostType = {
  id: 99,
  title: "Test Driven Development in Practice",
  author: "Casey",
  content: "This is a sample post used only for testing purposes here.",
  datePosted: "2024-01-01T00:00:00.000Z",
};

describe("Post", () => {
  it("renders the title, author, and a shortened preview", () => {
    render(<Post post={basePost} />);

    expect(screen.getByText(basePost.title)).toBeInTheDocument();
    expect(screen.getByText(basePost.author)).toBeInTheDocument();
    expect(screen.getByText(/sample post used only for testing/)).toBeInTheDocument();
  });

  it("does not show a 'New!' badge for an old post", () => {
    render(<Post post={basePost} />);
    expect(screen.queryByText("New!")).not.toBeInTheDocument();
  });

  it("shows a 'New!' badge for a post from the last 24 hours", () => {
    const recentPost: PostType = {
      ...basePost,
      id: 100,
      datePosted: new Date().toISOString(),
    };

    render(<Post post={recentPost} />);
    expect(screen.getByText("New!")).toBeInTheDocument();
  });
});
