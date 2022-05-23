const paises = [
    {
        nombre_en: "Afghanistan",
        nombre_es: "Afganistán",
        codigo_telef: "+93",
        codigo: "AF",
    },
    {
        nombre_en: "Albania",
        nombre_es: "Albania",
        codigo_telef: "+355",
        codigo: "AL",
    },
    {
        nombre_en: "Algeria",
        nombre_es: "Argelia",
        codigo_telef: "+213",
        codigo: "DZ",
    },
    {
        nombre_en: "AmericanSamoa",
        nombre_es: "Samoa Americana",
        codigo_telef: "+1684",
        codigo: "AS",
    },
    {
        nombre_en: "Andorra",
        nombre_es: "Andorra",
        codigo_telef: "+376",
        codigo: "AD",
    },
    {
        nombre_en: "Angola",
        nombre_es: "Angola",
        codigo_telef: "+244",
        codigo: "AO",
    },
    {
        nombre_en: "Anguilla",
        nombre_es: "Anguilla",
        codigo_telef: "+1264",
        codigo: "AI",
    },
    {
        nombre_en: "Antarctica",
        nombre_es: "Antártida",
        codigo_telef: "+672",
        codigo: "AQ",
    },
    {
        nombre_en: "Antigua and Barbuda",
        nombre_es: "Antigua y Barbuda",
        codigo_telef: "+1268",
        codigo: "AG",
    },
    {
        nombre_en: "Argentina",
        nombre_es: "Argentina",
        codigo_telef: "+54",
        codigo: "AR",
    },
    {
        nombre_en: "Armenia",
        nombre_es: "Armenia",
        codigo_telef: "+374",
        codigo: "AM",
    },
    {
        nombre_en: "Aruba",
        nombre_es: "Aruba",
        codigo_telef: "+297",
        codigo: "AW",
    },
    {
        nombre_en: "Australia",
        nombre_es: "Australia",
        codigo_telef: "+61",
        codigo: "AU",
    },
    {
        nombre_en: "Austria",
        nombre_es: "Austria",
        codigo_telef: "+43",
        codigo: "AT",
    },
    {
        nombre_en: "Azerbaijan",
        nombre_es: "Azerbaiyán",
        codigo_telef: "+994",
        codigo: "AZ",
    },
    {
        nombre_en: "Bahamas",
        nombre_es: "Bahamas",
        codigo_telef: "+1242",
        codigo: "BS",
    },
    {
        nombre_en: "Bahrain",
        nombre_es: "Baréin",
        codigo_telef: "+973",
        codigo: "BH",
    },
    {
        nombre_en: "Bangladesh",
        nombre_es: "Banglades",
        codigo_telef: "+880",
        codigo: "BD",
    },
    {
        nombre_en: "Barbados",
        nombre_es: "Barbados",
        codigo_telef: "+1246",
        codigo: "BB",
    },
    {
        nombre_en: "Belarus",
        nombre_es: "Bielorrusia",
        codigo_telef: "+375",
        codigo: "BY",
    },
    {
        nombre_en: "Belgium",
        nombre_es: "Bélgica",
        codigo_telef: "+32",
        codigo: "BE",
    },
    {
        nombre_en: "Belize",
        nombre_es: "Belice",
        codigo_telef: "+501",
        codigo: "BZ",
    },
    {
        nombre_en: "Benin",
        nombre_es: "Benin",
        codigo_telef: "+229",
        codigo: "BJ",
    },
    {
        nombre_en: "Bermuda",
        nombre_es: "Bermudas",
        codigo_telef: "+1441",
        codigo: "BM",
    },
    {
        nombre_en: "Bhutan",
        nombre_es: "Butan",
        codigo_telef: "+975",
        codigo: "BT",
    },
    {
        nombre_en: "Bolivia",
        nombre_es: "Bolivia",
        codigo_telef: "+591",
        codigo: "BO",
    },
    {
        nombre_en: "Bosnia and Herzegovina",
        nombre_es: "Bosnia-Herzegovina",
        codigo_telef: "+387",
        codigo: "BA",
    },
    {
        nombre_en: "Botswana",
        nombre_es: "Botsuana",
        codigo_telef: "+267",
        codigo: "BW",
    },
    {
        nombre_en: "Brazil",
        nombre_es: "Brasil",
        codigo_telef: "+55",
        codigo: "BR",
    },
    {
        nombre_en: "British Indian Ocean Territory",
        nombre_es: "Territorio Británico del Océano Índico",
        codigo_telef: "+246",
        codigo: "IO",
    },
    {
        nombre_en: "Brunei Darussalam",
        nombre_es: "Brunei",
        codigo_telef: "+673",
        codigo: "BN",
    },
    {
        nombre_en: "Bulgaria",
        nombre_es: "Bulgaria",
        codigo_telef: "+359",
        codigo: "BG",
    },
    {
        nombre_en: "Burkina Faso",
        nombre_es: "Burkina Faso",
        codigo_telef: "+226",
        codigo: "BF",
    },
    {
        nombre_en: "Burundi",
        nombre_es: "Burundi",
        codigo_telef: "+257",
        codigo: "BI",
    },
    {
        nombre_en: "Cambodia",
        nombre_es: "Camboya",
        codigo_telef: "+855",
        codigo: "KH",
    },
    {
        nombre_en: "Cameroon",
        nombre_es: "Camerún",
        codigo_telef: "+237",
        codigo: "CM",
    },
    {
        nombre_en: "Canada",
        nombre_es: "Canadá",
        codigo_telef: "+1",
        codigo: "CA",
    },
    {
        nombre_en: "Cape Verde",
        nombre_es: "Cabo Verde",
        codigo_telef: "+238",
        codigo: "CV",
    },
    {
        nombre_en: "Cayman Islands",
        nombre_es: "Islas Caimán",
        codigo_telef: "+ 345",
        codigo: "KY",
    },
    {
        nombre_en: "Central African Republic",
        nombre_es: "República Centroafricana",
        codigo_telef: "+236",
        codigo: "CF",
    },
    {
        nombre_en: "Chad",
        nombre_es: "Chad",
        codigo_telef: "+235",
        codigo: "TD",
    },
    {
        nombre_en: "Chile",
        nombre_es: "Chile",
        codigo_telef: "+56",
        codigo: "CL",
    },
    {
        nombre_en: "China",
        nombre_es: "China",
        codigo_telef: "+86",
        codigo: "CN",
    },
    {
        nombre_en: "Christmas Island",
        nombre_es: "Isla de Navidad",
        codigo_telef: "+61",
        codigo: "CX",
    },
    {
        nombre_en: "Cocos (Keeling) Islands",
        nombre_es: "Islas Cocos",
        codigo_telef: "+61",
        codigo: "CC",
    },
    {
        nombre_en: "Colombia",
        nombre_es: "Colombia",
        codigo_telef: "+57",
        codigo: "CO",
    },
    {
        nombre_en: "Comoros",
        nombre_es: "Comoras",
        codigo_telef: "+269",
        codigo: "KM",
    },
    {
        nombre_en: "Congo",
        nombre_es: "Congo",
        codigo_telef: "+242",
        codigo: "CG",
    },
    {
        nombre_en: "Congo, The Democratic Republic of the",
        nombre_es: "República Democrática del Congo",
        codigo_telef: "+243",
        codigo: "CD",
    },
    {
        nombre_en: "Cook Islands",
        nombre_es: "Islas Cook",
        codigo_telef: "+682",
        codigo: "CK",
    },
    {
        nombre_en: "Costa Rica",
        nombre_es: "Costa Rica",
        codigo_telef: "+506",
        codigo: "CR",
    },
    {
        nombre_en: "Cote d'Ivoire",
        nombre_es: "Costa de Marfil",
        codigo_telef: "+225",
        codigo: "CI",
    },
    {
        nombre_en: "Croatia",
        nombre_es: "Croacia",
        codigo_telef: "+385",
        codigo: "HR",
    },
    {
        nombre_en: "Cuba",
        nombre_es: "Cuba",
        codigo_telef: "+53",
        codigo: "CU",
    },
    {
        nombre_en: "Cyprus",
        nombre_es: "Chipre",
        codigo_telef: "+537",
        codigo: "CY",
    },
    {
        nombre_en: "Czechia",
        nombre_es: "Chequia",
        codigo_telef: "+420",
        codigo: "CZ",
    },
    {
        nombre_en: "Denmark",
        nombre_es: "Dinamarca",
        codigo_telef: "+45",
        codigo: "DK",
    },
    {
        nombre_en: "Djibouti",
        nombre_es: "Yibuti",
        codigo_telef: "+253",
        codigo: "DJ",
    },
    {
        nombre_en: "Dominica",
        nombre_es: "Dominica",
        codigo_telef: "+1767",
        codigo: "DM",
    },
    {
        nombre_en: "Dominican Republic",
        nombre_es: "República Dominicana",
        codigo_telef: "+1849",
        codigo: "DO",
    },
    {
        nombre_en: "Ecuador",
        nombre_es: "Ecuador",
        codigo_telef: "+593",
        codigo: "EC",
    },
    {
        nombre_en: "Egypt",
        nombre_es: "Egipto",
        codigo_telef: "+20",
        codigo: "EG",
    },
    {
        nombre_en: "El Salvador",
        nombre_es: "El Salvador",
        codigo_telef: "+503",
        codigo: "SV",
    },
    {
        nombre_en: "Equatorial Guinea",
        nombre_es: "Guinea Ecuatorial",
        codigo_telef: "+240",
        codigo: "GQ",
    },
    {
        nombre_en: "Eritrea",
        nombre_es: "Eritrea",
        codigo_telef: "+291",
        codigo: "ER",
    },
    {
        nombre_en: "Estonia",
        nombre_es: "Estonia",
        codigo_telef: "+372",
        codigo: "EE",
    },
    {
        nombre_en: "Ethiopia",
        nombre_es: "Etiopía",
        codigo_telef: "+251",
        codigo: "ET",
    },
    {
        nombre_en: "Falkland Islands (Malvinas)",
        nombre_es: "Islas Malvinas",
        codigo_telef: "+500",
        codigo: "FK",
    },
    {
        nombre_en: "Faroe Islands",
        nombre_es: "Islas Feroe",
        codigo_telef: "+298",
        codigo: "FO",
    },
    {
        nombre_en: "Fiji",
        nombre_es: "Fiyi",
        codigo_telef: "+679",
        codigo: "FJ",
    },
    {
        nombre_en: "Finland",
        nombre_es: "Finlandia",
        codigo_telef: "+358",
        codigo: "FI",
    },
    {
        nombre_en: "France",
        nombre_es: "Francia",
        codigo_telef: "+33",
        codigo: "FR",
    },
    {
        nombre_en: "French Guiana",
        nombre_es: "Guayana Francesa",
        codigo_telef: "+594",
        codigo: "GF",
    },
    {
        nombre_en: "French Polynesia",
        nombre_es: "Polinesia Francesa",
        codigo_telef: "+689",
        codigo: "PF",
    },
    {
        nombre_en: "Gabon",
        nombre_es: "Gabón",
        codigo_telef: "+241",
        codigo: "GA",
    },
    {
        nombre_en: "Gambia",
        nombre_es: "Gambia",
        codigo_telef: "+220",
        codigo: "GM",
    },
    {
        nombre_en: "Georgia",
        nombre_es: "Georgia",
        codigo_telef: "+995",
        codigo: "GE",
    },
    {
        nombre_en: "Germany",
        nombre_es: "Alemania",
        codigo_telef: "+49",
        codigo: "DE",
    },
    {
        nombre_en: "Ghana",
        nombre_es: "Ghana",
        codigo_telef: "+233",
        codigo: "GH",
    },
    {
        nombre_en: "Gibraltar",
        nombre_es: "Gibraltar",
        codigo_telef: "+350",
        codigo: "GI",
    },
    {
        nombre_en: "Greece",
        nombre_es: "Grecia",
        codigo_telef: "+30",
        codigo: "GR",
    },
    {
        nombre_en: "Greenland",
        nombre_es: "Groenlandia",
        codigo_telef: "+299",
        codigo: "GL",
    },
    {
        nombre_en: "Grenada",
        nombre_es: "Granada",
        codigo_telef: "+1473",
        codigo: "GD",
    },
    {
        nombre_en: "Guadeloupe",
        nombre_es: "Guadalupe",
        codigo_telef: "+590",
        codigo: "GP",
    },
    {
        nombre_en: "Guam",
        nombre_es: "Guam",
        codigo_telef: "+1671",
        codigo: "GU",
    },
    {
        nombre_en: "Guatemala",
        nombre_es: "Guatemala",
        codigo_telef: "+502",
        codigo: "GT",
    },
    {
        nombre_en: "Guernsey",
        nombre_es: "Guernsey",
        codigo_telef: "+44",
        codigo: "GG",
    },
    {
        nombre_en: "Guinea",
        nombre_es: "Guinea",
        codigo_telef: "+224",
        codigo: "GN",
    },
    {
        nombre_en: "Guinea-Bissau",
        nombre_es: "Guinea-Bisau",
        codigo_telef: "+245",
        codigo: "GW",
    },
    {
        nombre_en: "Guyana",
        nombre_es: "Guyana",
        codigo_telef: "+595",
        codigo: "GY",
    },
    {
        nombre_en: "Haiti",
        nombre_es: "Haití",
        codigo_telef: "+509",
        codigo: "HT",
    },
    {
        nombre_en: "Holy See (Vatican City State)",
        nombre_es: "Ciudad del Vaticano",
        codigo_telef: "+379",
        codigo: "VA",
    },
    {
        nombre_en: "Honduras",
        nombre_es: "Honduras",
        codigo_telef: "+504",
        codigo: "HN",
    },
    {
        nombre_en: "Hong Kong",
        nombre_es: "Hong Kong",
        codigo_telef: "+852",
        codigo: "HK",
    },
    {
        nombre_en: "Hungary",
        nombre_es: "Hungría",
        codigo_telef: "+36",
        codigo: "HU",
    },
    {
        nombre_en: "Iceland",
        nombre_es: "Islandia",
        codigo_telef: "+354",
        codigo: "IS",
    },
    {
        nombre_en: "India",
        nombre_es: "India",
        codigo_telef: "+91",
        codigo: "IN",
    },
    {
        nombre_en: "Indonesia",
        nombre_es: "Indonesia",
        codigo_telef: "+62",
        codigo: "ID",
    },
    {
        nombre_en: "Iran, Islamic Republic of",
        nombre_es: "Irán",
        codigo_telef: "+98",
        codigo: "IR",
    },
    {
        nombre_en: "Iraq",
        nombre_es: "Iraq",
        codigo_telef: "+964",
        codigo: "IQ",
    },
    {
        nombre_en: "Ireland",
        nombre_es: "Irlanda",
        codigo_telef: "+353",
        codigo: "IE",
    },
    {
        nombre_en: "Isle of Man",
        nombre_es: "Isla de Man",
        codigo_telef: "+44",
        codigo: "IM",
    },
    {
        nombre_en: "Israel",
        nombre_es: "Israel",
        codigo_telef: "+972",
        codigo: "IL",
    },
    {
        nombre_en: "Italy",
        nombre_es: "Italia",
        codigo_telef: "+39",
        codigo: "IT",
    },
    {
        nombre_en: "Jamaica",
        nombre_es: "Jamaica",
        codigo_telef: "+1876",
        codigo: "JM",
    },
    {
        nombre_en: "Japan",
        nombre_es: "Japón",
        codigo_telef: "+81",
        codigo: "JP",
    },
    {
        nombre_en: "Jersey",
        nombre_es: "Jersey",
        codigo_telef: "+44",
        codigo: "JE",
    },
    {
        nombre_en: "Jordan",
        nombre_es: "Jordania",
        codigo_telef: "+962",
        codigo: "JO",
    },
    {
        nombre_en: "Kazakhstan",
        nombre_es: "Kazajistán",
        codigo_telef: "+7",
        codigo: "KZ",
    },
    {
        nombre_en: "Kenya",
        nombre_es: "Kenia",
        codigo_telef: "+254",
        codigo: "KE",
    },
    {
        nombre_en: "Kiribati",
        nombre_es: "Kiribati",
        codigo_telef: "+686",
        codigo: "KI",
    },
    {
        nombre_en: "Korea, Democratic People's Republic of",
        nombre_es: "Corea del Norte",
        codigo_telef: "+850",
        codigo: "KP",
    },
    {
        nombre_en: "Korea, Republic of",
        nombre_es: "Corea del Sur",
        codigo_telef: "+82",
        codigo: "KR",
    },
    {
        nombre_en: "Kosovo",
        nombre_es: "Kosovo",
        codigo_telef: "+383",
        codigo: "XK",
    },
    {
        nombre_en: "Kuwait",
        nombre_es: "Kuwait",
        codigo_telef: "+965",
        codigo: "KW",
    },
    {
        nombre_en: "Kyrgyzstan",
        nombre_es: "Kirguistán",
        codigo_telef: "+996",
        codigo: "KG",
    },
    {
        nombre_en: "Lao People's Democratic Republic",
        nombre_es: "Laos",
        codigo_telef: "+856",
        codigo: "LA",
    },
    {
        nombre_en: "Latvia",
        nombre_es: "Letonia",
        codigo_telef: "+371",
        codigo: "LV",
    },
    {
        nombre_en: "Lebanon",
        nombre_es: "Líbano",
        codigo_telef: "+961",
        codigo: "LB",
    },
    {
        nombre_en: "Lesotho",
        nombre_es: "Lesoto",
        codigo_telef: "+266",
        codigo: "LS",
    },
    {
        nombre_en: "Liberia",
        nombre_es: "Liberia",
        codigo_telef: "+231",
        codigo: "LR",
    },
    {
        nombre_en: "Libyan Arab Jamahiriya",
        nombre_es: "Libia",
        codigo_telef: "+218",
        codigo: "LY",
    },
    {
        nombre_en: "Liechtenstein",
        nombre_es: "Liechtenstein",
        codigo_telef: "+423",
        codigo: "LI",
    },
    {
        nombre_en: "Lithuania",
        nombre_es: "Lituania",
        codigo_telef: "+370",
        codigo: "LT",
    },
    {
        nombre_en: "Luxembourg",
        nombre_es: "Luxemburgo",
        codigo_telef: "+352",
        codigo: "LU",
    },
    {
        nombre_en: "Macao",
        nombre_es: "Macao",
        codigo_telef: "+853",
        codigo: "MO",
    },
    {
        nombre_en: "Macedonia, The Former Yugoslav Republic of",
        nombre_es: "República de Macedonia",
        codigo_telef: "+389",
        codigo: "MK",
    },
    {
        nombre_en: "Madagascar",
        nombre_es: "Madagascar",
        codigo_telef: "+261",
        codigo: "MG",
    },
    {
        nombre_en: "Malawi",
        nombre_es: "Malaui",
        codigo_telef: "+265",
        codigo: "MW",
    },
    {
        nombre_en: "Malaysia",
        nombre_es: "Malasia",
        codigo_telef: "+60",
        codigo: "MY",
    },
    {
        nombre_en: "Maldives",
        nombre_es: "Maldivas",
        codigo_telef: "+960",
        codigo: "MV",
    },
    {
        nombre_en: "Mali",
        nombre_es: "Malí",
        codigo_telef: "+223",
        codigo: "ML",
    },
    {
        nombre_en: "Malta",
        nombre_es: "Malta",
        codigo_telef: "+356",
        codigo: "MT",
    },
    {
        nombre_en: "Marshall Islands",
        nombre_es: "Islas Marshall",
        codigo_telef: "+692",
        codigo: "MH",
    },
    {
        nombre_en: "Martinique",
        nombre_es: "Martinica",
        codigo_telef: "+596",
        codigo: "MQ",
    },
    {
        nombre_en: "Mauritania",
        nombre_es: "Mauritania",
        codigo_telef: "+222",
        codigo: "MR",
    },
    {
        nombre_en: "Mauritius",
        nombre_es: "Mauricio",
        codigo_telef: "+230",
        codigo: "MU",
    },
    {
        nombre_en: "Mayotte",
        nombre_es: "Mayotte",
        codigo_telef: "+262",
        codigo: "YT",
    },
    {
        nombre_en: "Mexico",
        nombre_es: "México",
        codigo_telef: "+52",
        codigo: "MX",
    },
    {
        nombre_en: "Micronesia, Federated States of",
        nombre_es: "Estados Federados de Micronesia",
        codigo_telef: "+691",
        codigo: "FM",
    },
    {
        nombre_en: "Moldova, Republic of",
        nombre_es: "Moldavia",
        codigo_telef: "+373",
        codigo: "MD",
    },
    {
        nombre_en: "Monaco",
        nombre_es: "Monaco",
        codigo_telef: "+377",
        codigo: "MC",
    },
    {
        nombre_en: "Mongolia",
        nombre_es: "Mongolia",
        codigo_telef: "+976",
        codigo: "MN",
    },
    {
        nombre_en: "Montenegro",
        nombre_es: "Montenegro",
        codigo_telef: "+382",
        codigo: "ME",
    },
    {
        nombre_en: "Montserrat",
        nombre_es: "Montserrat",
        codigo_telef: "+1664",
        codigo: "MS",
    },
    {
        nombre_en: "Morocco",
        nombre_es: "Marruecos",
        codigo_telef: "+212",
        codigo: "MA",
    },
    {
        nombre_en: "Mozambique",
        nombre_es: "Mozambique",
        codigo_telef: "+258",
        codigo: "MZ",
    },
    {
        nombre_en: "Myanmar",
        nombre_es: "Birmania",
        codigo_telef: "+95",
        codigo: "MM",
    },
    {
        nombre_en: "Namibia",
        nombre_es: "Namibia",
        codigo_telef: "+264",
        codigo: "NA",
    },
    {
        nombre_en: "Nauru",
        nombre_es: "Nauru",
        codigo_telef: "+674",
        codigo: "NR",
    },
    {
        nombre_en: "Nepal",
        nombre_es: "Nepal",
        codigo_telef: "+977",
        codigo: "NP",
    },
    {
        nombre_en: "Netherlands",
        nombre_es: "Holanda",
        codigo_telef: "+31",
        codigo: "NL",
    },
    {
        nombre_en: "Netherlands Antilles",
        nombre_es: "Antillas Holandesas",
        codigo_telef: "+599",
        codigo: "AN",
    },
    {
        nombre_en: "New Caledonia",
        nombre_es: "Nueva Caledonia",
        codigo_telef: "+687",
        codigo: "NC",
    },
    {
        nombre_en: "New Zealand",
        nombre_es: "Nueva Zelanda",
        codigo_telef: "+64",
        codigo: "NZ",
    },
    {
        nombre_en: "Nicaragua",
        nombre_es: "Nicaragua",
        codigo_telef: "+505",
        codigo: "NI",
    },
    {
        nombre_en: "Niger",
        nombre_es: "Niger",
        codigo_telef: "+227",
        codigo: "NE",
    },
    {
        nombre_en: "Nigeria",
        nombre_es: "Nigeria",
        codigo_telef: "+234",
        codigo: "NG",
    },
    {
        nombre_en: "Niue",
        nombre_es: "Niue",
        codigo_telef: "+683",
        codigo: "NU",
    },
    {
        nombre_en: "NorfolkIsland",
        nombre_es: "IslaNorfolk",
        codigo_telef: "+672",
        codigo: "NF",
    },
    {
        nombre_en: "NorthernMarianaIslands",
        nombre_es: "IslasMarianasdelNorte",
        codigo_telef: "+1670",
        codigo: "MP",
    },
    {
        nombre_en: "Norway",
        nombre_es: "Noruega",
        codigo_telef: "+47",
        codigo: "NO",
    },
    {
        nombre_en: "Oman",
        nombre_es: "Omán",
        codigo_telef: "+968",
        codigo: "OM",
    },
    {
        nombre_en: "Pakistan",
        nombre_es: "Pakistán",
        codigo_telef: "+92",
        codigo: "PK",
    },
    {
        nombre_en: "Palau",
        nombre_es: "Palaos",
        codigo_telef: "+680",
        codigo: "PW",
    },
    {
        nombre_en: "Panama",
        nombre_es: "Panamá",
        codigo_telef: "+507",
        codigo: "PA",
    },
    {
        nombre_en: "Papua New Guinea",
        nombre_es: "Papúa Nueva Guinea",
        codigo_telef: "+675",
        codigo: "PG",
    },
    {
        nombre_en: "Paraguay",
        nombre_es: "Paraguay",
        codigo_telef: "+595",
        codigo: "PY",
    },
    {
        nombre_en: "Peru",
        nombre_es: "Perú",
        codigo_telef: "+51",
        codigo: "PE",
    },
    {
        nombre_en: "Philippines",
        nombre_es: "Filipinas",
        codigo_telef: "+63",
        codigo: "PH",
    },
    {
        nombre_en: "Pitcairn",
        nombre_es: "Islas Pitcairn",
        codigo_telef: "+872",
        codigo: "PN",
    },
    {
        nombre_en: "Poland",
        nombre_es: "Polonia",
        codigo_telef: "+48",
        codigo: "PL",
    },
    {
        nombre_en: "Portugal",
        nombre_es: "Portugal",
        codigo_telef: "+351",
        codigo: "PT",
    },
    {
        nombre_en: "Puerto Rico",
        nombre_es: "Puerto Rico",
        codigo_telef: "+1939",
        codigo: "PR",
    },
    {
        nombre_en: "Qatar",
        nombre_es: "Qatar",
        codigo_telef: "+974",
        codigo: "QA",
    },
    {
        nombre_en: "Romania",
        nombre_es: "Rumania",
        codigo_telef: "+40",
        codigo: "RO",
    },
    {
        nombre_en: "Russia",
        nombre_es: "Rusia",
        codigo_telef: "+7",
        codigo: "RU",
    },
    {
        nombre_en: "Rwanda",
        nombre_es: "Ruanda",
        codigo_telef: "+250",
        codigo: "RW",
    },
    {
        nombre_en: "Réunion",
        nombre_es: "Reunion",
        codigo_telef: "+262",
        codigo: "RE",
    },
    {
        nombre_en: "Saint Barthélemy",
        nombre_es: "San Bartolome",
        codigo_telef: "+590",
        codigo: "BL",
    },
    {
        nombre_en: "Saint Helena, Ascension and Tristan Da Cunha",
        nombre_es: "Santa Elena, Ascensión y Tristán de Acuña",
        codigo_telef: "+290",
        codigo: "SH",
    },
    {
        nombre_en: "Saint Kitts and Nevis",
        nombre_es: "San Cristóbal y Nieves",
        codigo_telef: "+1869",
        codigo: "KN",
    },
    {
        nombre_en: "Saint Lucia",
        nombre_es: "Santa Lucía",
        codigo_telef: "+1758",
        codigo: "LC",
    },
    {
        nombre_en: "Saint Martin",
        nombre_es: "Isla de San Martín",
        codigo_telef: "+590",
        codigo: "MF",
    },
    {
        nombre_en: "Saint Pierre and Miquelon",
        nombre_es: "San Pedro y Miquelon",
        codigo_telef: "+508",
        codigo: "PM",
    },
    {
        nombre_en: "Saint Vincent and the Grenadines",
        nombre_es: "San Vicente y las Granadinas",
        codigo_telef: "+1784",
        codigo: "VC",
    },
    {
        nombre_en: "Samoa",
        nombre_es: "Samoa",
        codigo_telef: "+685",
        codigo: "WS",
    },
    {
        nombre_en: "San Marino",
        nombre_es: "San Marino",
        codigo_telef: "+378",
        codigo: "SM",
    },
    {
        nombre_en: "Sao Tome and Principe",
        nombre_es: " Santo Tomé y Príncipe",
        codigo_telef: "+239",
        codigo: "ST",
    },
    {
        nombre_en: "Saudi Arabia",
        nombre_es: "Arabia Saudita",
        codigo_telef: "+966",
        codigo: "SA",
    },
    {
        nombre_en: "Senegal",
        nombre_es: "Senegal",
        codigo_telef: "+221",
        codigo: "SN",
    },
    {
        nombre_en: "Serbia",
        nombre_es: "Serbia",
        codigo_telef: "+381",
        codigo: "RS",
    },
    {
        nombre_en: "Seychelles",
        nombre_es: "Seychelles",
        codigo_telef: "+248",
        codigo: "SC",
    },
    {
        nombre_en: "Sierra Leone",
        nombre_es: "Sierra Leona",
        codigo_telef: "+232",
        codigo: "SL",
    },
    {
        nombre_en: "Singapore",
        nombre_es: "Singapur",
        codigo_telef: "+65",
        codigo: "SG",
    },
    {
        nombre_en: "Slovakia",
        nombre_es: "Eslovaquia",
        codigo_telef: "+421",
        codigo: "SK",
    },
    {
        nombre_en: "Slovenia",
        nombre_es: "Eslovenia",
        codigo_telef: "+386",
        codigo: "SI",
    },
    {
        nombre_en: "Solomon Islands",
        nombre_es: "Islas Salomón",
        codigo_telef: "+677",
        codigo: "SB",
    },
    {
        nombre_en: "Somalia",
        nombre_es: "Somalia",
        codigo_telef: "+252",
        codigo: "SO",
    },
    {
        nombre_en: "South Africa",
        nombre_es: "Sudáfrica",
        codigo_telef: "+27",
        codigo: "ZA",
    },
    {
        nombre_en: "South Sudan",
        nombre_es: "Sudán del Sur",
        codigo_telef: "+211",
        codigo: "SS",
    },
    {
        nombre_en: "Spain",
        nombre_es: "España",
        codigo_telef: "+34",
        codigo: "ES",
    },
    {
        nombre_en: "Sri Lanka",
        nombre_es: "Sri Lanka",
        codigo_telef: "+94",
        codigo: "LK",
    },
    {
        nombre_en: "State of Palestine",
        nombre_es: "Estado de Palestina",
        codigo_telef: "+970",
        codigo: "PS",
    },
    {
        nombre_en: "Sudan",
        nombre_es: "Sudán",
        codigo_telef: "+249",
        codigo: "SD",
    },
    {
        nombre_en: "Suriname",
        nombre_es: "Surinam",
        codigo_telef: "+597",
        codigo: "SR",
    },
    {
        nombre_en: "Svalbard and Jan Mayen",
        nombre_es: "Svalbard y Jan Mayen",
        codigo_telef: "+47",
        codigo: "SJ",
    },
    {
        nombre_en: "Swaziland",
        nombre_es: "Suazilandia",
        codigo_telef: "+268",
        codigo: "SZ",
    },
    {
        nombre_en: "Sweden",
        nombre_es: "Suecia",
        codigo_telef: "+46",
        codigo: "SE",
    },
    {
        nombre_en: "Switzerland",
        nombre_es: "Suiza",
        codigo_telef: "+41",
        codigo: "CH",
    },
    {
        nombre_en: "Syrian Arab Republic",
        nombre_es: "Siria",
        codigo_telef: "+963",
        codigo: "SY",
    },
    {
        nombre_en: "Taiwan, Province of China",
        nombre_es: "Taiwán",
        codigo_telef: "+886",
        codigo: "TW",
    },
    {
        nombre_en: "Tayikistan",
        nombre_es: "Tayikistán",
        codigo_telef: "+992",
        codigo: "TJ",
    },
    {
        nombre_en: "Tanzania, United Republic of",
        nombre_es: "Tanzania",
        codigo_telef: "+255",
        codigo: "TZ",
    },
    {
        nombre_en: "Thailand",
        nombre_es: "Tailandia",
        codigo_telef: "+66",
        codigo: "TH",
    },
    {
        nombre_en: "Timor-Leste",
        nombre_es: "Timor Oriental",
        codigo_telef: "+670",
        codigo: "TL",
    },
    {
        nombre_en: "Togo",
        nombre_es: "Togo",
        codigo_telef: "+228",
        codigo: "TG",
    },
    {
        nombre_en: "Tokelau",
        nombre_es: "Tokelau",
        codigo_telef: "+690",
        codigo: "TK",
    },
    {
        nombre_en: "Tonga",
        nombre_es: "Tonga",
        codigo_telef: "+676",
        codigo: "TO",
    },
    {
        nombre_en: "Trinidad and Tobago",
        nombre_es: "Trinidad y Tobago",
        codigo_telef: "+1868",
        codigo: "TT",
    },
    {
        nombre_en: "Tunisia",
        nombre_es: "Túnez",
        codigo_telef: "+216",
        codigo: "TN",
    },
    {
        nombre_en: "Turkey",
        nombre_es: "Turquía",
        codigo_telef: "+90",
        codigo: "TR",
    },
    {
        nombre_en: "Turkmenistan",
        nombre_es: "Turkmenistán",
        codigo_telef: "+993",
        codigo: "TM",
    },
    {
        nombre_en: "Turks and Caicos Islands",
        nombre_es: "Islas Turcas y Caicos",
        codigo_telef: "+1649",
        codigo: "TC",
    },
    {
        nombre_en: "Tuvalu",
        nombre_es: "Tuvalu",
        codigo_telef: "+688",
        codigo: "TV",
    },
    {
        nombre_en: "Uganda",
        nombre_es: "Uganda",
        codigo_telef: "+256",
        codigo: "UG",
    },
    {
        nombre_en: "Ukraine",
        nombre_es: "Ucrania",
        codigo_telef: "+380",
        codigo: "UA",
    },
    {
        nombre_en: "United Arab Emirates",
        nombre_es: "Emiratos Árabes Unidos",
        codigo_telef: "+971",
        codigo: "AE",
    },
    {
        nombre_en: "United Kingdom",
        nombre_es: "Reino Unido",
        codigo_telef: "+44",
        codigo: "GB",
    },
    {
        nombre_en: "United States",
        nombre_es: "Estados Unidos",
        codigo_telef: "+1",
        codigo: "US",
    },
    {
        nombre_en: "Uruguay",
        nombre_es: "Uruguay",
        codigo_telef: "+598",
        codigo: "UY",
    },
    {
        nombre_en: "Uzbekistan",
        nombre_es: "Uzbekistán",
        codigo_telef: "+998",
        codigo: "UZ",
    },
    {
        nombre_en: "Vanuatu",
        nombre_es: "Vanuatu",
        codigo_telef: "+678",
        codigo: "VU",
    },
    {
        nombre_en: "Venezuela, Bolivarian Republic of",
        nombre_es: "Venezuela",
        codigo_telef: "+58",
        codigo: "VE",
    },
    {
        nombre_en: "Vietnam",
        nombre_es: "Vietnam",
        codigo_telef: "+84",
        codigo: "VN",
    },
    {
        nombre_en: "Virgin Islands, British",
        nombre_es: "Islas Vírgenes Británicas",
        codigo_telef: "+1284",
        codigo: "VG",
    },
    {
        nombre_en: "Virgin Islands, U.S.",
        nombre_es: "Islas Vírgenes de los Estados Unidos",
        codigo_telef: "+1340",
        codigo: "VI",
    },
    {
        nombre_en: "Wallis and Futuna",
        nombre_es: "Wallis y Futuna",
        codigo_telef: "+681",
        codigo: "WF",
    },
    {
        nombre_en: "Yemen",
        nombre_es: "Yemen",
        codigo_telef: "+967",
        codigo: "YE",
    },
    {
        nombre_en: "Zambia",
        nombre_es: "Zambia",
        codigo_telef: "+260",
        codigo: "ZM",
    },
    {
        nombre_en: "Zimbabwe",
        nombre_es: "Zimbabue",
        codigo_telef: "+263",
        codigo: "ZW",
    },
    {
        nombre_en: "Åland Islands",
        nombre_es: "Åland",
        codigo_telef: "+358",
        codigo: "AX",
    },
];

export default paises;
