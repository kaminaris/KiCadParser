# kicad-io

TypeScript library for parsing, modifying, and serialising KiCad S-expression
files (`.kicad_sch`, `.kicad_pcb`, `.kicad_sym`).

The library is **source-only** — there is no root `package.json`. Consuming
projects reference it via TypeScript project references (`tsconfig.json`
`references` array).

---

## Overview

KiCad stores schematics, boards, and symbol libraries as S-expression (sexpr)
text files.  This library turns those files into a typed, navigable tree of
`KicadElement` objects, lets you inspect and modify the tree, and writes it
back to a valid KiCad file.

```
parse(text) → KicadElement tree → mutate → element.write() → text
```

---

## Structure

```
src/
  KicadParser.ts          # tokeniser + recursive-descent S-expr parser
  KicadElement.ts         # base class for every tree node
  KicadElement*.ts        # ~70 typed element subclasses
  Project/
    KicadSExprFile.ts     # abstract base: load → parse → write
    KicadSchematic.ts     # .kicad_sch loader, resolves hierarchical sheets
    KicadBoard.ts         # .kicad_pcb loader
    KicadProject.ts       # ties a schematic + board together
    SymbolBOMInterface.ts # BOM row shape + groupBOM() helper
    PathUtils.ts          # platform-agnostic path helpers
  Builder/
    PassiveSymbolBuilder.ts   # entry point – re-exports all builder APIs
    PassiveSymbolFromSpec.ts  # build a Device:* symbol from a spec object
    PassiveSymbolManualVariants.ts
    PassiveSymbolPrimitives.ts
    PassiveSymbolRegistry.ts
    PassiveSymbolTypes.ts
  Catalog/
    DeviceSymbolSpecs.ts      # geometry specs extracted from real KiCad files
    DevicePassiveSymbols.ts
    DeviceSymbolSpecTypes.ts
examples/                 # six runnable, heavily-commented example scripts
test/                     # vitest test suite
```

---

## Core API

### `KicadParser`

```ts
import { KicadParser } from './src/KicadParser';

const parser = new KicadParser();
const root = parser.parse(fileText);  // returns KicadElement
```

The parser recognises ~80 named element types via its `nodeMap` and
instantiates the appropriate subclass for each.  Unknown element names fall
back to the base `KicadElement`.

A `contextualNodeMap` handles the handful of element names whose meaning
depends on their parent (e.g. `unit` inside `units` vs. `unit` on a symbol
instance).

### `KicadElement`

The base class for every node in the tree.

| Method | Description |
|---|---|
| `findFirstChildByClass(Cls)` | First direct child that is an instance of `Cls` |
| `findChildrenByClass(Cls)` | All direct children that are instances of `Cls` |
| `findAllChildrenByClass(Cls)` | Deep search for all descendants of type `Cls` |
| `findOrCreateChildByClass(Cls)` | Find or lazily create a child of type `Cls` |
| `findFirstChildByName(name)` | First direct child with the given element name |
| `findAllChildrenByName(name)` | Deep search by element name |
| `setSimpleChild(name, value, format)` | Set/create a single-attribute leaf child |
| `getSimpleChildValue(name)` | Read the first attribute of a named child |
| `addChild(node)` | Append a child (sets `parent` + `rootLevel`) |
| `write()` | Serialise this node and all descendants back to KiCad text |

### Loading a file (`KicadSExprFile`)

The loader is I/O-agnostic — you supply a `loadFile` callback so the same code
works in Node.js, a browser, or any other runtime.

```ts
import { KicadSchematic } from './src/Project/KicadSchematic';

const sch = new KicadSchematic();
sch.loadFile = (path) => fs.promises.readFile(path, 'utf8');
sch.pathUtils = { dirname: (p) => path.dirname(p), join: (...parts) => path.join(...parts) };
await sch.loadFromPath('/path/to/my.kicad_sch');

const root = sch.rootElement!;
// navigate / modify ...
const updated = root.write();
await fs.promises.writeFile('/path/to/my.kicad_sch', updated, 'utf8');
```

### Loading a hierarchical project (`KicadProject`)

```ts
import { KicadProject } from './src/Project/KicadProject';

const project = new KicadProject();
await project.loadFromPath(loadFile, pathUtils, 'root.kicad_sch', 'board.kicad_pcb');

const schematic = project.mainSchematic!;
const board     = project.mainBoard!;
```

`KicadSchematic` automatically follows `sheet` references and populates
`schematic.sheets` with the parsed child schematics.

### Programmatic symbol building (`Builder`)

```ts
import { buildDeviceSymbolFromSpec } from './src/Builder/PassiveSymbolBuilder';

const symbol = buildDeviceSymbolFromSpec('R', '100k', '0402');
libSymbols.addChild(symbol);
```

See `examples/06-add-footprint-with-3d-model.ts` for a full walkthrough.

---

## Examples

Self-contained, runnable scripts in `examples/`:

```sh
cd examples
yarn install
yarn 01   # parse a schematic, list placed symbols
yarn 02   # parse a board, list layers + footprints
yarn 03   # load, modify a symbol's Value, write back out
yarn 04   # build a board layer stackup from scratch
yarn 05   # load a hierarchical multi-sheet project, print a BOM
yarn 06   # add a footprint with a 3D model reference from scratch
```

---

## Tests

```sh
cd test
yarn install
yarn test          # run once
yarn test:watch    # watch mode
```

The test suite uses [Vitest](https://vitest.dev/) and covers the tokeniser,
parser round-trips, element builders, and real-world KiCad 10 fixture files.

---

## License

MIT — see [LICENSE](LICENSE).
