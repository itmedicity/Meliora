import { Box, Tooltip, Typography } from '@mui/joy'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import DashboardCard from '../Components/DashboardCard';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { taskColor } from 'src/color/Color';
import DietTile from '../Diet/DeitCommonComponents/DietTile';
import deitPic from '../../assets/images/deitPic.jpg'
import deitNotPlanned from '../../assets/images/deitNotPlanned.png'
import NotUnderDeit from '../../assets/images/NotUnderDeit.jpg'
import DietPlan from '../Diet/DietPlan';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ToggleSquareButton from '../Components/ToggleSquareButton';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeitMastComponent from '../Diet/DeitCommonComponents/DietMastComponent';
import FloatingPanel from '../Components/FloatingPanel';
import DeitFindPatientFloat from '../Diet/DeitCommonComponents/DietFindPatientFloat';
import PatientDietView from '../Diet/DeitCommonComponents/PatientDietView';
import DietFeedtimeComponent from '../Diet/DeitCommonComponents/DietFeedtimeComponent';
import DietOrderStatus from '../Diet/DeitCommonComponents/DietOrderStatus';
import { fullPatientsList } from '../Diet/DeitCommonComponents/DietdummyPatients';
import DietTileNotPlanned from '../Diet/DeitCommonComponents/DietTileNotPlanned';
import DietView from '../Diet/DeitCommonComponents/DietView';
import TimerIcon from '@mui/icons-material/Timer';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CurrenttimeFeedTile from '../Diet/DeitCommonComponents/CurrenttimeFeedTile';

const InPatientList = () => {

  const [deitPlanOpen, setDeitPlanOpen] = useState(false)
  const [deitPlanFlag, setDeitPlanFlag] = useState(0)
  const [selectedPatientData, setSelectedPatientData] = useState([])
  const [activeButton, setActiveButton] = useState("allList");
  const [dietType, setDietType] = useState("");
  const dietIconRef = useRef(null);
  const [ipNumber, setIpNumber] = useState('')
  const [patientDietData, setPatientDietData] = useState([])
  const [showPatientFlag, setshowPatientFlag] = useState(0)
  const [feedingTime, setfeedingTime] = useState(2)
  const [orderStatus, setorderStatus] = useState('')
  const dummyPatients = fullPatientsList

  const dietTypes = [
    {
      id: 1,
      name: "Regular Diet",
      feedingTimes: [2, 4, 10]
    },
    {
      id: 2,
      name: "Diabetic Diet",
      feedingTimes: [1, 2, 3, 4, 10]  // + 11 AM feed
    },
    {
      id: 3,
      name: "Fluid Diet",
      feedingTimes: [3, 5, 7]      // Example (customize yourself)
    },
    {
      id: 4,
      name: "Soft Diet",
      feedingTimes: [2, 4, 10]    // Same as regular (change if needed)
    },
    {
      id: 5,
      name: "High Protein Diet",
      feedingTimes: [2, 4, 8, 10]  // Example with 5 PM feeding
    }
  ];

  const eatingTimes = [
    { feedTimeId: 1, name: "Early Morning", from: "05:30 AM", to: "06:30 AM" },
    { feedTimeId: 2, name: "Breakfast", from: "07:30 AM", to: "08:30 AM" },
    { feedTimeId: 3, name: "11 AM Feed", from: "10:45 AM", to: "11:50 AM" },
    { feedTimeId: 4, name: "Lunch", from: "12:30 PM", to: "01:30 PM" },
    { feedTimeId: 5, name: "Evening Snack", from: "03:45 PM", to: "04:30 PM" },
    { feedTimeId: 6, name: "3 PM Feed", from: "03:00 PM", to: "03:30 PM" },
    { feedTimeId: 7, name: "4 PM Feed", from: "04:00 PM", to: "04:30 PM" },
    { feedTimeId: 8, name: "5 PM Feed", from: "04:45 PM", to: "05:30 PM" },
    { feedTimeId: 9, name: "5:30 PM Feed", from: "05:30 PM", to: "06:00 PM" },
    { feedTimeId: 10, name: "Dinner", from: "06:45 PM", to: "07:45 PM" },
  ];

  const orderStatusList = [
    {
      orderStatusId: 0,
      status: "pending_order",
      label: "Pending Order ",
      description: "Order Status Not Updated"
    },
    {
      orderStatusId: 1,
      status: "order",
      label: "Ordered",
      description: "Order has been placed"
    },
    {
      orderStatusId: 2,
      status: "processing",
      label: "Processing Order",
      description: "Order is being prepared"
    },
    {
      orderStatusId: 3,
      status: "order_picked",
      label: "Order Picked",
      description: "Order picked by staff"
    },
    {
      orderStatusId: 4,
      status: "diet_delivered",
      label: "Diet Delivered",
      description: "Diet has been delivered"
    }
  ];

  //for single patient 
  const dummyDeit = {
    ptc_ptname: "Arun Kumar",
    pt_no: "2500011111",
    mrdNo: "A-102345678",
    status: 1,
    dietType: "High Protein Diet",
    gender: "Male",
    age: 45,
    doctor: "Dr. Ramesh",
    location: "Ward 3A - Bed 12",
    orderStatusId: 1,
    fullDayDiet: [
      {
        deitSlno: 1,
        time: "Breakfast",
        diet: "Regular Diet",
        items: ["Idli (2 pcs)", "Sambar", "Tea"],
        delivered: true,
        deliveredTime: "08:12 AM"
      },
      {
        deitSlno: 2,
        time: "Lunch",
        diet: "Regular Diet",
        items: ["Rice", "Sambar", "Veg Curry", "Curd"],
        delivered: true,
        deliveredTime: "01:15 PM"
      },
      {
        deitSlno: 3,
        time: "Evening Snacks",
        diet: "Regular Diet",
        items: ["Biscuits", "Tea"],
        delivered: true,
        deliveredTime: "05:20 PM"
      },
      {
        deitSlno: 4,
        time: "Dinner",
        diet: "Regular Diet",
        items: ["Chapati (2)", "Dal", "Veg Curry"],
        delivered: false,
        deliveredTime: null
      }
    ]
  }


  const handleSearch = useCallback(() => {
    setPatientDietData(dummyDeit)
    setshowPatientFlag(1)
  }, [])


  const getDietTypeName = (id) => {
    const diet = dietTypes.find((d) => d.id === id);
    return diet ? diet.name : "Not Planned";
  };

  const getDietImage = (item) => {
    if (item.status === 0) return deitNotPlanned;
    if (item.status === 1) return deitPic;
    if (item.status === 2) return NotUnderDeit;
    return null;
  };

  const notPlannedPatients = dummyPatients.filter(p => p.status === 0);
  const plannedPatients = dummyPatients.filter(p => p.status === 1);
  const notUnderDeitplaning = dummyPatients.filter(p => p.status === 2);


  const getCurrentFeeding = () => {
    const now = new Date();
    // Convert current time to minutes since midnight
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    // Helper to convert "hh:mm AM/PM" to minutes
    const toMinutes = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
    // Loop through array
    for (const feed of eatingTimes) {
      const start = toMinutes(feed.from);
      const end = toMinutes(feed.to);
      if (currentMinutes >= start && currentMinutes <= end) {
        return feed; // return the full object
      }
    }
    return null;
  };

  const currentFeed = getCurrentFeeding();



  const patientsWithFeedStatus = plannedPatients.map(patient => {
    const feeds = patient.feedingDetails || [];

    // Find feed that matches current time slot
    let feedInCurrentTime = null;
    if (currentFeed) {
      feedInCurrentTime = feeds.find(f =>
        f.from === currentFeed.from && f.to === currentFeed.to
      );
    }

    // Previous feed fallback
    const previousFeed = feeds.length > 0 ? feeds[feeds.length - 1] : null;

    const selectedFeed = feedInCurrentTime || previousFeed;

    return {
      ...patient,
      selectedFeed,
      isCurrent: !!feedInCurrentTime
    };
  });




  const handleClose = () => {

  };

  const [maxTiles, setMaxTiles] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateMaxTiles = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const tileWidth = 330 + 8; // DietTile width + gap (gap: 1 = 8px approx)
        const possibleTiles = Math.floor(containerWidth / tileWidth);
        setMaxTiles(possibleTiles);
      }
    };
    updateMaxTiles();
    window.addEventListener("resize", updateMaxTiles);
    return () => window.removeEventListener("resize", updateMaxTiles);
  }, []);





  const onTileClick = useCallback((item) => {
    setSelectedPatientData(item)
    setDeitPlanFlag(1)
    setDeitPlanOpen(true)
  }, [])

  const notMarkedPatients = dummyPatients.filter(p => p.status === 0);


  const assignFeedTimesToPatients = (patients, dietTypes) => {
    return patients.map(pt => {
      const diet = dietTypes.find(d => d.id === pt.dietTypeId);
      return {
        ...pt,
        feedingTimes: diet ? diet.feedingTimes : []
      };
    });
  };

  const patientsWithFeeds = assignFeedTimesToPatients(dummyPatients, dietTypes);
  const patientsForSelectedFeed = patientsWithFeeds.filter(pt =>
    pt.feedingTimes.includes(feedingTime)
  );


  const getPatientsByOrderStatus = (orderStatus) => {

    // Case 1: No filter → return all
    if (orderStatus === null || orderStatus === undefined) {
      return fullPatientsList;
    }

    // Case 2: Filter patients based on matching feeding status
    return fullPatientsList
      .map(patient => {
        const matchedFeeds = patient.feedingDetails.filter(
          feed => Number(feed.orderStatusId) === Number(orderStatus)
        );

        if (matchedFeeds.length > 0) {
          return {
            ...patient,
            feedingDetails: matchedFeeds, // important!
          };
        }

        return null;
      })
      .filter(Boolean);
  };


  const getPatientsByFeedingTime = (feedTimeId) => {
    if (!feedTimeId) return fullPatientsList;

    return fullPatientsList
      .map(patient => {
        const matchedFeeds = patient.feedingDetails.filter(
          feed => Number(feed.feedTimeId) === Number(feedTimeId)
        );

        if (matchedFeeds.length > 0) {
          return {
            ...patient,
            feedingDetails: matchedFeeds,
          };
        }

        return null;
      })
      .filter(Boolean);
  };



  const getDeliveredOnTimePatients = () =>
    fullPatientsList.map((item, index) => ({
      ...item,
      feedingDetails: item.feedingDetails?.filter(feed => feed.orderStatusId === 4) || [],
    }));



  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Calculate delay in minutes
  const getDelayedByMinutes = (feedEndTimeStr, deliveredTimeStr = null) => {
    const feedEndTime = parseTime(feedEndTimeStr);
    const deliveredTime = deliveredTimeStr ? parseTime(deliveredTimeStr) : new Date(); // current time if not delivered
    const diffMs = deliveredTime - feedEndTime;
    return diffMs > 0 ? Math.floor(diffMs / 60000) : 0; // minutes
  };

  // Get patients with delayed feeds
  const getDelayedPatients = () => {
    const now = new Date();

    return fullPatientsList.flatMap((patient) =>
      patient.feedingDetails
        ?.filter((feed) => {
          const feedEndTime = parseTime(feed.to);
          const deliveredTime = feed.deliveredTime ? parseTime(feed.deliveredTime) : null;

          // Delivered but late
          if (deliveredTime && deliveredTime > feedEndTime && feed.deliveredStatus !== "ONTIME") {
            return true;
          }

          // Not delivered yet and scheduled time passed
          if (!deliveredTime && now > feedEndTime) {
            return true;
          }

          return false;
        })
        .map((feed) => ({
          ...patient,
          feedingDetails: [
            {
              ...feed,
              delayedByMinutes: getDelayedByMinutes(feed.to, feed.deliveredTime),
            },
          ],
        })) || []
    );
  };

  const getPatientCurrentFeed = (feedingDetails) => {
    if (!feedingDetails || feedingDetails.length === 0) return null;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const toMinutes = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    for (const feed of feedingDetails) {
      const start = toMinutes(feed.from);
      const end = toMinutes(feed.to);

      if (currentMinutes >= start && currentMinutes <= end) {
        return feed; // Return feeding object from that patient
      }
    }

    return null;
  };


  const processedPatients = fullPatientsList.map((patient) => {
    const currentFeeding = getPatientCurrentFeed(patient.feedingDetails);

    return {
      ...patient,
      currentFeeding,
      FeedingTime: currentFeeding
        ? `${currentFeeding.name} (${currentFeeding.from} - ${currentFeeding.to})`
        : "No Current Feed"
    };
  });



  const orderPriority = {
    0: 1, // Pending
    1: 2, // Ordered
    2: 3, // Processing
    3: 4, // Picked
    4: 5, // Delivered
  };

  const sortedPatients = [...patientsWithFeedStatus].sort((a, b) => {
    const aStatus = a.selectedFeed?.orderStatusId ?? 0;
    const bStatus = b.selectedFeed?.orderStatusId ?? 0;

    return (orderPriority[aStatus] || 99) - (orderPriority[bStatus] || 99);
  });



  const Section = ({ title, titleColor, bg, children }) => (
    <Box
      sx={{
        flex: "0 1 auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: bg,
        borderRadius: 2,
        p: 0.5,
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: titleColor,
          borderLeft: `4px solid ${titleColor}`,
          pl: 1,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );

  const TileGrid = ({ children }) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 0.5,
        // px: 0.5,
        alignContent: "start",
      }}
    >
      {children}
    </Box>
  );

  const AutoScaleSection = ({
    title,
    titleColor,
    bg,
    children,
    takeRest = false,
  }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      {/* Title */}
      <Box
        sx={{
          px: 0.8,
          py: 0.4,
          fontWeight: 700,
          fontSize: "clamp(10px, 1vw, 14px)",
          color: titleColor,
          borderLeft: `4px solid ${titleColor}`,
          bgcolor: bg,
          flexShrink: 0,
        }}
      >
        {title}
      </Box>

      {/* Tile Grid */}
      <Box
        sx={{
          flex: takeRest ? 1 : "0 0 auto",
          minHeight: 0,

          display: "grid",
          gap: 0.6,

          gridTemplateColumns:
            "repeat(auto-fit, minmax(clamp(110px, 10vw, 200px), 1fr))",

          gridAutoRows:
            "minmax(clamp(65px, 8vw, 95px), 1fr)",

          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <DashboardCard
        icon={LocalDiningIcon}
        title="Diet Plan"
        onClose={handleClose}
      >
        {deitPlanFlag === 1 ?
          <DietPlan Flag={deitPlanFlag} open={deitPlanOpen} setOpen={setDeitPlanOpen} selectedPatientData={selectedPatientData} dietTypes={dietTypes} />
          : null}
        <Box sx={{ flex: 1, borderBottom: "1px solid #C5C5C5", p: .5 }}>
          <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
            <Box sx={{ color: taskColor.DarkViolet, fontWeight: 500 }}>
              Payward H
            </Box>
            <Box sx={{ color: taskColor.DarkViolet, display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, fontWeight: 500, flex: 1 }}>
              - <NotificationsActiveIcon />
              {currentFeed
                ? `${currentFeed.name} (${currentFeed.from} - ${currentFeed.to})`
                : "No Current Feed"}
            </Box>
            <Box sx={{ display: 'flex', gap: .5 }}>
              <Tooltip title="All List" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<DashboardIcon fontSize="small" />}
                    color={taskColor.purple}
                    selected={activeButton === "allList"}
                    onClick={() => setActiveButton("allList")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Not Marked" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<DoNotDisturbIcon fontSize="small" />}
                    color="darkred"
                    selected={activeButton === "notMarked"}
                    onClick={() => setActiveButton("notMarked")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Diet Type" placement='top'>
                <Box ref={dietIconRef}>
                  <ToggleSquareButton
                    icon={<RamenDiningIcon fontSize="small" />}
                    color="#8E3801"
                    selected={activeButton === "dietType"}
                    onClick={() =>
                      setActiveButton(activeButton === "dietType" ? "" : "dietType")
                    }
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Find Patient" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<PersonIcon fontSize="small" />}
                    color="blue"
                    selected={activeButton === "findPatient"}
                    onClick={() => setActiveButton("findPatient")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Order Status" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<ShoppingBagIcon fontSize="small" />}
                    color="brown"
                    selected={activeButton === "orderStatus"}
                    onClick={() => setActiveButton("orderStatus")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Not Under Diet" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<DoNotDisturbOnIcon fontSize="small" />}
                    color="black"
                    selected={activeButton === "notUnderDiet"}
                    onClick={() => setActiveButton("notUnderDiet")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Food Time" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<NotificationsActiveIcon fontSize="small" />}
                    color="#BC922D"
                    selected={activeButton === "foodTime"}
                    onClick={() => setActiveButton("foodTime")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Delivered On Time" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<TimerIcon fontSize="small" />}
                    color="green"
                    selected={activeButton === "deliveredOnTime"}
                    onClick={() => setActiveButton("deliveredOnTime")}
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Delivery Delayed" placement='top'>
                <Box>
                  <ToggleSquareButton
                    icon={<TimelapseIcon fontSize="small" />}
                    color="red"
                    selected={activeButton === "deliveryDelayed"}
                    onClick={() => setActiveButton("deliveryDelayed")}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1, height: '75vh', overflow: 'auto', m: 1 }}>
          <FloatingPanel
            open={activeButton === "dietType"}
            onClose={() => {
              setDietType("");
              setActiveButton("allList");
            }}
            title={"Diet Type"}
          >
            <DeitMastComponent
              dietType={dietType}
              dietTypes={dietTypes}
              setDietType={(val) => setDietType(Number(val))}
            />
          </FloatingPanel>
          <FloatingPanel
            open={activeButton === "findPatient"}
            onClose={() => {
              setActiveButton("allList");
              setIpNumber("")
              setshowPatientFlag(0)
            }}
            title={"IP Number"}
          >
            <DeitFindPatientFloat handleSearch={handleSearch} patientDietData={patientDietData}
              setPatientDietData={setPatientDietData} setIpNumber={setIpNumber} ipNumber={ipNumber} />
          </FloatingPanel>

          <FloatingPanel
            open={activeButton === "foodTime"}
            onClose={() => {
              setfeedingTime("");
              setActiveButton("allList");
            }}
            title={"Food Time"}
          >
            <DietFeedtimeComponent
              feedingTime={feedingTime}
              eatingTimes={eatingTimes}
              setfeedingTime={(val) => setfeedingTime(Number(val))}
            />
          </FloatingPanel>
          <FloatingPanel
            open={activeButton === "orderStatus"}
            onClose={() => {
              setDietType("");
              setActiveButton("allList");
            }}
            title={"Order Status"}
          >
            <DietOrderStatus
              orderStatus={orderStatus}
              orderStatusList={orderStatusList}
              setorderStatus={(val) => setorderStatus(Number(val))}
            />
          </FloatingPanel>
          {activeButton === "notMarked" ? (
            <DietView
              title={"Not Planned"}
              titleColor={"Darkred"}
              statusColor="red"
              borderLeftColor={"4px solid darkred"}
              bgColor="#fdecea"
              status="Not Planned"
              tileBorder={"2px solid darkred"}
              patients={notMarkedPatients}
              getDietImage={getDietImage}
              onTileClick={onTileClick}
              activeButton={"notMarked"}
            />
          ) :
            activeButton === "dietType" ? (
              <DietView
                title={dietTypes.find(d => d.id === dietType)?.name || "Planned Patients"}
                titleColor={taskColor.darkPurple}
                statusColor={taskColor.lightpurple}
                borderLeftColor={`2px solid ${taskColor.darkPurple}`}
                bgColor={taskColor.lightpurple}
                status="Planned"
                tileBorder={`2px solid ${taskColor.darkPurple}`}
                patients={
                  dietType
                    ? plannedPatients.filter(p => p.dietTypeId === dietType)
                    : plannedPatients
                }
                getDietImage={getDietImage}
                onTileClick={onTileClick}
                orderStatus={plannedPatients.orderStatusId}
                activeButton={activeButton}
              />
            ) :
              activeButton === "findPatient" && ipNumber !== null && showPatientFlag === 1 ? (
                < PatientDietView patientDietData={patientDietData}
                  setPatientDietData={setPatientDietData} />
              ) :
                activeButton === "notUnderDiet" ? (
                  <DietView
                    title={"Not Under Diet"}
                    titleColor={"Black"}
                    statusColor="red"
                    borderLeftColor={"4px solid black"}
                    bgColor="lightgrey"
                    status="Not Under Diet"
                    tileBorder={"2px solid black"}
                    patients={notUnderDeitplaning}
                    getDietImage={getDietImage}
                    onTileClick={onTileClick}
                    activeButton={activeButton}
                  />
                ) :
                  activeButton === "foodTime" && feedingTime !== null ? (
                    <DietView
                      title={
                        eatingTimes.find(t => t.feedTimeId === feedingTime)?.name || "Planned Patients"
                      }
                      titleColor={taskColor.darkPurple}
                      statusColor={taskColor.lightpurple}
                      borderLeftColor={`2px solid ${taskColor.darkPurple}`}
                      bgColor={taskColor.lightpurple}
                      status="Planned"
                      tileBorder={`2px solid ${taskColor.darkPurple}`}
                      patients={getPatientsByFeedingTime(feedingTime)}
                      getDietImage={getDietImage}
                      onTileClick={onTileClick}
                      activeButton={activeButton}
                    />
                  ) :
                    activeButton === "orderStatus" ? (
                      <DietView
                        title={
                          orderStatusList.find(d => d.orderStatusId === orderStatus)?.label ||
                          "Order Status"
                        }
                        titleColor={taskColor.darkPurple}
                        statusColor={taskColor.lightpurple}
                        borderLeftColor={`4px solid ${taskColor.darkPurple}`}
                        bgColor={taskColor.lightpurple}
                        status="Order Status"
                        tileBorder={`2px solid ${taskColor.darkPurple}`}
                        patients={getPatientsByOrderStatus(orderStatus)}
                        getDietImage={getDietImage}
                        onTileClick={onTileClick}
                        activeButton={activeButton}
                      />
                    ) :
                      activeButton === "deliveredOnTime" ? (
                        <DietView
                          title="Delivered On Time"
                          titleColor={taskColor.green}
                          statusColor={taskColor.lightGreen}
                          borderLeftColor={`2px solid ${taskColor.darkPurple}`}
                          bgColor={"white"}
                          status="Delivered On Time"
                          tileBorder={`2px solid ${taskColor.darkPurple}`}
                          patients={getDeliveredOnTimePatients()}
                          getDietImage={getDietImage}
                          onTileClick={onTileClick}
                          activeButton={activeButton}
                        />
                      ) :
                        activeButton === "deliveryDelayed" ? (
                          <DietView
                            title="Delivery Delayed"
                            titleColor={taskColor.red}
                            statusColor={taskColor.lightRed}
                            borderLeftColor={`2px solid ${taskColor.darkPurple}`}
                            bgColor={"white"}
                            status="Delivery Delayed"
                            tileBorder={`2px solid ${taskColor.darkPurple}`}
                            patients={getDelayedPatients()}
                            getDietImage={getDietImage}
                            onTileClick={onTileClick}
                            activeButton={activeButton}
                          />

                        ) :
                          (
                            // activeButton === "allList" ||
                            // activeButton === "findPatient" ||
                            // activeButton === "foodTime") && (
                            // <Box
                            //   sx={{
                            //     height: "100%",
                            //     overflowY: "auto",
                            //     overflowX: "hidden",
                            //     pr: 0.5,
                            //   }}
                            // >
                            //   {/* NOT PLANNED */}
                            //   <DietGroup
                            //     title="Not Planned"
                            //     titleColor="#770707"
                            //     bg="#fdecea"
                            //   >
                            //     {notPlannedPatients.map((item) => (
                            //       <DietTileNotPlanned
                            //         key={item.pt_no}
                            //         name={item.ptc_ptname}
                            //         pt_no={item.pt_no}
                            //         mrdNo={item.mrdNo}
                            //         status="Not Planned"
                            //         bordercolor="2px solid darkred"
                            //         image={getDietImage(item)}
                            //         onClick={() => onTileClick(item)}
                            //         roomName={item.room}
                            //       />
                            //     ))}
                            //   </DietGroup>
                            //   {/* PLANNED */}
                            //   <DietGroup
                            //     title="Planned Diet"
                            //     titleColor={taskColor.darkPurple}
                            //     bg={taskColor.lightpurple}
                            //   >
                            //     {sortedPatients.map((patient) => (
                            //       <CurrenttimeFeedTile
                            //         key={patient.pt_no}
                            //         name={patient.ptc_ptname}
                            //         roomName={patient.room}
                            //         pt_no={patient.pt_no}
                            //         image={getDietImage(patient)}
                            //         FeedingName={patient.selectedFeed?.name || ""}
                            //         dietTypeName={patient.dietTypeName}
                            //         orderStatus={patient.selectedFeed?.orderStatusId ?? 0}
                            //         deliveredTime={patient.selectedFeed?.deliveredTime || null}
                            //         onClick={() => onTileClick(patient)}
                            //       />
                            //     ))}
                            //   </DietGroup>
                            //   {/* NOT UNDER DIET */}
                            //   <DietGroup
                            //     title="Not Under Diet"
                            //     titleColor="black"
                            //     bg="#e7e7ee"
                            //   >
                            //     {notUnderDeitplaning.map((item) => (
                            //       <DietTile
                            //         key={item.pt_no}
                            //         name={item.ptc_ptname}
                            //         pt_no={item.pt_no}
                            //         mrdNo={item.mrdNo}
                            //         status="Not Under Diet"
                            //         bordercolor="2px solid black"
                            //         roomName={item.room}
                            //         image={getDietImage(item)}
                            //       />
                            //     ))}
                            //   </DietGroup>
                            // </Box>
                            activeButton === "allList" ||
                            activeButton === "findPatient" ||
                            activeButton === "foodTime") && (
                            <Box
                              sx={{
                                height: "100%",
                                display: "grid",
                                gridTemplateRows: "auto 1fr auto",
                                gap: 0.6,
                                overflow: "hidden",
                              }}
                            >
                              <AutoScaleSection
                                title="Not Planned"
                                titleColor="#770707"
                                bg="#fdecea"
                              >
                                {notPlannedPatients.map((item) => (
                                  <DietTileNotPlanned
                                    key={item.pt_no}
                                    name={item.ptc_ptname}
                                    pt_no={item.pt_no}
                                    mrdNo={item.mrdNo}
                                    status="Not Planned"
                                    bordercolor="2px solid darkred"
                                    image={getDietImage(item)}
                                    onClick={() => onTileClick(item)}
                                    roomName={item.room}
                                  />
                                ))}
                              </AutoScaleSection>

                              <AutoScaleSection
                                title="Planned Diet"
                                titleColor={taskColor.darkPurple}
                                bg={taskColor.lightpurple}
                              >
                                {sortedPatients.map((patient) => (
                                  <CurrenttimeFeedTile
                                    key={patient.pt_no}
                                    name={patient.ptc_ptname}
                                    roomName={patient.room}
                                    pt_no={patient.pt_no}
                                    image={getDietImage(patient)}
                                    FeedingName={patient.selectedFeed?.name || ""}
                                    dietTypeName={patient.dietTypeName}
                                    orderStatus={patient.selectedFeed?.orderStatusId ?? 0}
                                    deliveredTime={patient.selectedFeed?.deliveredTime || null}
                                    onClick={() => onTileClick(patient)}
                                  />
                                ))}
                              </AutoScaleSection>

                              <AutoScaleSection
                                title="Not Under Diet"
                                titleColor="black"
                                bg="#e7e7ee"
                              >
                                {notUnderDeitplaning.map((item) => (
                                  <DietTile
                                    key={item.pt_no}
                                    name={item.ptc_ptname}
                                    pt_no={item.pt_no}
                                    mrdNo={item.mrdNo}
                                    status="Not Under Diet"
                                    bordercolor="2px solid black"
                                    roomName={item.room}
                                    image={getDietImage(item)}
                                  />
                                ))}
                              </AutoScaleSection>
                            </Box>

                          )}

        </Box >
      </DashboardCard >
    </Box >
  )
}
export default InPatientList

// activeButton === "allList" || activeButton === "findPatient" || activeButton === "foodTime" ? (

//   <Box
//     sx={{
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       gap: 0.5,
//       overflow: "hidden",
//     }}
//   >

//     <Section title="Not Planned" titleColor="#770707" bg="#fdecea">
//       <TileGrid>
//         {notPlannedPatients.map((item, index) => (
//           <DietTileNotPlanned
//             key={index}
//             name={item.ptc_ptname}
//             pt_no={item.pt_no}
//             mrdNo={item.mrdNo}
//             status="Not Planned"
//             statusColor="red"
//             bordercolor={"2px solid darkred"}
//             image={getDietImage(item)}
//             onClick={() => onTileClick(item)}
//             roomName={item.room}
//           />
//         ))}
//       </TileGrid>
//     </Section>

//     <Section
//       title="Planned Diet"
//       titleColor={taskColor.darkPurple}
//       bg={taskColor.lightpurple}
//       sx={{ maxHeight: "55%" }}
//     >
//       <TileGrid>
//         {sortedPatients.map(patient => (
//           <CurrenttimeFeedTile
//             key={patient.pt_no}
//             name={patient.ptc_ptname}
//             roomName={patient.room}
//             mrdNo={patient.mrdNo}
//             pt_no={patient.pt_no}
//             image={getDietImage(patient)}
//             FeedingTime={
//               patient.selectedFeed
//                 ? `${patient.selectedFeed.from} - ${patient.selectedFeed.to}`
//                 : "No Feed"
//             }
//             FeedingName={patient.selectedFeed?.name || ""}
//             dietTypeName={patient.dietTypeName}
//             orderStatus={patient.selectedFeed?.orderStatusId ?? 0}
//             deliveredTime={patient.selectedFeed?.deliveredTime || null}
//             onClick={() => onTileClick(patient)}
//           />
//         ))}
//       </TileGrid>
//     </Section>

//     <Section title="Not Under Diet" titleColor="black" bg="#e7e7eeff">
//       <TileGrid>
//         {notUnderDeitplaning.map((item, index) => (
//           <DietTile
//             key={index}
//             name={item.ptc_ptname}
//             pt_no={item.pt_no}
//             mrdNo={item.mrdNo}
//             status="Not Under Deit"
//             bordercolor={"2px solid black"}
//             statusColor="grey"
//             roomName={item.room}
//             image={getDietImage(item)}
//           />
//         ))}
//       </TileGrid>
//     </Section>
//   </Box>
//   )



