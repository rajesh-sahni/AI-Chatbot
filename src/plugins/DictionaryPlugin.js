import BasePlugin from "./BasePlugin";
import axios from "axios";

class DictionaryPlugin extends BasePlugin {
  constructor() {
    super("define", "/define");
  }

  async process(word) {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response.data[0];
    } catch (error) {
      throw new Error("Word not found in dictionary");
    }
  }

  render(data) {
    return {
      type: "dictionary",
      content: {
        word: data.word,
        phonetic: data.phonetic,
        meanings: data.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((def) => ({
            definition: def.definition,
            example: def.example,
          })),
        })),
      },
    };
  }
}

export default new DictionaryPlugin();
