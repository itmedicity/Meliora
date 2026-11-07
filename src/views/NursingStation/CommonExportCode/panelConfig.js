// panelConfig.js
import React from "react"
import DietFeedtimeComponent from "src/views/Diet/DeitCommonComponents/DietFeedtimeComponent"
import DeitFindPatientFloat from "src/views/Diet/DeitCommonComponents/DietFindPatientFloat"
import DeitMastComponent from "src/views/Diet/DeitCommonComponents/DietMastComponent"
import DietOrderStatus from "src/views/Diet/DeitCommonComponents/DietOrderStatus"


// panelConfig.js
export const getPanelConfig = (ctx) => [
    {
        key: "dietType",
        title: "Diet Type",
        content: (
            <DeitMastComponent
                dietType={ctx.dietType}
                dietTypes={ctx.dietTypes}
                setDietType={(val) => ctx.setDietType(Number(val))}
            />
        ),
        onClose: () => {
            ctx.setDietType("")
            ctx.setActiveButton("allList")
        }
    },
    {
        key: "findPatient",
        title: "IP Number",
        content: (
            <DeitFindPatientFloat
                handleSearch={ctx.handleSearch}
                patientDietData={ctx.patientDietData}
                setPatientDietData={ctx.setPatientDietData}
                setIpNumber={ctx.setIpNumber}
                ipNumber={ctx.ipNumber}
            />
        ),
        onClose: () => {
            ctx.setActiveButton("allList")
            ctx.setIpNumber("")
            ctx.setshowPatientFlag(0)
        }
    },
    {
        key: "foodTime",
        title: "Food Time",
        content: (
            <DietFeedtimeComponent
                feedingTime={ctx.feedingTime}
                eatingTimes={ctx.eatingTimes}
                setfeedingTime={(val) => ctx.setfeedingTime(Number(val))}
            />
        ),
        onClose: () => {
            ctx.setfeedingTime("")
            ctx.setActiveButton("allList")
        }
    },
    {
        key: "orderStatus",
        title: "Order Status",
        content: (
            <DietOrderStatus
                orderStatus={ctx.orderStatus}
                orderStatusList={ctx.orderStatusList}
                setorderStatus={(val) => ctx.setorderStatus(Number(val))}
            />
        ),
        onClose: () => {
            ctx.setDietType("")
            ctx.setActiveButton("allList")
        }
    }
]