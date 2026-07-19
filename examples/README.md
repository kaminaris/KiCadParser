# Examples

Runnable, self-contained examples for getting started reading, inspecting,
modifying, and building KiCad schematic/board files with this parser.

This folder has its own tooling (like `test/`) so the repo root stays a plain
TypeScript source tree with nothing for a consuming project's bundler to trip
over.

## Setup

```
cd examples
yarn install
```

## Running

```
yarn 01   # parse a schematic, list placed symbols
yarn 02   # parse a board, list layers + footprints
yarn 03   # load, modify a symbol's Value, write back out
yarn 04   # build a board layer stackup from scratch
yarn 05   # load a hierarchical multi-sheet project, print a BOM
yarn 06   # build a 3D model reference + symbol instance data from scratch
```

Each script is a plain, heavily-commented `.ts` file - read the source
alongside running it. `sample-data/` holds the small fixture files they
read from (a standalone schematic, a small board, and a 6-sheet hierarchical
project), copied from the test suite's fixtures.

## Where to go next

- [`src/KicadParser.ts`](../src/KicadParser.ts) - the tokenizer/parser and the
  `nodeMap` of every element name it recognizes.
- [`src/KicadElement.ts`](../src/KicadElement.ts) - the base class every
  element extends: `findChildrenByClass`/`findAllChildrenByClass`,
  `findOrCreateChildByClass`, `write()`, etc.
- [`src/Project/KicadProject.ts`](../src/Project/KicadProject.ts) - ties a
  schematic + board together and resolves hierarchical sheets.
- `test/` - the test suite doubles as a much larger set of usage examples
  against real-world KiCad 10 files.
