import BasePlugin from "./BasePlugin";

class DictionaryPlugin extends BasePlugin {
  constructor() {
    super("define", "/define");
  }

  async process(word) {
    try {
      if (!word) {
        throw new Error("Please provide a word to define");
      }

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          word
        )}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`No definition found for "${word}"`);
        }
        throw new Error("Failed to fetch definition");
      }

      const data = await response.json();
      const firstEntry = data[0];

      return {
        word: firstEntry.word,
        phonetic: firstEntry.phonetic,
        meanings: firstEntry.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((def) => ({
            definition: def.definition,
            example: def.example,
          })),
        })),
      };
    } catch (error) {
      throw new Error(error.message || "Failed to fetch definition");
    }
  }

  render(data) {
    return {
      type: "dictionary",
      content: data,
    };
  }
}

const dictionaryPlugin = new DictionaryPlugin();
export default dictionaryPlugin;
