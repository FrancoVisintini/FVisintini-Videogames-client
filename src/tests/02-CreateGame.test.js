import React from "react";
import { configure, mount,shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "./db.json";
import CreateGame from "../components/CreateGame/CreateGame";

configure({ adapter: new Adapter() });

describe("<CreateGame />", () => {
  const state = { games: data.games, allPlatforms: data.allPlatforms, allGenres: data.allGenres };
  const mockStore = configureStore([thunk]);

  beforeAll(() => expect(isReact.classComponent(CreateGame)).toBeFalsy());

  describe("Estructura", () => {
    let createGame;
    let store = mockStore(state);
    beforeEach(() => {
      createGame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters/create"]}>
            <CreateGame />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {expect(createGame.find("form")).toHaveLength(1)});

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createGame.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "released"', () => {
      expect(createGame.find('input[name="released"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "rating"', () => {
      expect(createGame.find('input[name="rating"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "image"', () => {
        expect(createGame.find('input[name="image"]')).toHaveLength(1);
      });

    it('Debería renderizar un textarea con la propiedad "name" igual a "description"', () => {
        expect(createGame.find('textarea[name="description"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create Game"', () => {
      expect(createGame.find('button[type="submit"]')).toHaveLength(1);
      expect(createGame.find("button").at(0).text()).toEqual("Create Game");
    });
  });

});