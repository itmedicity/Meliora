import React, { memo, useState } from "react";
import { Table, Sheet } from "@mui/joy";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import '../IncidentStyles/IncidentStyle.css'

const IncidentReviewTable = ({ LevelActionReveiw, ActiveActions }) => {

    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowDoubleClick = (key) => {
        setExpandedRow(prev => (prev === key ? null : key));
    };


    return (
        <Sheet variant="outlined" sx={{ borderRadius: "sm", p: 2 }}>
            <Table
                variant="plain"
                borderAxis="xBetween"
                size="md"
                sx={{
                    "& th": { fontWeight: "bold", textAlign: "left" },
                    "& td": { verticalAlign: "top" },
                    tableLayout: "fixed",
                    width: "100%",
                }}
            >
                <colgroup>
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "65%" }} />
                </colgroup>

                <thead>
                    <tr>
                        <th>CATEGORY</th>
                        <th>EMPLOYEE</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(ActiveActions) &&
                        ActiveActions
                            ?.filter(item => item?.inc_action_name != 'RCA')
                            ?.map((item, index) => {
                                // Find matching rows
                                const rowItems = LevelActionReveiw?.filter(
                                    (val) => Number(val.inc_action_slno) === Number(item.inc_action_slno)
                                );

                                //  If no data  show one empty row
                                if (!rowItems || rowItems.length === 0) {
                                    return (
                                        <tr
                                            key={index}
                                            onDoubleClick={() => handleRowDoubleClick(index)}
                                            className={expandedRow === index ? "expanded-row" : "normal-row"}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>
                                                <b>{item.inc_action_name}</b>
                                                {/* <br />
                                            <b style={{
                                                fontWeight: 400,
                                                fontSize: 12,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <PersonPinCircleOutlinedIcon sx={{ fontSize: 12 }} />
                                                ( - )
                                            </b> */}
                                            </td>

                                            <td>
                                                <IncidentTextComponent
                                                    text="_"
                                                    size={14}
                                                    weight={600}
                                                    color="black"
                                                />
                                            </td>

                                            <td>
                                                <IncidentTextComponent
                                                    text="_"
                                                    size={13}
                                                    weight={400}
                                                    color="black"
                                                />
                                            </td>
                                        </tr>
                                    );
                                }

                                //  If data exists  render rows normally
                                return rowItems.map((row, idx) => (
                                    <tr
                                        key={`${index}-${idx}`}
                                        onDoubleClick={() => handleRowDoubleClick(`${index}-${idx}`)}
                                        className={expandedRow === `${index}-${idx}` ? "expanded-row" : "normal-row"}
                                        style={{ cursor: 'pointer' }}
                                    >

                                        <td>
                                            <b>{item.inc_action_name}</b>
                                            {/* <br />
                                        <b style={{
                                            fontWeight: 400,
                                            fontSize: 12,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <PersonPinCircleOutlinedIcon sx={{ fontSize: 12 }} />
                                            {` (${row?.em_name || "-"})`}
                                        </b> */}
                                        </td>

                                        <td>
                                            <b >{row?.em_name || "_"}</b>
                                        </td>

                                        <td>
                                            {row?.inc_action_review || "_"}
                                        </td>
                                    </tr>
                                ));
                            })}
                </tbody>
            </Table>
        </Sheet>
    );
};

export default memo(IncidentReviewTable);

