import {fileURLToPath} from 'url'
import {dirname} from "path"

const __filename = fileURLToPath(import.meta.url);
export const DIRNAME = dirname(__filename);

export const filmGenres = {
    action: 'Action',
    adventure: 'Adventure',
    animation: 'Animation',
    comedy: 'Comedy',
    crime: 'Crime',
    documentary: 'Documentary',
    drama: 'Drama',
    family: 'Family',
    fantasy: 'Fantasy',
    history: 'History',
    horror: 'Horror',
    music: 'Music',
    mystery: 'Mystery',
    romance: 'Romance',
    scienceFiction: 'Science Fiction',
    thriller: 'Thriller',
    war: 'War',
    biography: 'Biography',
    sport: 'Sport',
    musical: 'Musical',
    adult: 'Adult',

};

export const filmGenresArr = Object.values(filmGenres)


export const countryNames = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Côte d'Ivoire",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. 'Swaziland')",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

export const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Arabic",
    "Russian",
    "Japanese",
    "Portuguese",
    "Hindi",
    "Bengali",
    "Punjabi",
    "Javanese",
    "Wu",
    "Telugu",
    "Marathi",
    "Turkish",
    "Tamil",
    "Vietnamese",
    "Korean",
    "Italian",
    "Yue (Cantonese)",
    "Thai",
    "Gujarati",
    "Jin",
    "Persian",
    "Polish",
    "Pashto",
    "Kannada",
    "Xiang",
    "Malayalam",
    "Sundanese",
    "Hausa",
    "Odia",
    "Burmese",
    "Hakka",
    "Ukrainian",
    "Bhojpuri",
    "Tagalog",
    "Yoruba",
    "Maithili",
    "Uzbek",
    "Sindhi",
    "Amharic",
    "Fula",
    "Romanian",
    "Oromo",
    "Igbo",
    "Azerbaijani",
    "Awadhi",
    "Gan Chinese",
    "Cebuano",
    "Dutch",
    "Kurdish",
    "Serbo-Croatian",
    "Malay",
    "Saraiki",
    "Nepali",
    "Sinhalese",
    "Chittagonian",
    "Zulu",
    "Assamese",
    "Madurese",
    "Somali",
    "Marwari",
    "Magahi",
    "Haryanvi",
    "Hungarian",
    "Chhattisgarhi",
    "Greek",
    "Chewa",
    "Deccan",
    "Akan",
    "Kazakh",
    "Northern Min",
    "Sylheti",
    "Zhuang",
    "Czech",
    "Kinyarwanda",
    "Dhundhari",
    "Haitian Creole",
    "Eastern Min",
    "Ilocano",
    "Quechua",
    "Kirundi",
    "Swedish",
    "Hmong",
    "Shona",
    "Uyghur",
    "Hiligaynon",
    "Mossi",
    "Xhosa",
    "Belarusian",
    "Balochi",
    "Konkani"
];