Fixtures in this directory are pulled from KiCad's own regression-test corpus
and official symbol libraries, used here purely as parser test input:

- `eeschema/`, `pcbnew/` — from [`qa/data/`](https://gitlab.com/kicad/code/kicad/-/tree/master/qa/data)
  in the [KiCad source repository](https://gitlab.com/kicad/code/kicad) (GPL-licensed).
  These are the fixture files KiCad's own developers use to regression-test the
  schematic/board file format, mostly named after the issue they reproduce.
- `libraries/Device.kicad_sym`, `libraries/power.kicad_sym` — KiCad's official
  standard symbol libraries (from `qa/data/libraries/`), licensed CC-BY-SA 4.0
  by the KiCad project. Included for broad, real-world symbol-syntax coverage
  (arcs, beziers, multi-unit/De Morgan symbols, pin types, etc).

See the upstream repository for authoritative licensing of each file. Not
redistributed as part of any published package — test fixtures only.
