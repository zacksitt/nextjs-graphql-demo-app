import PokemonSearch from "../pages/index";
import {waitForElement} from "@testing-library/jest-dom";
import { fireEvent, render, screen, } from "@testing-library/react";

describe("Find pokemon", () => {
    it("renders a find pokemon", () => {
      render(<PokemonSearch />);
      // check if all components are rendered
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("search-button")).toBeInTheDocument(); 
      //expect(screen.getByTestId("name-text")).toBeInTheDocument(); 
    });
    it("search pokemon", async () => {
        render(<PokemonSearch />);
        // check search funtionality
        const searchInput = screen.getByTestId("search-input");
        const searchButton = screen.getByTestId("search-button");
        fireEvent.change(searchInput, { target: { value: "Venusaur" } });
        await searchButton.click();
        const {getByTestId} = render(<PokemonSearch />);
        // await waitForElement(() => screen.getByTestId('name-test'));
        const nameText = getByTestId("name-text");
        await expect(nameText).toHaveTextContent("Venusaur");
      });
  });