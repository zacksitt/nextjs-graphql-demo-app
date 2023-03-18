import PokemonSearch from "../pages/index";
import {waitForElement} from "@testing-library/jest-dom";
import { fireEvent, render, screen,waitFor } from "@testing-library/react";

describe("Find pokemon", () => {
    it("renders a find pokemon", () => {
      render(<PokemonSearch />);
      // check if all components are rendered
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
      expect(screen.getByTestId("search-button")).toBeInTheDocument(); 
      expect(screen.getByTestId("name-text")).toBeInTheDocument(); 
    });
    it("search pokemon", async () => {
        render(<PokemonSearch />);
        // check search funtionality
        await waitFor(async () => {
          const searchInput = await screen.getByTestId("search-input");
          const searchButton = await screen.getByTestId("search-button");
          await fireEvent.change(searchInput, { target: { value: "Bulbasaur"}});
          await searchButton.click();
          const nameText = await screen.getByTestId("name-text");
          await expect(nameText).toHaveTextContent("Bulbasaur");
          await expect(nameText).toHaveTextContent("Grass");
        });
        
      });
      it("search pokemon", async () => {
        render(<PokemonSearch />);
        // check search funtionality
        await waitFor(async () => {
          const searchInput = await screen.getByTestId("search-input");
          const searchButton = await screen.getByTestId("search-button");
          await fireEvent.change(searchInput, { target: { value: "Charmander"}});
          await searchButton.click();
          const nameText = await screen.getByTestId("name-text");
          await expect(nameText).toHaveTextContent("Charmander");
          await expect(nameText).toHaveTextContent("Fire");
        });
        
      });
      it("search pokemon", async () => {
        render(<PokemonSearch />);
        // check search funtionality
        await waitFor(async () => {
          const searchInput = await screen.getByTestId("search-input");
          const searchButton = await screen.getByTestId("search-button");
          await fireEvent.change(searchInput, { target: { value: "Squirtle"}});
          await searchButton.click();
          const nameText = await screen.getByTestId("name-text");
          await expect(nameText).toHaveTextContent("Squirtle");
          await expect(nameText).toHaveTextContent("Water");
        });
        
      });
  });