import Fs from "node:fs/promises";

(async () => {
  const dayNum = parseInt(process.argv[2], 10);

  if (!dayNum || Number.isNaN(dayNum)) {
    throw new Error("invalid day number");
  }

  const base = `./src/day-${dayNum}`;

  await Fs.mkdir(new URL(base, import.meta.url));
  await Fs.mkdir(new URL(`${base}/input`, import.meta.url));
  await Fs.writeFile(new URL(`${base}/index.ts`, import.meta.url), "");
  await Fs.writeFile(
    new URL(`${base}/day-${dayNum}.test.ts`, import.meta.url),
    await Fs.readFile(new URL("./day.tpl", import.meta.url), {
      encoding: "utf8"
    })
  );

  console.log(`Day ${dayNum} scaffolded`);
})();
