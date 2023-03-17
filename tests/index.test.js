import PokemonSearch from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Find pokemon", () => {
    it("renders a find pokemon", () => {
      render(<PokemonSearch />);
      // check if all components are rendered
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("search-button")).toBeInTheDocument(); 
    });
  });