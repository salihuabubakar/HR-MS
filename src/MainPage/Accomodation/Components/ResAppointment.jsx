import React, { useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import "./calendar.css"
import { useResidentAppointmentFetching, useResidentFetching } from '../../../utils/employeeCustomFetchHook';
import moment from "moment";
import { Popup, Segment  } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const ResAppointment = ({ 
  houseId,
  houseResidentData
}) => {
  const { residentAppointmentData } = useResidentAppointmentFetching();
  const { residentData } = useResidentFetching();
  let resID = [];
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    photo: "",
    description: "",
    time: ""
  })

  console.log("selectedEvent", selectedEvent);

  const houseRes = houseResidentData?.filter(residents => {
    if(residents.house === houseId && residents.status === "Active") {
      return resID.push(residents.resident);
    }
  })

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const houseResApp = residentAppointmentData?.filter(h => resID.includes(h.resident))

    const formattedEvents = houseResApp?.map((evt) => {
      const { 
        id, 
        resident, 
        appointment_name, 
        appointment_date, 
        appointment_time,
        appointment_description
      } = evt;

      const matchedResident = residentData?.find(res => res.id === resident);
      const residentFullName = `${matchedResident?.first_name} ${matchedResident?.middle_name} ${matchedResident?.last_name}`
      const residentPhoto = `${matchedResident?.photo}`

      return (
        {
          id: id,
          resident: {
            name : residentFullName,
            photo: residentPhoto,
          },
          title: appointment_name,
          start: `${appointment_date}T${appointment_time}`,
          description: appointment_description,
          className: 'bg-primary',
        }
      )
    });

    setEventData(formattedEvents);
  }, [houseId, houseResidentData]);

  const handleEventClick = clickInfo => {
    const name = clickInfo.event.extendedProps.resident.name;
    const photo = clickInfo.event.extendedProps.resident.photo;
    const description = clickInfo.event.extendedProps.description;
    const time = moment(clickInfo.event.start, "HH:mm").format("hh:mm A")
    setSelectedEvent({
      name: name,
      photo: photo,
      description: description,
      time: time
    })
  };

  const CustomEventContent = ({ event }) => {
    const name = event.extendedProps.resident.name;
    const photo = event.extendedProps.resident.photo;
    const description = event.extendedProps.description;
    const time = moment(event.start, "HH:mm").format("hh:mm A")
    return (
      <Popup
        inline
        hoverable
        position="bottom left"
        delay={{
          show: 300,
          hide: 800,
        }}
        content={
          <Segment.Group>
                <Segment style={{ width: "250px" }}>
                  <div className="ui column relaxed divided grid">
                    <div className="column">
                      <h4>{event.title}</h4>
                      <div className="ui link list">
                        <a className="item">
                          <h2 className="table-avatar">
                            <Link
                              to="#"
                              onClick={(e) => e.preventDefault()}
                              className="avatar"
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#00000000",
                                height: "100%",
                              }}
                            >
                              <img
                                style={{ width: "40px", height: "40px" }}
                                alt="resident_photo"
                                src={photo}
                                title={name} 
                              />
                            </Link>
                          </h2>
                        </a>
                        <a className="item">{`Time: ${time}`}</a>
                        <a className="item">{`Des: ${description}`}</a>
                      </div>
                    </div>
                  </div>
                </Segment>
          </Segment.Group>
        }
        trigger={
            <div>
              <span className='event-time'>{time}</span>
              <img className='event-img' src={photo} alt='resident_photo' title={name} />
              <span className='event-title'>{event.title}</span>
            </div>
        }
      />
    )
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear',
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={eventData}
        eventClick={handleEventClick}
        eventContent={CustomEventContent}
      />
    </>
  )
}
export default ResAppointment;
