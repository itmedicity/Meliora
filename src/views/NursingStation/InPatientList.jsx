import { Box, Tooltip } from '@mui/joy'
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
import ToggleSquareButton from '../Components/ToggleSquareButton';
import FloatingPanel from '../Components/FloatingPanel';
import PatientDietView from '../Diet/DeitCommonComponents/PatientDietView';

import { fullPatientsList } from '../Diet/DeitCommonComponents/DietdummyPatients';
import DietTileNotPlanned from '../Diet/DeitCommonComponents/DietTileNotPlanned';
import DietView from '../Diet/DeitCommonComponents/DietView';
import CurrenttimeFeedTile from '../Diet/DeitCommonComponents/CurrenttimeFeedTile';
import AutoScaleSection from './Component/AutoScaleSection';
import { getButtonConfig } from './CommonExportCode/buttonConfig';
import { getPanelConfig } from './CommonExportCode/panelConfig';
import { useAllPatientDietPlan } from '../Diet/CommonData/UseQuery';
import { errorNotify, warningNotify } from '../Common/CommonCode';
import { axioslogin } from '../Axios/Axios';
import CustomeIncidentLoading from '../IncidentManagement/Components/CustomeIncidentLoading';



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

  const [templatedetail, setTemplateDetail] = useState([]);
  const [loadingtemplate, setLoadingTemplate] = useState(false);
  // const dummyPatients = fullPatientsList

  const {
    data: allPatientDiet = [],
    refetch: FetchPatientDietPlan
  } = useAllPatientDietPlan("W009")

  const patients = allPatientDiet || [];

  console.log({
    patients
  });




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


  // const getDietTypeName = (id) => {
  //   const diet = dietTypes.find((d) => d.id === id);
  //   return diet ? diet.name : "Not Planned";
  // };

  const getDietImage = (item) => {
    if (item.status === "NOT_PLANNED") return deitNotPlanned;
    if (item.status === "ACTIVE" || item.status === "CHANGED") return deitPic;
    if (item.status === "STOPPED") return NotUnderDeit;
    return null;
  };


  const formattedPatients = patients?.map(p => ({
    ...p,
    status: p.diet_status || "NOT_PLANNED",
    room: p.fb_rmc_desc,
    category: p.fb_rtc_desc,
    dietTypeName: p.diet_name || "Not Planned",
  }));


  const notPlannedPatients = formattedPatients.filter(p => p.status === "NOT_PLANNED");
  const plannedPatients = formattedPatients.filter(p => p.status === "ACTIVE" || p.status === "CHANGED");
  // Optional (if you define logic later)
  const notUnderDeitplaning = [];




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


  console.log({
    maxTiles
  });

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





  const onTileClick = useCallback(async (item) => {
    if (!item) return;

    setSelectedPatientData(item); // always set

    if (item.status === "ACTIVE") {
      if (!item.template_id) {
        warningNotify("Template Id is Missing!");
        return;
      }

      try {
        setLoadingTemplate(true)
        const response = await axioslogin.post(
          "/patientdietplan/gettemplatedtl",
          { template_id: item.template_id }
        );

        const { data, success, message } = response.data;

        if (success === 0) {
          errorNotify(message || "Error in Fetching Data");
          return;
        }
        console.log({ data });

        setTemplateDetail(data ?? []);
      } catch (error) {
        errorNotify(error?.message || "Something went wrong");
      } finally {
        setLoadingTemplate(false)
      }
    } else {
      // optional: clear old data
      setTemplateDetail([]);
    }

    setDeitPlanFlag(1);
    setDeitPlanOpen(true);

  }, [warningNotify, errorNotify]);


  // const assignFeedTimesToPatients = (patients, dietTypes) => {
  //   return patients.map(pt => {
  //     const diet = dietTypes.find(d => d.id === pt.dietTypeId);
  //     return {
  //       ...pt,
  //       feedingTimes: diet ? diet.feedingTimes : []
  //     };
  //   });
  // };

  // const patientsWithFeeds = assignFeedTimesToPatients(dummyPatients, dietTypes);
  // const patientsForSelectedFeed = patientsWithFeeds.filter(pt =>
  //   pt.feedingTimes.includes(feedingTime)
  // );


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

  // const getPatientCurrentFeed = (feedingDetails) => {
  //   if (!feedingDetails || feedingDetails.length === 0) return null;

  //   const now = new Date();
  //   const currentMinutes = now.getHours() * 60 + now.getMinutes();

  //   const toMinutes = (timeStr) => {
  //     const [time, modifier] = timeStr.split(" ");
  //     let [hours, minutes] = time.split(":").map(Number);
  //     if (modifier === "PM" && hours !== 12) hours += 12;
  //     if (modifier === "AM" && hours === 12) hours = 0;
  //     return hours * 60 + minutes;
  //   };

  //   for (const feed of feedingDetails) {
  //     const start = toMinutes(feed.from);
  //     const end = toMinutes(feed.to);

  //     if (currentMinutes >= start && currentMinutes <= end) {
  //       return feed; // Return feeding object from that patient
  //     }
  //   }

  //   return null;
  // };


  // const processedPatients = fullPatientsList.map((patient) => {
  //   const currentFeeding = getPatientCurrentFeed(patient.feedingDetails);

  //   return {
  //     ...patient,
  //     currentFeeding,
  //     FeedingTime: currentFeeding
  //       ? `${currentFeeding.name} (${currentFeeding.from} - ${currentFeeding.to})`
  //       : "No Current Feed"
  //   };
  // });



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

  console.log({
    sortedPatients
  });



  const buttonConfig = getButtonConfig(taskColor, dietIconRef)

  const panelConfig = getPanelConfig({
    dietType, setDietType, dietTypes,
    handleSearch, patientDietData, setPatientDietData,
    ipNumber, setIpNumber, setshowPatientFlag,
    feedingTime, setfeedingTime, eatingTimes,
    orderStatus, setorderStatus, orderStatusList,
    setActiveButton
  });



  // if (loadingtemplate) return 

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '90vh',
        overflowY: 'auto',
        boxShadow: 'md',
        // Hide scrollbar for Chrome, Safari
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        // Hide scrollbar for Firefox
        scrollbarWidth: 'none',
        // Hide scrollbar for IE/Edge
        msOverflowStyle: 'none',
        position: 'relative'
      }}
    >

      {/* rohith */}
      <DashboardCard
        icon={LocalDiningIcon}
        title="Diet Plan"
        onClose={handleClose}
      >
        {
          loadingtemplate
          &&
          <CustomeIncidentLoading
            text={"Fetching Diet Detail Please Wait!"}
          />
        }
        {deitPlanFlag === 1 ?
          <DietPlan
            open={deitPlanOpen}
            template={templatedetail}
            setOpen={setDeitPlanOpen}
            selectedPatientData={selectedPatientData}
            FetchPatientDietPlan={FetchPatientDietPlan}
          />
          : null}

        <Box sx={{
          flex: 1,
          borderBottom: "1px solid #C5C5C5",
          p: .5,
          position: "sticky",
          top: 0,
          zIndex: 9,
          bgcolor: "#fff", // prevents overlap transparency

        }}>
          <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
            <Box sx={{ color: taskColor.DarkViolet, fontWeight: 500 }}>
              Payward H
            </Box>

            {/* unwanted part */}
            <Box sx={{
              color: taskColor.DarkViolet,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: 12,
              fontWeight: 500,
              flex: 1
            }}>
              - <NotificationsActiveIcon />
              {currentFeed
                ? `${currentFeed.name} (${currentFeed.from} - ${currentFeed.to})`
                : "No Current Feed"}
            </Box>


            <Box sx={{ display: 'flex', gap: .5 }}>
              {buttonConfig?.map(btn => (
                <Tooltip key={btn.key} title={btn.title} placement="top">
                  <Box ref={btn.ref || null}>
                    <ToggleSquareButton
                      icon={btn.icon}
                      color={btn.color}
                      selected={activeButton === btn.key}
                      onClick={() =>
                        btn.toggle
                          ? setActiveButton(activeButton === btn.key ? "" : btn.key)
                          : setActiveButton(btn.key)
                      }
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>

          </Box>
        </Box>


        <Box sx={{ flex: 1, minHeight: '75vh', overflow: 'auto', m: 1 }}>

          {panelConfig?.map(panel => (
            <FloatingPanel
              key={panel.key}
              open={activeButton === panel.key}
              onClose={panel.onClose}
              title={panel.title}
            >
              {panel?.content}
            </FloatingPanel>
          ))}

          {activeButton === "notMarked" ? (
            <DietView
              title={"Not Planned"}
              titleColor={"Darkred"}
              statusColor="red"
              borderLeftColor={"4px solid darkred"}
              bgColor="#fdecea"
              status="Not Planned"
              tileBorder={"2px solid darkred"}
              patients={notPlannedPatients}
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
                              {
                                notPlannedPatients?.length > 0 &&
                                <AutoScaleSection
                                  title="Not Planned"
                                  titleColor="Black"
                                  bg="#fef0f0"
                                >
                                  {

                                    notPlannedPatients?.map((item) => (
                                      <DietTileNotPlanned
                                        item={item}
                                        key={item.pt_no}
                                        status="Not Planned"
                                        onClick={() => onTileClick(item)}
                                        image={getDietImage(item)}
                                      />
                                    ))}
                                </AutoScaleSection>
                              }

                              {
                                plannedPatients?.length > 0 &&
                                <AutoScaleSection
                                  title="Planned Diet"
                                  titleColor="black"
                                  bg="#e7e7ee"
                                >
                                  {
                                    plannedPatients?.map((patient) => (
                                      <CurrenttimeFeedTile
                                        key={patient.pt_no}
                                        patient={patient}
                                        onClick={() => onTileClick(patient)}
                                        image={getDietImage(patient)}
                                      />
                                    ))}
                                </AutoScaleSection>
                              }

                              {
                                notUnderDeitplaning?.length > 0 &&
                                <AutoScaleSection
                                  title="Not Under Diet"
                                  titleColor="black"
                                  bg="#e7e7ee"
                                >
                                  {
                                    notUnderDeitplaning?.map((item) => (
                                      <DietTile
                                        key={item.pt_no}
                                        item={item}
                                        status="Not Under Diet"
                                        bordercolor="2px solid black"
                                        image={getDietImage(item)}
                                      />
                                    ))}
                                </AutoScaleSection>
                              }

                            </Box>

                          )}

        </Box >
      </DashboardCard >
    </Box >
  )
}
export default InPatientList

