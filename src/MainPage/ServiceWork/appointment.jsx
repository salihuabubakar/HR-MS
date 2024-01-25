import React, { useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import "./calendar.css"
import moment from "moment";
import { Popup, Segment  } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const Appointment = ({ 
  appData, 
  selectedResidentId, 
  handleEditResidentAppointment,
}) => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const filteredEvents = appData
    ?.map((evt, index) => {
      const { resident, id, appointment_name, appointment_date, appointment_time, appointment_description } = evt;
      if (resident === selectedResidentId) {
        return {
          id,
          index,
          appointment_date,
          appointment_name,
          appointment_time,
          appointment_description
        };
      }
      return null;
    })
    .filter((item) => item !== null);

    const formattedEvents = filteredEvents?.map((evt) => ({
      id: evt.id,
      index: evt.index,
      title: evt.appointment_name,
      start: `${evt.appointment_date}T${evt.appointment_time}`,
      description: evt.appointment_description,
      className: 'bg-primary',
    }));

    setEventData(formattedEvents);
  }, [appData, selectedResidentId]);

  const handleEventClick = clickInfo => {
    const clickedEventId = clickInfo.event.id;
    const clickedEventIndex = clickInfo.event.extendedProps.index;
    handleEditResidentAppointment(clickedEventId, clickedEventIndex)

  };

  const CustomEventContent = ({ event }) => {
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
              <span className='event-time-resident'>{time}</span>
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
export default Appointment;
