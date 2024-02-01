import fs from "node:fs/promises";

export const generateUniqueID = async (filePath) => {
  try {
    const fileContents = await fs.readFile(filePath, { encoding: "utf8", flag: "r" });
    const data = JSON.parse(fileContents);
    let maxId = 0;

    data.forEach((item) => {
      if (item.id && +item.id > +maxId) {
        maxId = +item.id;
      }
    });

    return +maxId + 1;
  } catch (error) {
    throw new Error("Ошибка чтения файла");
  }
};

// Пример использования:
// console.log(await generateUniqueID("./tasks.json"));
