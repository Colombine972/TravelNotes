import AbstractSeeder from "./AbstractSeeder.js";

class NoteSeeder extends AbstractSeeder {
  constructor() {
    super("notes", true);
  }

  async run() {
    for (let i = 0; i < 10; i += 1) {
      this.insert({
        title: this.faker.lorem.words(3),
        content: this.faker.lorem.paragraph(),
      });
    }
  }
}

export default NoteSeeder;
