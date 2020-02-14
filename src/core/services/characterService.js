import * as speciesAPI from "../fetch-api/speciesAPI";

import * as characterAPI from "../fetch-api/charactersAPI";

const service = {
  getCharacter: id => characterAPI.get(id),

  getCharacters: params => characterAPI.getList(params),

  saveCharacter: character => characterAPI.save(character),

  removeCharacter: character => characterAPI.remove(character),

  getSpecies: params => speciesAPI.getList(params),

  getGenders: () => {
    return Promise.resolve([
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "n/a", label: "n/a" }
    ]);
  }
};

export default service;
