/** Auto-generated from examples/sample-data/basic.kicad_sch — do not edit by hand. */
import type { DeviceSymbolSpec } from './DeviceSymbolSpecTypes';

export const DEVICE_SYMBOL_SPECS: Record<string, DeviceSymbolSpec> = {
	"Device:C": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0.254,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "C",
				"at": {
					"x": 0.635,
					"y": 2.54,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Value",
				"value": "C",
				"at": {
					"x": 0.635,
					"y": -2.54,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0.9652,
					"y": -3.81,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Unpolarized capacitor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "cap capacitor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "C_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "C_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-2.032,
								0.762
							],
							[
								2.032,
								0.762
							]
						],
						"w": 0.508
					},
					{
						"t": "pl",
						"pts": [
							[
								-2.032,
								-0.762
							],
							[
								2.032,
								-0.762
							]
						],
						"w": 0.508
					}
				]
			},
			{
				"name": "C_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 2.794,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 2.794,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:C_Polarized": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0.254,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "C",
				"at": {
					"x": 0.635,
					"y": 2.54,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Value",
				"value": "C_Polarized",
				"at": {
					"x": 0.635,
					"y": -2.54,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0.9652,
					"y": -3.81,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Polarized capacitor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "cap capacitor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "CP_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "C_Polarized_0_1",
				"graphics": [
					{
						"t": "rect",
						"s": [
							-2.286,
							0.508
						],
						"e": [
							2.286,
							1.016
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.778,
								2.286
							],
							[
								-0.762,
								2.286
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.27,
								2.794
							],
							[
								-1.27,
								1.778
							]
						],
						"w": 0
					},
					{
						"t": "rect",
						"s": [
							2.286,
							-0.508
						],
						"e": [
							-2.286,
							-1.016
						],
						"w": 0,
						"fill": "outline"
					}
				]
			},
			{
				"name": "C_Polarized_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 2.794,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 2.794,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:Crystal": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "Y",
				"at": {
					"x": 0,
					"y": 3.81,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "Crystal",
				"at": {
					"x": 0,
					"y": -3.81,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Two pin crystal",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "quartz ceramic resonator oscillator",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "Crystal*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Crystal_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-2.54,
								0
							],
							[
								-1.905,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.905,
								-1.27
							],
							[
								-1.905,
								1.27
							]
						],
						"w": 0.508
					},
					{
						"t": "rect",
						"s": [
							-1.143,
							2.54
						],
						"e": [
							1.143,
							-2.54
						],
						"w": 0.3048
					},
					{
						"t": "pl",
						"pts": [
							[
								1.905,
								-1.27
							],
							[
								1.905,
								1.27
							]
						],
						"w": 0.508
					},
					{
						"t": "pl",
						"pts": [
							[
								2.54,
								0
							],
							[
								1.905,
								0
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "Crystal_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							-3.81,
							0,
							0
						],
						"len": 1.27,
						"name": "1",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 1.27,
						"name": "2",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:D": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "D",
				"at": {
					"x": 0,
					"y": 2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "D",
				"at": {
					"x": 0,
					"y": -2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Sim.Device",
				"value": "D",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Sim.Pins",
				"value": "1=K 2=A",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "TO-???* *_Diode_* *SingleDiode* D_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "D_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-1.27,
								1.27
							],
							[
								-1.27,
								-1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								1.27
							],
							[
								1.27,
								-1.27
							],
							[
								-1.27,
								0
							],
							[
								1.27,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								0
							],
							[
								-1.27,
								0
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "D_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							-3.81,
							0,
							0
						],
						"len": 2.54,
						"name": "K",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 2.54,
						"name": "A",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:D_Schottky": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "D",
				"at": {
					"x": 0,
					"y": 2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "D_Schottky",
				"at": {
					"x": 0,
					"y": -2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Schottky diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "diode Schottky",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "TO-???* *_Diode_* *SingleDiode* D_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "D_Schottky_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-1.905,
								0.635
							],
							[
								-1.905,
								1.27
							],
							[
								-1.27,
								1.27
							],
							[
								-1.27,
								-1.27
							],
							[
								-0.635,
								-1.27
							],
							[
								-0.635,
								-0.635
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								1.27
							],
							[
								1.27,
								-1.27
							],
							[
								-1.27,
								0
							],
							[
								1.27,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								0
							],
							[
								-1.27,
								0
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "D_Schottky_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							-3.81,
							0,
							0
						],
						"len": 2.54,
						"name": "K",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 2.54,
						"name": "A",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:D_TVS": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "D",
				"at": {
					"x": 0,
					"y": 2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "D_TVS",
				"at": {
					"x": 0,
					"y": -2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Bidirectional transient-voltage-suppression diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "diode TVS thyrector",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "TO-???* *_Diode_* *SingleDiode* D_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "D_TVS_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-2.54,
								1.27
							],
							[
								-2.54,
								-1.27
							],
							[
								2.54,
								1.27
							],
							[
								2.54,
								-1.27
							],
							[
								-2.54,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.508,
								1.27
							],
							[
								0,
								1.27
							],
							[
								0,
								-1.27
							],
							[
								-0.508,
								-1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								0
							],
							[
								-1.27,
								0
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "D_TVS_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							-3.81,
							0,
							0
						],
						"len": 2.54,
						"name": "A1",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 2.54,
						"name": "A2",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:D_Zener": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "D",
				"at": {
					"x": 0,
					"y": 2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "D_Zener",
				"at": {
					"x": 0,
					"y": -2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Zener diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "TO-???* *_Diode_* *SingleDiode* D_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "D_Zener_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-1.27,
								-1.27
							],
							[
								-1.27,
								1.27
							],
							[
								-0.762,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								0
							],
							[
								-1.27,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								-1.27
							],
							[
								1.27,
								1.27
							],
							[
								-1.27,
								0
							],
							[
								1.27,
								-1.27
							]
						],
						"w": 0.254
					}
				]
			},
			{
				"name": "D_Zener_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							-3.81,
							0,
							0
						],
						"len": 2.54,
						"name": "K",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 2.54,
						"name": "A",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:FerriteBead": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "FB",
				"at": {
					"x": -3.81,
					"y": 0.635,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "FerriteBead",
				"at": {
					"x": 3.81,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": -1.778,
					"y": 0,
					"rot": 90
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Ferrite bead",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "L ferrite bead inductor filter",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "Inductor_* L_* *Ferrite*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "FerriteBead_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-2.7686,
								0.4064
							],
							[
								-1.7018,
								2.2606
							],
							[
								2.7686,
								-0.3048
							],
							[
								1.6764,
								-2.159
							],
							[
								-2.7686,
								0.4064
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0,
								1.27
							],
							[
								0,
								1.2954
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0,
								-1.27
							],
							[
								0,
								-1.2192
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "FerriteBead_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 2.54,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 2.54,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:Fuse": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "F",
				"at": {
					"x": 2.032,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "Fuse",
				"at": {
					"x": -1.905,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": -1.778,
					"y": 0,
					"rot": 90
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Fuse",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "fuse",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "*Fuse*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Fuse_0_1",
				"graphics": [
					{
						"t": "rect",
						"s": [
							-0.762,
							-2.54
						],
						"e": [
							0.762,
							2.54
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0,
								2.54
							],
							[
								0,
								-2.54
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "Fuse_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 1.27,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 1.27,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:L": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "L",
				"at": {
					"x": -1.27,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "L",
				"at": {
					"x": 1.905,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Inductor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "inductor choke coil reactor magnetic",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "Choke_* *Coil* Inductor_* L_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "L_0_1",
				"graphics": [
					{
						"t": "arc",
						"s": [
							0,
							2.54
						],
						"m": [
							0.6323,
							1.905
						],
						"e": [
							0,
							1.27
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							0,
							1.27
						],
						"m": [
							0.6323,
							0.635
						],
						"e": [
							0,
							0
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							0,
							0
						],
						"m": [
							0.6323,
							-0.635
						],
						"e": [
							0,
							-1.27
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							0,
							-1.27
						],
						"m": [
							0.6323,
							-1.905
						],
						"e": [
							0,
							-2.54
						],
						"w": 0
					}
				]
			},
			{
				"name": "L_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 1.27,
						"name": "1",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 1.27,
						"name": "2",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:LED": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "D",
				"at": {
					"x": 0,
					"y": 2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "LED",
				"at": {
					"x": 0,
					"y": -2.54,
					"rot": 0
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Light emitting diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Sim.Pins",
				"value": "1=K 2=A",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "LED diode",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "LED* LED_SMD:* LED_THT:*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "LED_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-3.048,
								-0.762
							],
							[
								-4.572,
								-2.286
							],
							[
								-3.81,
								-2.286
							],
							[
								-4.572,
								-2.286
							],
							[
								-4.572,
								-1.524
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.778,
								-0.762
							],
							[
								-3.302,
								-2.286
							],
							[
								-2.54,
								-2.286
							],
							[
								-3.302,
								-2.286
							],
							[
								-3.302,
								-1.524
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.27,
								0
							],
							[
								1.27,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.27,
								-1.27
							],
							[
								-1.27,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								-1.27
							],
							[
								1.27,
								1.27
							],
							[
								-1.27,
								0
							],
							[
								1.27,
								-1.27
							]
						],
						"w": 0.254
					}
				]
			},
			{
				"name": "LED_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							-3.81,
							0,
							0
						],
						"len": 2.54,
						"name": "K",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 2.54,
						"name": "A",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:Q_NMOS": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "Q",
				"at": {
					"x": 5.08,
					"y": 1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Value",
				"value": "Q_NMOS",
				"at": {
					"x": 5.08,
					"y": -1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 5.08,
					"y": 2.54,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "N-MOSFET transistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "NMOS N-MOS",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Q_NMOS_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								0.254,
								1.905
							],
							[
								0.254,
								-1.905
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.254,
								0
							],
							[
								-2.54,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								2.286
							],
							[
								0.762,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								0.508
							],
							[
								0.762,
								-0.508
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								-1.27
							],
							[
								0.762,
								-2.286
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								-1.778
							],
							[
								3.302,
								-1.778
							],
							[
								3.302,
								1.778
							],
							[
								0.762,
								1.778
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								1.016,
								0
							],
							[
								2.032,
								0.381
							],
							[
								2.032,
								-0.381
							],
							[
								1.016,
								0
							]
						],
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "cir",
						"c": [
							1.651,
							0
						],
						"r": 2.794,
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								2.54,
								2.54
							],
							[
								2.54,
								1.778
							]
						],
						"w": 0
					},
					{
						"t": "cir",
						"c": [
							2.54,
							1.778
						],
						"r": 0.254,
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "cir",
						"c": [
							2.54,
							-1.778
						],
						"r": 0.254,
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "pl",
						"pts": [
							[
								2.54,
								-2.54
							],
							[
								2.54,
								0
							],
							[
								0.762,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								2.921,
								0.381
							],
							[
								3.683,
								0.381
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								3.302,
								0.381
							],
							[
								2.921,
								-0.254
							],
							[
								3.683,
								-0.254
							],
							[
								3.302,
								0.381
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "Q_NMOS_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							5.08,
							270
						],
						"len": 2.54,
						"name": "D",
						"num": "D"
					},
					{
						"t": "pin",
						"et": "input",
						"sh": "line",
						"at": [
							-5.08,
							0,
							0
						],
						"len": 2.54,
						"name": "G",
						"num": "G"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							-5.08,
							90
						],
						"len": 2.54,
						"name": "S",
						"num": "S"
					}
				]
			}
		]
	},
	"Device:Q_NPN": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "Q",
				"at": {
					"x": 5.08,
					"y": 1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Value",
				"value": "Q_NPN",
				"at": {
					"x": 5.08,
					"y": -1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 5.08,
					"y": 2.54,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "NPN bipolar junction transistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "BJT",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Q_NPN_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-2.54,
								0
							],
							[
								0.635,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.635,
								1.905
							],
							[
								0.635,
								-1.905
							]
						],
						"w": 0.508
					},
					{
						"t": "pl",
						"pts": [
							[
								0.635,
								0.635
							],
							[
								2.54,
								2.54
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.635,
								-0.635
							],
							[
								2.54,
								-2.54
							]
						],
						"w": 0
					},
					{
						"t": "cir",
						"c": [
							1.27,
							0
						],
						"r": 2.8194,
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.27,
								-1.778
							],
							[
								1.778,
								-1.27
							],
							[
								2.286,
								-2.286
							],
							[
								1.27,
								-1.778
							]
						],
						"w": 0,
						"fill": "outline"
					}
				]
			},
			{
				"name": "Q_NPN_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "input",
						"sh": "line",
						"at": [
							-5.08,
							0,
							0
						],
						"len": 2.54,
						"name": "B",
						"num": "B"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							5.08,
							270
						],
						"len": 2.54,
						"name": "C",
						"num": "C"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							-5.08,
							90
						],
						"len": 2.54,
						"name": "E",
						"num": "E"
					}
				]
			}
		]
	},
	"Device:Q_PMOS": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "Q",
				"at": {
					"x": 5.08,
					"y": 1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Value",
				"value": "Q_PMOS",
				"at": {
					"x": 5.08,
					"y": -1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 5.08,
					"y": 2.54,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "P-MOSFET transistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "PMOS P-MOS",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Q_PMOS_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								0.254,
								1.905
							],
							[
								0.254,
								-1.905
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.254,
								0
							],
							[
								-2.54,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								2.286
							],
							[
								0.762,
								1.27
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								1.778
							],
							[
								3.302,
								1.778
							],
							[
								3.302,
								-1.778
							],
							[
								0.762,
								-1.778
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								0.508
							],
							[
								0.762,
								-0.508
							]
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								0.762,
								-1.27
							],
							[
								0.762,
								-2.286
							]
						],
						"w": 0.254
					},
					{
						"t": "cir",
						"c": [
							1.651,
							0
						],
						"r": 2.794,
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								2.286,
								0
							],
							[
								1.27,
								0.381
							],
							[
								1.27,
								-0.381
							],
							[
								2.286,
								0
							]
						],
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "pl",
						"pts": [
							[
								2.54,
								2.54
							],
							[
								2.54,
								1.778
							]
						],
						"w": 0
					},
					{
						"t": "cir",
						"c": [
							2.54,
							1.778
						],
						"r": 0.254,
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "cir",
						"c": [
							2.54,
							-1.778
						],
						"r": 0.254,
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "pl",
						"pts": [
							[
								2.54,
								-2.54
							],
							[
								2.54,
								0
							],
							[
								0.762,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								2.921,
								-0.381
							],
							[
								3.683,
								-0.381
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								3.302,
								-0.381
							],
							[
								2.921,
								0.254
							],
							[
								3.683,
								0.254
							],
							[
								3.302,
								-0.381
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "Q_PMOS_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							5.08,
							270
						],
						"len": 2.54,
						"name": "D",
						"num": "D"
					},
					{
						"t": "pin",
						"et": "input",
						"sh": "line",
						"at": [
							-5.08,
							0,
							0
						],
						"len": 2.54,
						"name": "G",
						"num": "G"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							-5.08,
							90
						],
						"len": 2.54,
						"name": "S",
						"num": "S"
					}
				]
			}
		]
	},
	"Device:Q_PNP": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "Q",
				"at": {
					"x": 5.08,
					"y": 1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Value",
				"value": "Q_PNP",
				"at": {
					"x": 5.08,
					"y": -1.27,
					"rot": 0
				},
				"hide": false,
				"justifyH": "left"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 5.08,
					"y": 2.54,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "PNP bipolar junction transistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "BJT",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Q_PNP_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-2.54,
								0
							],
							[
								0.635,
								0
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.635,
								1.905
							],
							[
								0.635,
								-1.905
							]
						],
						"w": 0.508
					},
					{
						"t": "pl",
						"pts": [
							[
								0.635,
								0.635
							],
							[
								2.54,
								2.54
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								0.635,
								-0.635
							],
							[
								2.54,
								-2.54
							]
						],
						"w": 0
					},
					{
						"t": "cir",
						"c": [
							1.27,
							0
						],
						"r": 2.8194,
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								2.286,
								-1.778
							],
							[
								1.778,
								-2.286
							],
							[
								1.27,
								-1.27
							],
							[
								2.286,
								-1.778
							]
						],
						"w": 0,
						"fill": "outline"
					}
				]
			},
			{
				"name": "Q_PNP_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "input",
						"sh": "line",
						"at": [
							-5.08,
							0,
							0
						],
						"len": 2.54,
						"name": "B",
						"num": "B"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							5.08,
							270
						],
						"len": 2.54,
						"name": "C",
						"num": "C"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							2.54,
							-5.08,
							90
						],
						"len": 2.54,
						"name": "E",
						"num": "E"
					}
				]
			}
		]
	},
	"Device:R": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "R",
				"at": {
					"x": 2.032,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "R",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": -1.778,
					"y": 0,
					"rot": 90
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Resistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "R res resistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "R_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "R_0_1",
				"graphics": [
					{
						"t": "rect",
						"s": [
							-1.016,
							-2.54
						],
						"e": [
							1.016,
							2.54
						],
						"w": 0.254
					}
				]
			},
			{
				"name": "R_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 1.27,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 1.27,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:R_Potentiometer": {
		"pinNumbersHide": false,
		"hasPinNumbers": false,
		"pinNamesOffset": 1.016,
		"pinNamesHide": true,
		"props": [
			{
				"name": "Reference",
				"value": "RV",
				"at": {
					"x": -4.445,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "R_Potentiometer",
				"at": {
					"x": -2.54,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Potentiometer",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Sim.Device",
				"value": "R",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Sim.Type",
				"value": "POT",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Sim.Pins",
				"value": "1=r0 2=wiper 3=r1",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "resistor variable",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "Potentiometer*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "R_Potentiometer_0_1",
				"graphics": [
					{
						"t": "rect",
						"s": [
							1.016,
							2.54
						],
						"e": [
							-1.016,
							-2.54
						],
						"w": 0.254
					},
					{
						"t": "pl",
						"pts": [
							[
								1.143,
								0
							],
							[
								2.286,
								0.508
							],
							[
								2.286,
								-0.508
							],
							[
								1.143,
								0
							]
						],
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "pl",
						"pts": [
							[
								2.54,
								0
							],
							[
								1.524,
								0
							]
						],
						"w": 0
					}
				]
			},
			{
				"name": "R_Potentiometer_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 1.27,
						"name": "1",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							3.81,
							0,
							180
						],
						"len": 1.27,
						"name": "2",
						"num": "2"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 1.27,
						"name": "3",
						"num": "3"
					}
				]
			}
		]
	},
	"Device:Thermistor": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "TH",
				"at": {
					"x": 2.54,
					"y": 1.27,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "Thermistor",
				"at": {
					"x": -2.54,
					"y": 0,
					"rot": 90
				},
				"hide": false,
				"justifyV": "bottom"
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Temperature dependent resistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "R res thermistor",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "R_* RV_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Thermistor_0_1",
				"graphics": [
					{
						"t": "pl",
						"pts": [
							[
								-1.905,
								3.175
							],
							[
								-1.905,
								1.905
							],
							[
								1.905,
								-1.905
							],
							[
								1.905,
								-3.175
							]
						],
						"w": 0.254
					}
				]
			},
			{
				"name": "Thermistor_1_1",
				"graphics": [
					{
						"t": "rect",
						"s": [
							-1.016,
							2.54
						],
						"e": [
							1.016,
							-2.54
						],
						"w": 0.254,
						"st": "solid"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							5.08,
							270
						],
						"len": 2.54,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-5.08,
							90
						],
						"len": 2.54,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	},
	"Device:Thermistor_NTC": {
		"pinNumbersHide": true,
		"hasPinNumbers": true,
		"pinNamesOffset": 0,
		"pinNamesHide": false,
		"props": [
			{
				"name": "Reference",
				"value": "TH",
				"at": {
					"x": -4.445,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Value",
				"value": "Thermistor_NTC",
				"at": {
					"x": 3.175,
					"y": 0,
					"rot": 90
				},
				"hide": false
			},
			{
				"name": "Footprint",
				"value": "",
				"at": {
					"x": 0,
					"y": 1.27,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Datasheet",
				"value": "",
				"at": {
					"x": 0,
					"y": 1.27,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "Description",
				"value": "Temperature dependent resistor, negative temperature coefficient",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_keywords",
				"value": "thermistor NTC resistor sensor RTD",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			},
			{
				"name": "ki_fp_filters",
				"value": "R_* RV_*",
				"at": {
					"x": 0,
					"y": 0,
					"rot": 0
				},
				"hide": true
			}
		],
		"units": [
			{
				"name": "Thermistor_NTC_0_1",
				"graphics": [
					{
						"t": "arc",
						"s": [
							-3.175,
							2.413
						],
						"m": [
							-3.0506,
							2.3165
						],
						"e": [
							-3.048,
							2.159
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							-3.048,
							2.794
						],
						"m": [
							-2.9736,
							2.9736
						],
						"e": [
							-2.794,
							3.048
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							-2.794,
							3.048
						],
						"m": [
							-2.6144,
							2.9736
						],
						"e": [
							-2.54,
							2.794
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							-2.794,
							2.54
						],
						"m": [
							-2.9736,
							2.6144
						],
						"e": [
							-3.048,
							2.794
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							-2.794,
							1.905
						],
						"m": [
							-2.9736,
							1.9794
						],
						"e": [
							-3.048,
							2.159
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							-2.54,
							2.159
						],
						"m": [
							-2.6144,
							1.9794
						],
						"e": [
							-2.794,
							1.905
						],
						"w": 0
					},
					{
						"t": "arc",
						"s": [
							-2.159,
							2.794
						],
						"m": [
							-2.434,
							2.5608
						],
						"e": [
							-2.794,
							2.54
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-2.54,
								2.159
							],
							[
								-2.54,
								2.794
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-2.54,
								-3.683
							],
							[
								-2.54,
								-1.397
							],
							[
								-2.794,
								-2.159
							],
							[
								-2.286,
								-2.159
							],
							[
								-2.54,
								-1.397
							],
							[
								-2.54,
								-1.651
							]
						],
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.778,
								2.54
							],
							[
								-1.778,
								1.524
							],
							[
								1.778,
								-1.524
							],
							[
								1.778,
								-2.54
							]
						],
						"w": 0
					},
					{
						"t": "pl",
						"pts": [
							[
								-1.778,
								-1.397
							],
							[
								-1.778,
								-3.683
							],
							[
								-2.032,
								-2.921
							],
							[
								-1.524,
								-2.921
							],
							[
								-1.778,
								-3.683
							],
							[
								-1.778,
								-3.429
							]
						],
						"w": 0,
						"fill": "outline"
					},
					{
						"t": "rect",
						"s": [
							-1.016,
							2.54
						],
						"e": [
							1.016,
							-2.54
						],
						"w": 0.254
					}
				]
			},
			{
				"name": "Thermistor_NTC_1_1",
				"graphics": [
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							3.81,
							270
						],
						"len": 1.27,
						"name": "",
						"num": "1"
					},
					{
						"t": "pin",
						"et": "passive",
						"sh": "line",
						"at": [
							0,
							-3.81,
							90
						],
						"len": 1.27,
						"name": "",
						"num": "2"
					}
				]
			}
		]
	}
};
