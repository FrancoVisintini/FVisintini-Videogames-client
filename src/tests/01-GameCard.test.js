
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";
import * as data from "./db.json";
import GameCard from "../components/GameCard/GameCard.jsx";

configure({ adapter: new Adapter() });

describe("<GameCard />", () => {
  let gameCard;
  let game1 = data.games[0];
  let game2 = data.games[1];
  let game3 = data.games[2];


  beforeEach(() => {
    gameCard = (game) =>
      shallow(
        <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.image}
            genres={game.genres}
        />
      );
    expect(isReact.classComponent(GameCard)).toBeFalsy();
  });

  it('Should render an "img" tag y use as source the image of the game', () => {
    expect(gameCard(game1).find("img").at(0).prop("src")).toEqual(
        game1.image
    );
    expect(gameCard(game2).find("img").at(0).prop("src")).toEqual(
      game2.image
    );
    expect(gameCard(game3).find("img").at(0).prop("src")).toEqual(
        game3.image
    );
  });

  it('Should render an "h4" with the game name', () => {
    expect(gameCard(game1).find("h4").at(0).text()).toBe(game1.name);
    expect(gameCard(game2).find("h4").at(0).text()).toBe(game2.name);
    expect(gameCard(game3).find("h4").at(0).text()).toBe(game3.name);
  });

  it('Should render an "h5" with the game genres', () => {
    expect(gameCard(game1).find("h5").at(0).text()).toBe(game1.genres.join(', '));
    expect(gameCard(game2).find("h5").at(0).text()).toBe(game2.genres.join(', '));
    expect(gameCard(game3).find("h5").at(0).text()).toBe(game3.genres.join(', '));
  });

});
