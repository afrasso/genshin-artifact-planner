import { readFileSync } from "fs";
import { load } from "js-yaml";

export default load(readFileSync("./data/characters.yaml"));
