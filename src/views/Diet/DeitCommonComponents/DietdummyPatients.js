export const fullPatientsList = [
  {
    ptc_ptname: "Arun Kumar",
    pt_no: "2500011111",
    mrdNo: "A-102345678",
    status: 1,
    dietTypeId: 1,
    dietTypeName: "Regular Diet",
    gender: "Male",
    age: 45,
    doctor: "Dr. Ramesh",
    location: "Ward 3A",
    room:"H084NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 4, deliveredTime: "01:00 PM", deliveredStatus: "ONTIME" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 1, deliveredTime: null, deliveredStatus: "ORDERED" }
    ]
  },
  {
    ptc_ptname: "Meera",
    pt_no: "2500011112",
    mrdNo: "B-203456789",
    status: 1,
    dietTypeId: 2,
    dietTypeName: "Diabetic Diet",
    gender: "Female",
    age: 32,
    doctor: "Dr. Priya",
    location: "Ward 2B",
    room:"H085NR",
    feedingDetails: [
      { feedTimeId: 1, name: "Early Morning ", from: "05:30 AM", to: "06:30 AM", orderStatusId: 4, deliveredTime: "05:55 AM", deliveredStatus: "ONTIME" },
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 1, deliveredTime: null, deliveredStatus: "ORDERED" },
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 0, deliveredTime: null, deliveredStatus: "NOT_DELIVERED" }
    ]
  },
  {
    ptc_ptname: "Priya",
    pt_no: "2500011113",
    mrdNo: "C-304567890",
    status: 1,
    dietTypeId: 1,
    dietTypeName: "Regular Diet",
    gender: "Female",
    age: 29,
    doctor: "Dr. Anita",
    location: "Ward 4C",
    room:"H086NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 4, deliveredTime: "08:05 AM", deliveredStatus: "ONTIME" },
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Abdullah H",
    pt_no: "2500011114",
    mrdNo: "D-405678901",
    status: 2,
    dietTypeId: 0,
    dietTypeName: null,
    gender: "Male",
    age: 51,
    doctor: "Dr. Rahman",
    location: "Ward 1A",
    room:"H097NR",
    feedingDetails: [
       { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 4, deliveredTime: "08:05 AM", deliveredStatus: "ONTIME" },
    ],
        room: "H092NR",
  },
  {
    ptc_ptname: "Lakshmi",
    pt_no: "2500011115",
    mrdNo: "E-506789012",
    status: 0,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Female",
    age: 38,
    doctor: "Dr. Kavitha",
    location: "Ward 3C",
      room:"H098NR",
    feedingDetails: [
       { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Suresh Babu",
    pt_no: "2500011116",
    mrdNo: "F-607890123",
    status: 1,
    dietTypeId: 3,
    dietTypeName: "Fluid Diet",
    gender: "Male",
    age: 57,
    doctor: "Dr. Kannan",
    location: "Ward 5A",
    room:"H099NR",
    feedingDetails: [
      { feedTimeId: 3, name: "11 AM Feeding", from: "10:45 AM", to: "11:15 AM", orderStatusId: 4, deliveredTime: "11:05 AM", deliveredStatus: "ONTIME" },
      { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Kavitha R",
    pt_no: "2500011117",
    mrdNo: "G-708901234",
    status: 2,
    dietTypeId: 0,
    dietTypeName: null,
    gender: "Female",
    age: 41,
    doctor: "Dr. Priya",
    location: "Ward 1C",
      room:"H100NR",
    feedingDetails: [
       { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Vignesh M",
    pt_no: "2500011118",
    mrdNo: "H-809012345",
    status: 1,
    dietTypeId: 5,
    dietTypeName: "High Protein Diet",
    gender: "Male",
    age: 26,
    doctor: "Dr. Ramesh",
    location: "Ward 4A",
    room:"H101NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 0, deliveredTime: null, deliveredStatus: "NOT_DELIVERED" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 4, deliveredTime: "07:20 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Anitha Raj",
    pt_no: "2500011119",
    mrdNo: "I-910123456",
    status: 1,
    dietTypeId: 2,
    dietTypeName: "Diabetic Diet",
    gender: "Female",
    age: 33,
    doctor: "Dr. Vidya",
    location: "Ward 2A",
    room:"H105NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 4, deliveredTime: "08:00 AM", deliveredStatus: "ONTIME" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 3, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Deepak",
    pt_no: "2500011120",
    mrdNo: "J-112345670",
    status: 0,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Male",
    age: 48,
    doctor: "Dr. Manoj",
    location: "Ward 3B",
    room:"H106NR",
    feedingDetails: [
       { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 0, deliveredTime: null, deliveredStatus: "NOT_DELIVERED" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 4, deliveredTime: "07:20 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Ramesh K",
    pt_no: "2500011121",
    mrdNo: "K-223456781",
    status: 1,
        dietTypeName: "Regular Diet",
    dietTypeId: 1,
    gender: "Male",
    age: 52,
    doctor: "Dr. Kannan",
    location: "Ward 5C",
    room:"H109NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 3, deliveredTime: null, deliveredStatus: "DELAYED" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Sneha Murthy",
    pt_no: "2500011122",
    mrdNo: "L-334567892",
    status: 1,
    dietTypeId: 3,
    dietTypeName: "Fluid Diet",
    gender: "Female",
    age: 27,
    doctor: "Dr. Anita",
    location: "Ward 1B",
       room:"H110NR",
    feedingDetails: [
      { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 4, deliveredTime: "04:05 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Harish",
    pt_no: "2500011123",
    mrdNo: "M-445678903",
    status: 2,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Male",
    age: 36,
    doctor: "Dr. Rahman",
    location: "Ward 2C",
           room:"H112NR",
    feedingDetails: [
       { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 4, deliveredTime: "04:05 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Divya S",
    pt_no: "2500011124",
    mrdNo: "N-556789014",
    status: 1,
    dietTypeId: 5,
    dietTypeName: "High Protein Diet",
    gender: "Female",
    age: 30,
    doctor: "Dr. Vidya",
    location: "Ward 4B",
       room:"H111NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 4, deliveredTime: "08:00 AM", deliveredStatus: "ONTIME" },
      { feedTimeId: 8, name: "5 PM Feeding", from: "04:45 PM", to: "05:30 PM", orderStatusId: 3, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Vasanth",
    pt_no: "2500011125",
    mrdNo: "O-667890125",
    status: 1,
    dietTypeId: 4,
      dietTypeName:"Soft Diet",   
    gender: "Male",
    age: 28,
    doctor: "Dr. Manoj",
    location: "Ward 3A",
       room:"H109NR",
    feedingDetails: [
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 4, deliveredTime: "07:15 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Jyothi",
    pt_no: "2500011126",
    mrdNo: "P-778901236",
    status: 0,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Female",
    age: 47,
    doctor: "Dr. Kavitha",
    location: "Ward 1A",
       room:"H108NR",
    feedingDetails: [
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 4, deliveredTime: "07:15 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Mohanraj",
    pt_no: "2500011127",
    mrdNo: "Q-889012347",
    status: 1,
    dietTypeId: 1,
        dietTypeName: "Regular Diet",
    gender: "Male",
    age: 40,
    doctor: "Dr. Ramesh",
    location: "Ward 5B",
          room:"H107NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 1, deliveredTime: null, deliveredStatus: "ORDERED" },
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 0, deliveredTime: null, deliveredStatus: "NOT_DELIVERED" }
    ]
  },
  {
    ptc_ptname: "Prem Kumar",
    pt_no: "2500011128",
    mrdNo: "R-990123458",
    status: 1,
    dietTypeId: 2,
     dietTypeName: "Diabetic Diet",
    gender: "Male",
    age: 34,
    doctor: "Dr. Priya",
    location: "Ward 2A",
          room:"H106NR",
    feedingDetails: [
      { feedTimeId: 1, name: "Early Morning ", from: "05:30 AM", to: "06:30 AM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },
      { feedTimeId: 3, name: "11 AM Feeding", from: "10:45 AM", to: "11:15 AM", orderStatusId: 4, deliveredTime: "11:00 AM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Shalini",
    pt_no: "2500011129",
    mrdNo: "S-101234569",
    status: 0,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Female",
    age: 31,
    doctor: "Dr. Anita",
    location: "Ward 3C",
          room:"H105NR",
    feedingDetails: [  { feedTimeId: 1, name: "Early Morning ", from: "05:30 AM", to: "06:30 AM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },]
  },
  {
    ptc_ptname: "Gokul",
    pt_no: "2500011130",
    mrdNo: "T-212345670",
    status: 1,
    dietTypeId: 3,
        dietTypeName: "Fluid Diet",
    gender: "Male",
    age: 29,
    doctor: "Dr. Manoj",
    location: "Ward 4C",
          room:"H104NR",
    feedingDetails: [
      { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 4, deliveredTime: "04:00 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Vivek",
    pt_no: "2500011131",
    mrdNo: "U-323456781",
    status: 1,
    dietTypeId: 1,
        dietTypeName: "Regular Diet",
    gender: "Male",
    age: 37,
    doctor: "Dr. Vidya",
    location: "Ward 5A",
          room:"H101NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 4, deliveredTime: "07:50 AM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Ramya",
    pt_no: "2500011132",
    mrdNo: "V-434567892",
    status: 1,
    dietTypeId: 2,
     dietTypeName: "Diabetic Diet",
    gender: "Female",
    age: 28,
    doctor: "Dr. Anita",
    location: "Ward 2A",
          room:"H100NR",
    feedingDetails: [
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Sanjay",
    pt_no: "2500011133",
    mrdNo: "W-545678903",
    status: 1,
    dietTypeId: 3,
        dietTypeName: "Fluid Diet",
    gender: "Male",
    age: 44,
    doctor: "Dr. Ramesh",
    location: "Ward 1B",
          room:"H097NR",
    feedingDetails: [
      { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 0, deliveredTime: null, deliveredStatus: "NOT_DELIVERED" }
    ]
  },
  {
    ptc_ptname: "Lavanya",
    pt_no: "2500011134",
    mrdNo: "X-656789014",
    status: 1,
    dietTypeId: 4,
   dietTypeName:"Soft Diet",   
    gender: "Female",
    age: 35,
    doctor: "Dr. Kavitha",
    location: "Ward 3A",
          room:"H099NR",
    feedingDetails: [
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 4, deliveredTime: "07:10 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Joseph",
    pt_no: "2500011135",
    mrdNo: "Y-767890125",
    status: 2,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Male",
    age: 60,
    doctor: "Dr. Priya",
    location: "Ward 1C",
          room:"H092NR",
    feedingDetails: [  { feedTimeId: 1, name: "Early Morning ", from: "05:30 AM", to: "06:30 AM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },]
  },
  {
    ptc_ptname: "Rithika",
    pt_no: "2500011136",
    mrdNo: "Z-878901236",
    status: 0,
    dietTypeId: 0,
      dietTypeName: null,
    gender: "Female",
    age: 26,
    doctor: "Dr. Anita",
    location: "Ward 2C",
          room:"H090NR",
    feedingDetails: [  { feedTimeId: 1, name: "Early Morning ", from: "05:30 AM", to: "06:30 AM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" },]
  },
  {
    ptc_ptname: "Manoj",
    pt_no: "2500011137",
    mrdNo: "AA-989012347",
    status: 1,
    dietTypeId: 5,
    dietTypeName: "High Protein Diet",
    gender: "Male",
    age: 42,
    doctor: "Dr. Manoj",
    location: "Ward 4B",
          room:"H089NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 3, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Geetha",
    pt_no: "2500011138",
    mrdNo: "AB-101234568",
    status: 1,
        dietTypeName: "Regular Diet",
    dietTypeId: 1,
    gender: "Female",
    age: 39,
    doctor: "Dr. Kannan",
    location: "Ward 3B",
          room:"H087NR",
    feedingDetails: [
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 4, deliveredTime: "12:55 PM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Ashok",
    pt_no: "2500011139",
    mrdNo: "AC-212345689",
    status: 1,
    dietTypeId: 2,
     dietTypeName: "Diabetic Diet",
    gender: "Male",
    age: 33,
    doctor: "Dr. Vidya",
    location: "Ward 5C",
          room:"H087NR",
    feedingDetails: [
      { feedTimeId: 1, name: "Early Morning", from: "05:30 AM", to: "06:30 AM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Rameswari",
    pt_no: "2500011140",
    mrdNo: "AD-323456790",
    status: 1,
    dietTypeId: 4,
      dietTypeName:"Soft Diet",   
    gender: "Female",
    age: 31,
    doctor: "Dr. Priya",
    location: "Ward 4A",
          room:"H086NR",
    feedingDetails: [
      { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM", orderStatusId: 0, deliveredTime: null, deliveredStatus: "NOT_DELIVERED" }
    ]
  },
  {
    ptc_ptname: "Rohit",
    pt_no: "2500011141",
    mrdNo: "AE-434567801",    
    status: 1,
    dietTypeId: 3,
        dietTypeName: "Fluid Diet",
    gender: "Male",
    age: 29,
    doctor: "Dr. Ramesh",
    location: "Ward 5A",
          room:"H106NR",
    feedingDetails: [
      { feedTimeId: 3, name: "11 AM Feeding", from: "10:45 AM", to: "11:15 AM", orderStatusId: 4, deliveredTime: "11:00 AM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Sandhya",
    pt_no: "2500011142",
    mrdNo: "AF-545678912",
    status: 1,
    dietTypeId: 5,
    dietTypeName: "High Protein Diet",
    gender: "Female",
    age: 36,
    doctor: "Dr. Anita",
    location: "Ward 3C",
    room:"H111NR",
    feedingDetails: [
      { feedTimeId: 8, name: "5 PM Feeding", from: "04:45 PM", to: "05:30 PM", orderStatusId: 3, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Siddharth",
    pt_no: "2500011143",
    mrdNo: "AG-656789023",
    status: 1,
    dietTypeId: 1,
    dietTypeName: "Regular Diet",
    gender: "Male",
    age: 40,
    doctor: "Dr. Kavitha",
    location: "Ward 2A",
    room:"H114NR",
    feedingDetails: [
      { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM", orderStatusId: 4, deliveredTime: "08:10 AM", deliveredStatus: "ONTIME" }
    ]
  },
  {
    ptc_ptname: "Madhavi",
    pt_no: "2500011144",
    mrdNo: "AH-767890134",
    status: 1,
    dietTypeId: 2,
     dietTypeName: "Diabetic Diet",
    gender: "Female",
    age: 38,
    doctor: "Dr. Priya",
    location: "Ward 4C",
    room:"H117NR",
    feedingDetails: [
      { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM", orderStatusId: 2, deliveredTime: null, deliveredStatus: "DELAYED" }
    ]
  },
  {
    ptc_ptname: "Charan",
    pt_no: "2500011145",
    mrdNo: "AI-878901245",
    status: 1,
    dietTypeId: 3,
    dietTypeName: "Fluid Diet",
    gender: "Male",
    age: 27,
    doctor: "Dr. Manoj",
    location: "Ward 1B",
    room:"H118NR",
    feedingDetails: [
      { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM", orderStatusId: 4, deliveredTime: "04:10 PM", deliveredStatus: "ONTIME" }
    ]
  }
];
