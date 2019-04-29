const VALID_CITIES = [
  "Adkins",
  "Aledo",
  "Alvin",
  "Angleton",
  "Arlington",
  "Austin",
  "Bandera",
  "Bastrop",
  "Baytown",
  "Beeville",
  "Bellaire",
  "Benbrook",
  "Bergheim",
  "Bertram",
  "Blanco",
  "Blessing",
  "Boerne",
  "Brenham",
  "Brownwood",
  "Bryan",
  "Buchanan Dam",
  "Buda",
  "Buffalo",
  "Bulverde",
  "Burleson",
  "Canyon Lake",
  "Cat Spring",
  "Cedar Creek",
  "Cedar Hill",
  "Cedar Park",
  "Cleveland",
  "Clifton",
  "Coldspring",
  "Coleman",
  "College Station",
  "Comanche",
  "Comfort",
  "Conroe",
  "Converse",
  "Copperas Cove",
  "Corpus Christi",
  "Corsicana",
  "Covington",
  "Crowley",
  "Cuero",
  "Cypress",
  "Dallas",
  "Dickinson",
  "Dripping Springs",
  "Duncanville",
  "Edna",
  "El Campo",
  "Elgin",
  "Everman",
  "Fischer",
  "Floresville",
  "Fort Worth",
  "Fredericksburg",
  "Friendswood",
  "Fulshear",
  "Fulton",
  "Georgetown",
  "Godley",
  "Goliad",
  "Gonzales",
  "Granbury",
  "Grand Prairie",
  "Gun Barrel City",
  "Hearne",
  "Helotes",
  "Hempstead",
  "Highlands",
  "Hillsboro",
  "Hitchcock",
  "Horseshoe Bay",
  "Houston",
  "Humble",
  "Industry",
  "Jarrell",
  "Junction",
  "Katy",
  "Kendalia",
  "Kenedy",
  "Kennedale",
  "Kerrville",
  "Killeen",
  "Kingwood",
  "Kyle",
  "La Vernia",
  "Lago Vista",
  "Lake Jackson",
  "Lakeway",
  "Lampasas",
  "Lancaster",
  "League City",
  "Leander",
  "Liberty Hill",
  "Liverpool",
  "Livingston",
  "Lockhart",
  "Lott",
  "Luling",
  "Lytle",
  "Mabank",
  "Madisonville",
  "Magnolia",
  "Malakoff",
  "Manchaca",
  "Mansfield",
  "Manvel",
  "Marble Falls",
  "Mason",
  "Mexia",
  "Midlothian",
  "Mingus",
  "Missouri City",
  "Montgomery",
  "Nassau Bay",
  "Navasota",
  "New Braunfels",
  "Nixon",
  "Ovilla",
  "Palacios",
  "Palestine",
  "Pasadena",
  "Pearland",
  "Pearsall",
  "Pflugerville",
  "Pipe Creek",
  "Pleasanton",
  "Porter",
  "Poteet",
  "Red Oak",
  "Richmond",
  "Rockdale",
  "Rosenberg",
  "Rosharon",
  "Round Rock",
  "San Antonio",
  "San Leon",
  "San Marcos",
  "Santa Fe",
  "Schertz",
  "Scurry",
  "Seabrook",
  "Sealy",
  "Seguin",
  "Seven Points",
  "Sheridan",
  "Smithville",
  "Somerville",
  "South Houston ",
  "Spring",
  "Stafford",
  "Stephenville",
  "Sugar Land",
  "Taylor",
  "Temple",
  "The Woodlands",
  "Thorndale",
  "Tomball",
  "Universal City",
  "Uvalde",
  "Van Vleck",
  "Venus",
  "Victoria",
  "Von Ormy",
  "Waco",
  "Waller",
  "Wallis",
  "Waxahachie",
  "Weatherford",
  "Webster",
  "Wharton",
  "White Settlement",
  "Whitney",
  "Wimberley",
  "Windcrest"
];
export { VALID_CITIES };

const VALID_BREEDS = [
  "norfolk terrier",
  "doberman pinscher",
  "boxer",
  "pug",
  "bichon frise",
  "bull terrier",
  "briard",
  "beagle",
  "tibetan mastiff",
  "shih tzu",
  "field spaniel",
  "keeshond",
  "english springer spaniel",
  "staffordshire bull terrier",
  "australian terrier",
  "german pinscher",
  "black and tan coonhound",
  "norwich terrier",
  "cairn terrier",
  "soft coated wheaten terrier",
  "pembroke welsh corgi",
  "english toy terrier",
  "great pyrenees",
  "alaskan husky",
  "thai ridgeback",
  "shetland sheepdog",
  "irish terrier",
  "appenzeller sennenhund",
  "toy fox terrier",
  "tibetan spaniel",
  "american pit bull terrier",
  "lhasa apso",
  "boykin spaniel",
  "standard schnauzer",
  "miniature pinscher",
  "miniature schnauzer",
  "yorkshire terrier",
  "border collie",
  "west highland white terrier",
  "samoyed",
  "american eskimo dog",
  "bearded collie",
  "smooth fox terrier",
  "bluetick coonhound",
  "shiba inu",
  "english toy spaniel",
  "australian cattle dog",
  "cocker spaniel",
  "great dane",
  "coton de tulear",
  "tibetan terrier",
  "old english sheepdog",
  "affenpinscher",
  "pharaoh hound",
  "scottish deerhound",
  "cocker spaniel (american)",
  "welsh springer spaniel",
  "rottweiler",
  "australian kelpie",
  "chow chow",
  "american bulldog",
  "treeing walker coonhound",
  "vizsla",
  "chesapeake bay retriever",
  "belgian malinois",
  "siberian husky",
  "saluki",
  "whippet",
  "kuvasz",
  "cardigan welsh corgi",
  "maltese",
  "irish setter",
  "rat terrier",
  "scottish terrier",
  "border terrier",
  "komondor",
  "bull terrier (miniature)",
  "pomeranian",
  "alaskan malamute",
  "clumber spaniel",
  "schipperke",
  "redbone coonhound",
  "bernese mountain dog",
  "rhodesian ridgeback",
  "basset hound",
  "greyhound",
  "wire fox terrier",
  "cavalier king charles spaniel",
  "english setter",
  "alapaha blue blood bulldog",
  "papillon",
  "irish wolfhound",
  "french bulldog",
  "golden retriever",
  "bedlington terrier",
  "nova scotia duck tolling retriever",
  "airedale terrier",
  "german shorthaired pointer",
  "boston terrier",
  "newfoundland",
  "italian greyhound",
  "giant schnauzer",
  "american staffordshire terrier",
  "american water spaniel",
  "afghan hound",
  "weimaraner",
  "silky terrier",
  "labrador retriever",
  "dalmatian",
  "glen of imaal terrier",
  "basset bleu de gascogne",
  "gordon setter",
  "akita",
  "basenji"
];
export { VALID_BREEDS };

const VALID_GROUPS = [
  {value: "Mixed", label: "Mixed"},
  {value: "Working", label: "Working"},
  {value: "Non-Sporting", label: "Non-Sporting"}, 
  {value: "Sporting", label: "Sporting"},
  {value: "Herding", label: "Herding"},
  {value: "Terrier", label: "Terrier"},
  {value: "Hound", label: "Hound"},
  {value: "Toy", label: "Toy"},
];
export { VALID_GROUPS };

const VALID_LIFESPANS = ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
export { VALID_LIFESPANS };

const VALID_HEIGHTS = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"];
export { VALID_HEIGHTS };
