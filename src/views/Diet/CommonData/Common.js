import { format, parseISO } from "date-fns";

export const Data = {
    "ingredients": [
        "Basmati rice",
        "Chicken",
        "Yogurt",
        "Onions",
        "Tomatoes",
        "Ginger-garlic paste",
        "Green chilies",
        "Biriyani masala",
        "Turmeric powder",
        "Red chili powder",
        "Garam masala",
        "Fresh coriander leaves",
        "Mint leaves",
        "Ghee",
        "Cooking oil",
        "Salt",
        "Whole spices (bay leaf, cloves, cardamom, cinnamon)"
    ],
    "nutrition": [
        "Calories: 450–500 kcal per serving",
        "Protein: 25–30 g",
        "Carbohydrates: 50–55 g",
        "Fat: 18–22 g",
        "Fiber: 3–4 g"
    ]
}


export const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 14,
    fontFamily: "var(--roboto-font)",
    // fontWeight: 500
};

export const DIET_ALT_COLORS = [
    { bg: '#d8d8d8', border: '#000000' }, // Black
    { bg: '#f5f2f2', border: '#8217d8' }  // Yellow
]


export const foodUnits = [
    { value: "g", label: "Gram (g)" },
    { value: "kg", label: "Kilogram (kg)" },
    { value: "mg", label: "Milligram (mg)" },

    { value: "ml", label: "Millilitre (ml)" },
    { value: "l", label: "Litre (l)" },

    { value: "pcs", label: "Pieces" },
    { value: "nos", label: "Numbers" },

    { value: "tsp", label: "Teaspoon" },
    { value: "tbsp", label: "Tablespoon" },
    { value: "cup", label: "Cup" },

    { value: "slice", label: "Slice" },
    { value: "plate", label: "Plate" },
    { value: "bowl", label: "Bowl" },

    { value: "pack", label: "Packet" },
    { value: "box", label: "Box" },

    { value: "serving", label: "Serving" }
];

export const DAYS = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" }
];

export const dietRestrictions = [
    {
        id: 1,
        diet_name: "Sodium Free",
        diet_code: "SODIUM_FREE",
        description: "Diet without added sodium, suitable for hypertension patients",
        status: 1, // 1 = Allowed, 0 = Restricted
    },
    {
        id: 2,
        diet_name: "Diabetic Friendly",
        diet_code: "DIABETIC",
        description: "Controlled sugar and carbohydrate diet for diabetic patients",
        status: 1,
    },
    {
        id: 3,
        diet_name: "Sugar Free",
        diet_code: "SUGAR_FREE",
        description: "Diet without refined sugar or sweeteners",
        status: 1,
    },
    {
        id: 4,
        diet_name: "Low Fat",
        diet_code: "LOW_FAT",
        description: "Reduced fat diet for cardiac and weight management",
        status: 1,
    },
    {
        id: 5,
        diet_name: "Renal Diet",
        diet_code: "RENAL",
        description: "Special diet for kidney disease patients",
        status: 1,
    },
    {
        id: 6,
        diet_name: "Gluten Free",
        diet_code: "GLUTEN_FREE",
        description: "Diet excluding gluten-containing grains",
        status: 1,
    },
    {
        id: 7,
        diet_name: "High Protein",
        diet_code: "HIGH_PROTEIN",
        description: "Protein-rich diet for recovery and muscle building",
        status: 1,
    },
    {
        id: 8,
        diet_name: "Liquid Diet",
        diet_code: "LIQUID",
        description: "Diet consisting only of liquids, for post-surgery or digestive issues",
        status: 1,
    },
    {
        id: 8,
        diet_name: "No Diet",
        diet_code: "NAD",
        description: "Diet consisting only of liquids, for post-surgery or digestive issues",
        status: 1,
    },
];

export const dietTypeWisePatients = {
    "Regular Diet": [
        {
            mrdNumber: "O-00102760",
            mobileNo: '9656993064',
            gender: 'M',
            patientName: "Arjun Kumar",
            nursingStation: "Payward A",
            bedNo: "BOR101",
            dietType: "Regular Diet",
            weekDiet: {
                Monday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 },
                        { food: "sambar", qty: 3, measure: "cup", type: "Veg", calories: 300 },
                        { food: "sambar", qty: 3, measure: "cup", type: "Veg", calories: 300 },
                        { food: "sambar", qty: 3, measure: "cup", type: "Veg", calories: 300 },
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 },
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 },
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 },
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ]
                },
                Tuesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 },
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 },
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 },
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 },
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 },
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 },
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ]
                },
                wednesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                thursday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                friday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                saturday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }, sunday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }
            }
        },
        {
            mrdNumber: "O-00102761",
            mobileNo: '9656993064',
            gender: 'M',
            patientName: "Sreenath Pillai",
            nursingStation: "Payward A",
            bedNo: "AOP102",
            dietType: "Regular Diet",
            weekDiet: {
                Monday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                Tuesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                wednesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                thursday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                friday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                saturday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }, sunday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }
            }
        }
    ],

    "Diabetic Diet": [
        {
            mrdNumber: "O-00102762",
            mobileNo: '9656993064',
            gender: 'M',
            patientName: "Suresh Babu",
            nursingStation: "Payward A",
            bedNo: "BHE201",
            dietType: "Diabetic Diet",
            weekDiet: {
                Monday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                Tuesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                wednesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                thursday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                friday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                saturday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }, sunday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }
            }
        },
        {
            mrdNumber: "O-00102763",
            mobileNo: '9656993064',
            gender: 'M',
            patientName: "Radha Krishnan",
            nursingStation: "Payward A",
            bedNo: "HER202",
            dietType: "Diabetic Diet",
            weekDiet: {
                Monday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                Tuesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                wednesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                thursday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                friday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                saturday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }, sunday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }
            }
        }
    ],

    "Renal Diet": [
        {
            mrdNumber: "O-00102768",
            mobileNo: '9656993064',
            gender: 'M',
            patientName: "Madhavan Nair",
            nursingStation: "Payward A",
            bedNo: "BFR301",
            dietType: "Renal Diet",
            weekDiet: {
                Monday: {
                    breakfast: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ],
                    lunch: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ]
                },
                Tuesday: {
                    breakfast: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ],
                    lunch: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ]
                },
                wednesday: {
                    breakfast: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 },
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                thursday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                friday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                saturday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }, sunday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }
            }
        }
    ],

    "High Protein Diet": [
        {
            mrdNumber: "O-00102770",
            mobileNo: '9656993064',
            gender: 'F',
            patientName: "Ramesh Nair",
            nursingStation: "Payward A",
            bedNo: "BAD401",
            dietType: "High Protein Diet",
            weekDiet: {
                Monday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                Tuesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                wednesday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                thursday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                friday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                },
                saturday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }, sunday: {
                    breakfast: [
                        { food: "Idli", qty: 3, measure: "pieces", type: "Veg", calories: 150 }
                    ],
                    lunch: [
                        { food: "Fish Curry", qty: 120, measure: "grams", type: "Non-Veg", calories: 220 }
                    ],
                    dinner: [
                        { food: "Veg Fried Rice", qty: 1, measure: "plate", type: "Veg", calories: 300 }
                    ]
                }
            }
        }
    ]
};

export const DietNameTimes = [
    {
        name: "Regular Diet",
        times: [
            { type: "Breakfast", slno: 1, time: '09:30 am  - 10:30 am' },
            { type: "Mid Morning", slno: 2, time: '10:00 am  - 10:30 am' },
            { type: "Lunch", slno: 3, time: '12:30 pm  - 02:30 pm' },
            { type: "Teatime", slno: 4, time: '04:00 pm  - 05:30 pm' },
            { type: "Dinner", slno: 5, time: '07:30 pm  - 09:30 pm' },
        ],
    },
    {
        name: "Diabetic Diet",
        times: [
            { type: "Breakfast", slno: 1, time: '09:30 am  - 10:30 am' },
            { type: "Mid Morning", slno: 2, time: '10:00 am  - 10:30 am' },
            { type: "Lunch", slno: 3, time: '12:30 pm  - 02:30 pm' },
            { type: "Teatime", slno: 4, time: '04:00 pm  - 05:30 pm' },
            { type: "Dinner", slno: 5, time: '07:30 pm  - 09:30 pm' },
        ],
    },
    {
        name: "High Protein Diet",
        times: [
            { type: "Breakfast", slno: 1, time: '09:30 am  - 10:30 am' },
            { type: "Mid Morning", slno: 2, time: '10:30 am  - 11:30 am' },
            { type: "Lunch", slno: 3, time: '12:30 am  - 02:30 am' },
            { type: "Teatime", slno: 4, time: '04:00 am  - 05:30 am' },
            { type: "Dinner", slno: 5, time: '07:30 am  - 09:30 am' },
        ],
    },
    {
        name: "Low Fiber Diet",
        times: [
            { type: "Breakfast", slno: 1, time: '09:30 am  - 10:30 am' },
            { type: "Mid Morning", slno: 2, time: '10:30 am  - 11:30 am' },
            { type: "Lunch", slno: 3, time: '12:30 am  - 02:30 am' },
            { type: "Teatime", slno: 4, time: '04:00 am  - 05:30 am' },
            { type: "Dinner", slno: 5, time: '07:30 am  - 09:30 am' },
        ],
    },
    {
        name: "Paediatric Diet",
        times: [
            { type: "Breakfast", slno: 1, time: '09:30 am  - 10:30 am' },
            { type: "Mid Morning", slno: 2, time: '10:30 am  - 11:30 am' },
            { type: "Lunch", slno: 3, time: '12:30 am  - 02:30 am' },
            { type: "Teatime", slno: 4, time: '04:00 am  - 05:30 am' },
            { type: "Dinner", slno: 5, time: '07:30 am  - 09:30 am' },
        ],
    },
    {
        name: "Renal Diet",
        times: [
            { type: "Breakfast", slno: 1, time: '09:30 am  - 10:30 am' },
            { type: "Mid Morning", slno: 2, time: '10:30 am  - 11:30 am' },
            { type: "Lunch", slno: 3, time: '12:30 am  - 02:30 am' },
            { type: "Teatime", slno: 4, time: '04:00 am  - 05:30 am' },
            { type: "Dinner", slno: 5, time: '07:30 am  - 09:30 am' },
        ],
    },
    {
        name: "Liquid Diet",
        times: [
            { type: "Feed 6 AM", slno: 1, time: '06:00 am  - 06:30 am' },
            { type: "Feed 8 AM", slno: 2, time: '08:30 am  - 08:30 am' },
            { type: "Feed 10 AM", slno: 3, time: '10:00 am  - 10:30 am' },
            { type: "Feed 12 PM", slno: 4, time: '12:00 pm  - 12:30 pm' },
            { type: "Feed 2 PM", slno: 5, time: '02:00 pm  - 02:30 pm' },
            { type: "Feed 4 PM", slno: 6, time: '04:00 pm  - 04:30 pm' },
            { type: "Feed 6 PM", slno: 7, time: '06:00 pm  - 06:30 pm' },
            { type: "Feed 8 PM", slno: 8, time: '08:00 pm  - 08:30 pm' },
            { type: "Feed 10 PM", slno: 9, time: '10:00 pm  - 10:30 pm' },
        ],
    },
];

export const GroupedTime = [
    '05:00 am  - 10:30 am',
    '10:30 am  - 12:30 pm',
    '12:30 pm  - 04:30 pm',
    '04:30 pm  - 06:30 pm',
    '06:30 pm  - 10:30 pm',
]

export const ProcessedList = [
    // ================= REGULAR DIET =================
    { slno: 1, diet_name: 'Regular Diet', process_date: '29/10/2025', patient_count: 300, type: 'Breakfast', processed_count: 310, new_Count: 10 },
    { slno: 1, diet_name: 'Regular Diet', process_date: '29/10/2025', patient_count: 300, type: 'Mid Morning', processed_count: 310, new_Count: 10 },
    { slno: 1, diet_name: 'Regular Diet', process_date: '29/10/2025', patient_count: 300, type: 'Lunch', processed_count: 300, new_Count: 10 },
    { slno: 1, diet_name: 'Regular Diet', process_date: '29/10/2025', patient_count: 300, type: 'Teatime', processed_count: 320, new_Count: 20 },
    { slno: 1, diet_name: 'Regular Diet', process_date: '29/10/2025', patient_count: 300, type: 'Dinner', processed_count: 280, new_Count: 20 },

    // ================= DIABETIC DIET =================
    { slno: 2, diet_name: 'Diabetic Diet', process_date: '29/10/2025', patient_count: 200, type: 'Breakfast', processed_count: 200, new_Count: 10 },
    { slno: 2, diet_name: 'Diabetic Diet', process_date: '29/10/2025', patient_count: 200, type: 'Mid Morning', processed_count: 200, new_Count: 10 },
    { slno: 2, diet_name: 'Diabetic Diet', process_date: '29/10/2025', patient_count: 200, type: 'Lunch', processed_count: 190, new_Count: 10 },
    { slno: 2, diet_name: 'Diabetic Diet', process_date: '29/10/2025', patient_count: 300, type: 'Teatime', processed_count: 300, new_Count: 20 },
    { slno: 2, diet_name: 'Diabetic Diet', process_date: '29/10/2025', patient_count: 200, type: 'Dinner', processed_count: 190, new_Count: 20 },
    // ================= HIGH PROTEIN DIET =================
    { slno: 3, diet_name: 'High Protein Diet', process_date: '29/10/2025', patient_count: 150, type: 'Breakfast', processed_count: 150, new_Count: 10 },
    { slno: 3, diet_name: 'High Protein Diet', process_date: '30/10/2025', patient_count: 150, type: 'Lunch', processed_count: 130, new_Count: 15 },
    { slno: 3, diet_name: 'High Protein Diet', process_date: '29/10/2025', patient_count: 150, type: 'Dinner', processed_count: 150, new_Count: 10 },

    // ================= LIQUID DIET =================
    { slno: 4, diet_name: 'Liquid Diet', process_date: '29/10/2025', patient_count: 250, type: 'Feed 6 AM', processed_count: 200, new_Count: null },
    { slno: 4, diet_name: 'Liquid Diet', process_date: '30/10/2025', patient_count: 250, type: 'Feed 8 AM', processed_count: 200, new_Count: null },
    { slno: 4, diet_name: 'Liquid Diet', process_date: '30/10/2025', patient_count: 250, type: 'Feed 10 AM', processed_count: 250, new_Count: null },
    { slno: 4, diet_name: 'Liquid Diet', process_date: '30/10/2025', patient_count: 250, type: 'Feed 12 PM', processed_count: 250, new_Count: null },

    // ================= PAEDIATRIC DIET =================
    { slno: 5, diet_name: 'Paediatric Diet', process_date: '30/10/2025', patient_count: 80, type: 'Breakfast', processed_count: 80, new_Count: null },
    { slno: 5, diet_name: 'Paediatric Diet', process_date: '30/10/2025', patient_count: 80, type: 'Lunch', processed_count: 80, new_Count: null },

    // ================= RENAL DIET =================
    { slno: 6, diet_name: 'Renal Diet', process_date: '30/10/2025', patient_count: 110, type: 'Breakfast', processed_count: 100, new_Count: null },
    { slno: 6, diet_name: 'Renal Diet', process_date: '30/10/2025', patient_count: 110, type: 'Lunch', processed_count: 100, new_Count: null },
    { slno: 6, diet_name: 'Renal Diet', process_date: '30/10/2025', patient_count: 110, type: 'Dinner', processed_count: 110, new_Count: null },
];



export const headerCell = {
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    color: '#ffffff'
}

export const bodyCell = {
    flex: 1,
    fontSize: 13,
    fontWeight: 500,
    color: '#2e2e2e'
}

export const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px'
}



export const FoodDetail = [
    {
        item_slno: 1,
        Item_name: "Chaya",
        Count: 30,
        unit: "cups",
        Type: "Breakfast",
        description: "Traditional South Indian herbal tea.",
        nutrition: {
            calories: "20 kcal",
            benefits: "Improves digestion, refreshing",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 2,
        Item_name: "Idli",
        Count: 40,
        unit: "pieces",
        Type: "Breakfast",
        description: "Steamed rice cake, light and easy to digest.",
        nutrition: {
            calories: "40 kcal / piece",
            benefits: "Low fat, good carbs",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 3,
        Item_name: "Dosa",
        Count: 35,
        unit: "pieces",
        Type: "Breakfast",
        description: "Crispy fermented rice and lentil crepe.",
        nutrition: {
            calories: "120 kcal",
            benefits: "Energy rich, good protein",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 4,
        Item_name: "Upma",
        Count: 25,
        unit: "plates",
        Type: "Breakfast",
        description: "Savory semolina dish with vegetables.",
        nutrition: {
            calories: "180 kcal",
            benefits: "High fiber, filling meal",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },

    {
        item_slno: 5,
        Item_name: "Rice",
        Count: 60,
        unit: "plates",
        Type: "Lunch",
        description: "Steamed white rice, staple food.",
        nutrition: {
            calories: "200 kcal",
            benefits: "High energy carbs",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 6,
        Item_name: "Sambar",
        Count: 50,
        unit: "bowls",
        Type: "Lunch",
        description: "Lentil-based vegetable curry.",
        nutrition: {
            calories: "150 kcal",
            benefits: "Protein rich, vitamins",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 7,
        Item_name: "Curd",
        Count: 45,
        unit: "bowls",
        Type: "Lunch",
        description: "Fresh yogurt, cooling for the body.",
        nutrition: {
            calories: "90 kcal",
            benefits: "Probiotics, digestion",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 8,
        Item_name: "Vegetable Curry",
        Count: 40,
        unit: "bowls",
        Type: "Lunch",
        description: "Mixed vegetables cooked with spices.",
        nutrition: {
            calories: "120 kcal",
            benefits: "Vitamins and minerals",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },

    {
        item_slno: 9,
        Item_name: "Rice & Dal",
        Count: 55,
        unit: "plates",
        Type: "Midday Meal",
        description: "Rice served with lentil dal.",
        nutrition: {
            calories: "250 kcal",
            benefits: "Balanced carbs and protein",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 10,
        Item_name: "Chapati",
        Count: 50,
        unit: "pieces",
        Type: "Midday Meal",
        description: "Whole wheat flatbread.",
        nutrition: {
            calories: "80 kcal",
            benefits: "High fiber, healthy carbs",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 11,
        Item_name: "Egg Curry",
        Count: 35,
        unit: "bowls",
        Type: "Midday Meal",
        description: "Boiled eggs in spicy gravy.",
        nutrition: {
            calories: "180 kcal",
            benefits: "High protein",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 12,
        Item_name: "Vegetable Rice",
        Count: 45,
        unit: "plates",
        Type: "Midday Meal",
        description: "Rice cooked with vegetables and spices.",
        nutrition: {
            calories: "220 kcal",
            benefits: "Energy with vitamins",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },

    {
        item_slno: 13,
        Item_name: "Tea",
        Count: 60,
        unit: "cups",
        Type: "Snacks",
        description: "Hot milk tea with sugar.",
        nutrition: {
            calories: "70 kcal",
            benefits: "Instant energy",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 14,
        Item_name: "Biscuits",
        Count: 55,
        unit: "packs",
        Type: "Snacks",
        description: "Crunchy baked snack.",
        nutrition: {
            calories: "100 kcal",
            benefits: "Quick energy",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 15,
        Item_name: "Samosa",
        Count: 30,
        unit: "pieces",
        Type: "Snacks",
        description: "Fried snack with potato filling.",
        nutrition: {
            calories: "250 kcal",
            benefits: "High energy (occasional)",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 16,
        Item_name: "Banana",
        Count: 40,
        unit: "pieces",
        Type: "Snacks",
        description: "Fresh ripe banana.",
        nutrition: {
            calories: "90 kcal",
            benefits: "Potassium, instant energy",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },

    {
        item_slno: 17,
        Item_name: "Chapati",
        Count: 50,
        unit: "pieces",
        Type: "Dinner",
        description: "Soft whole wheat flatbread.",
        nutrition: {
            calories: "80 kcal",
            benefits: "Light and filling",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 18,
        Item_name: "Vegetable Curry",
        Count: 45,
        unit: "bowls",
        Type: "Dinner",
        description: "Nutritious vegetable-based curry.",
        nutrition: {
            calories: "120 kcal",
            benefits: "Low calorie, healthy",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 19,
        Item_name: "Rice",
        Count: 55,
        unit: "plates",
        Type: "Dinner",
        description: "Plain cooked rice.",
        nutrition: {
            calories: "200 kcal",
            benefits: "Energy source",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
    {
        item_slno: 20,
        Item_name: "Milk",
        Count: 35,
        unit: "cups",
        Type: "Dinner",
        description: "Warm milk served at night.",
        nutrition: {
            calories: "100 kcal",
            benefits: "Calcium, good sleep",
        },
        processed_date: "Sep 19, 2028, 10:45 AM",
    },
];


export const patientDietList = [
    {
        dietpt_slno: 1,
        ip_no: "2200050892",
        pt_no: "O-00261613",
        ipd_date: "2022-12-11 15:33:15",
        rc_code: "N007",
        bd_code: "7343",
        ptc_ptname: "C N MUHAMMED ZAIN",
        ptc_sex: "M",
        do_code: "0049",
        ipd_disc: null,
        ipd_status: "N",
        ptc_mobile: "9895253543",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 1,
        diet_name: "REGULAR DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 2,
        ip_no: "2300000853",
        pt_no: "P-00003314",
        ipd_date: "2023-01-05 22:00:22",
        rc_code: "N004",
        bd_code: "6272",
        ptc_ptname: "RASHEED",
        ptc_sex: "M",
        do_code: "0075",
        ipd_disc: "2023-02-08 13:17:25",
        ipd_status: "Y",
        ptc_mobile: "8547129371",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 2,
        diet_name: "DIABETIC DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 3,
        ip_no: "2300001272",
        pt_no: "P-00005115",
        ipd_date: "2023-01-08 15:57:15",
        rc_code: "B001",
        bd_code: "7703",
        ptc_ptname: "YESUDASAN VARGHESE",
        ptc_sex: "M",
        do_code: "G028",
        ipd_disc: "2023-02-10 17:17:31",
        ipd_status: "Y",
        ptc_mobile: "9562246790",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 3,
        diet_name: "HIGH PROTEIN DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 4,
        ip_no: "2300001690",
        pt_no: "P-00006661",
        ipd_date: "2023-01-11 01:30:01",
        rc_code: "N007",
        bd_code: "7344",
        ptc_ptname: "SOUMYA AKHIL",
        ptc_sex: "F",
        do_code: "0060",
        ipd_disc: "2023-02-16 18:39:21",
        ipd_status: "Y",
        ptc_mobile: "9446524140",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 4,
        diet_name: "LIQUID DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 5,
        ip_no: "2300002463",
        pt_no: "M-00147140",
        ipd_date: "2023-01-15 00:12:00",
        rc_code: "N005",
        bd_code: "6674",
        ptc_ptname: "MOHANA CHANDRAN A",
        ptc_sex: "M",
        do_code: "R016",
        ipd_disc: "2023-02-18 14:51:01",
        ipd_status: "Y",
        ptc_mobile: "9447755965",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 5,
        diet_name: "LOW FIBER DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 6,
        ip_no: "2300003012",
        pt_no: "P-00007231",
        ipd_date: "2023-01-18 10:45:30",
        rc_code: "N003",
        bd_code: "7812",
        ptc_ptname: "ABDUL RAHMAN",
        ptc_sex: "M",
        do_code: "0091",
        ipd_disc: null,
        ipd_status: "N",
        ptc_mobile: "9876543210",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 6,
        diet_name: "RENAL DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 7,
        ip_no: "2300003256",
        pt_no: "P-00007845",
        ipd_date: "2023-01-21 08:20:45",
        rc_code: "B002",
        bd_code: "7901",
        ptc_ptname: "ANJALI SURESH",
        ptc_sex: "F",
        do_code: "0103",
        ipd_disc: "2023-02-20 12:10:15",
        ipd_status: "Y",
        ptc_mobile: "9123456789",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 1,
        diet_name: "REGULAR DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 8,
        ip_no: "2300003478",
        pt_no: "M-00151234",
        ipd_date: "2023-01-24 19:05:10",
        rc_code: "N006",
        bd_code: "8123",
        ptc_ptname: "SURESH KUMAR",
        ptc_sex: "M",
        do_code: "0110",
        ipd_disc: null,
        ipd_status: "N",
        ptc_mobile: "9988776655",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 1,
        diet_name: "REGULAR DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 9,
        ip_no: "2300003699",
        pt_no: "P-00008321",
        ipd_date: "2023-01-27 14:55:00",
        rc_code: "N002",
        bd_code: "8256",
        ptc_ptname: "LATHA KRISHNAN",
        ptc_sex: "F",
        do_code: "0088",
        ipd_disc: "2023-02-22 09:40:00",
        ipd_status: "Y",
        ptc_mobile: "9090909090",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 6,
        diet_name: "RENAL DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    },
    {
        dietpt_slno: 10,
        ip_no: "2300003987",
        pt_no: "P-00009112",
        ipd_date: "2023-01-30 06:30:25",
        rc_code: "B004",
        bd_code: "8399",
        ptc_ptname: "RAJESH MENON",
        ptc_sex: "M",
        do_code: "0124",
        ipd_disc: null,
        ipd_status: "N",
        ptc_mobile: "9567123456",
        ipc_mhcode: "00",
        em_id: "1",

        diet_slno: 6,
        diet_name: "RENAL DIET",
        diet_status: 1,
        order_req: 1,
        diet_type_choose: 1
    }
];


export const MEAL_ITEMS = {
    Breakfast: [
        [
            { item_name: 'Idli', qty: 2, price: 20, calories: 120, nutritious_value: 'High Carbs' },
            { item_name: 'Sambar', qty: 1, price: 15, calories: 80, nutritious_value: 'Protein & Fiber' }
        ],
        [
            { item_name: 'Oats', qty: 1, price: 25, calories: 150, nutritious_value: 'High Fiber' },
            { item_name: 'Milk', qty: 1, price: 10, calories: 90, nutritious_value: 'Calcium Rich' }
        ],
        [
            { item_name: 'Upma', qty: 1, price: 20, calories: 180, nutritious_value: 'Energy Boost' },
            { item_name: 'Tea', qty: 1, price: 10, calories: 50, nutritious_value: 'Antioxidants' }
        ]
    ],

    Lunch: [
        [
            { item_name: 'Rice', qty: 1, price: 30, calories: 250, nutritious_value: 'High Carbs' },
            { item_name: 'Veg Curry', qty: 1, price: 25, calories: 150, nutritious_value: 'Vitamins & Fiber' }
        ],
        [
            { item_name: 'Biriyani', qty: 1, price: 80, calories: 450, nutritious_value: 'Protein & Carbs' },
            { item_name: 'Juice', qty: 1, price: 20, calories: 110, nutritious_value: 'Vitamins' }
        ]
    ],

    Dinner: [
        [
            { item_name: 'Chapathi', qty: 2, price: 30, calories: 200, nutritious_value: 'Fiber Rich' },
            { item_name: 'Veg Kurma', qty: 1, price: 30, calories: 180, nutritious_value: 'Healthy Fats' }
        ],
        [
            { item_name: 'Grilled Chicken', qty: 1, price: 90, calories: 300, nutritious_value: 'High Protein' },
            { item_name: 'Salad', qty: 1, price: 25, calories: 70, nutritious_value: 'Low Calorie' }
        ]
    ]
}



export const PATIENT_STATUS = {
    NORMAL: 'NORMAL',
    DIET_CHANGED: 'DIET_CHANGED',
    DISCHARGED: 'DISCHARGED',
    // DECEASED: 'DECEASED'
}

export const DIET_STATUS = {
    UNCHANGED: 'UNCHANGED',
    UPDATED: 'UPDATED',
    STOPPED: 'STOPPED'
}

export const STATUS_CODES = {
    NORMAL: 'N',
    DIET_CHANGED: 'DC',
    DISCHARGED: 'D',
    // DECEASED: 'X'
}

export const PATIENT_STATUS_TO_CODE = {
    [PATIENT_STATUS.NORMAL]: STATUS_CODES.NORMAL,
    [PATIENT_STATUS.DIET_CHANGED]: STATUS_CODES.DIET_CHANGED,
    [PATIENT_STATUS.DISCHARGED]: STATUS_CODES.DISCHARGED,
    // [PATIENT_STATUS.DECEASED]: STATUS_CODES.DECEASED
}

export const getPatientStatus = (index) => {
    // if (index % 17 === 0) return PATIENT_STATUS.DECEASED
    if (index % 13 === 0) return PATIENT_STATUS.DISCHARGED
    if (index % 7 === 0) return PATIENT_STATUS.DIET_CHANGED
    return PATIENT_STATUS.NORMAL
}


export const STATUS_FILTERS = [
    { label: 'Normal', code: STATUS_CODES.NORMAL, color: 'success' },
    { label: 'Diet Updated', code: STATUS_CODES.DIET_CHANGED, color: 'warning' },
    { label: 'Discharged', code: STATUS_CODES.DISCHARGED, color: 'primary' },
    // { label: 'Deceased', code: STATUS_CODES.DECEASED, color: 'danger' }
]



export const STATUS_BORDER_COLOR = {
    [STATUS_CODES.NORMAL]: 'success',
    [STATUS_CODES.DIET_CHANGED]: 'warning',
    [STATUS_CODES.DISCHARGED]: 'primary',
    // [STATUS_CODES.DECEASED]: 'danger'
}





export function formatProcessedAt(dateTimeStr, includeMinutes = false) {
    if (!dateTimeStr) return '';

    const date = parseISO(dateTimeStr);
    return includeMinutes
        ? format(date, 'EEEE h:mm a')  // "Tuesday 3:10 PM"
        : format(date, 'EEEE h a');    // "Tuesday 3 PM"
}



export const safeParseJSON = (value, fallback = []) => {
    try {
        if (!value) return fallback;

        // If already parsed (object/array), return as is
        if (typeof value === "object") return value;

        // If it's a string, parse it
        return JSON.parse(value);
    } catch (error) {
        console.warn("JSON parse failed:", error, value);
        return fallback;
    }
};