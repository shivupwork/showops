"use client"
import Image from "next/image";
import "./page.css";
import CustomCallOut from "../components/common/CustomCallOut";
import { Box, Flex, Grid, Heading, Section, Select, Text, TextField, Button } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import { CalendarIcon, ClockIcon, Cross2Icon, GlobeIcon, InfoCircledIcon, Link2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useReducer, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePicker } from "../components/CustomDatePicker";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import ToastComponent from "../components/common/ToasterComponent";


export default function CreateEvent() {
  const [startDate, setStartDate] = React.useState(null);
  const [endTime, setEndTime] = React.useState("End Time");
  const [startTime, setStartTime] = React.useState("Start Time");
  const [timeZone, setTimeZone] = React.useState("Time Zone");
  const [description, setDescription] = React.useState("");
  const [videoLink, setVideoLink] = React.useState("");
  const [eventName, setEventName] = React.useState("");
  const [isStartDateOpen, setIsStartDateOpen] = React.useState(false);
  const [errorsObj, setErrors] = React.useState(Array<{}>);
  const formRef = useRef(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [update, dispatch] = useReducer((state: any, action: any) => {
    return action * state;
  }, 1);
  const setCustomError = async (error: any, type: string = 'add') => {
    const indexOf = errorsObj.indexOf(error);
    if (indexOf !== -1) {
      if (type === 'remove') {
        errorsObj.splice(indexOf, 1);
      }
    } else {
      if (type === 'add') {
        errorsObj.push(error);
      }
    }
  }
  const onSubmitForm = () => {
    setTimeout(() => { dispatch(2); }, 300)
  }
  return (
    <div>
      <Box maxWidth={"570px"}>
        {errorsObj?.length > 0 &&
          <CustomCallOut color="red" icon={<InfoCircledIcon />}>Missing {errorsObj?.join(", ")}</CustomCallOut>
        }
        <div className="section-head">
          <Heading mb={"4"} size={"6"}>Create Event {eventName}</Heading>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</Text>
        </div>
        <Form.Root className="CreateEvent">
          <Form.Field className="FormField" name="event_name">
            <div className="labelContainer">
              <Form.Label className="FormLabel">Event Name</Form.Label>
            </div>
            <Form.ValidityState name="event_name">
              {(validity) => {
                if (validity?.valueMissing) {
                  setCustomError('event name', 'add')
                } else {
                  setCustomError('event name', 'remove')
                }
                return <Form.Control asChild>
                  <input onInput={(event: any) => { setEventName(event?.target?.value); }} className="Input" type="text" required placeholder="Your event name" />
                </Form.Control>
              }}
            </Form.ValidityState>
          </Form.Field>
          <div>
            <div className="labelContainer">
              <label className="FormLabel">Date & Time</label>
            </div>
            <Grid className="form-grid-container" columns={{ md: "2", xs: "1" }} gap={"3"} rows="repeat(2, auto)" width={"auto"}>
              <Form.Field className="FormField" name="start_date">
                <div className="custom-input-wrapper custom-datepicker">
                  <CalendarIcon></CalendarIcon>
                  <DatePicker minDate={new Date()} placeholderText="Select Date..." selected={startDate} onChange={(date: any) => setStartDate(date)} />
                </div>
              </Form.Field>
              <Form.Field className="FormField" name="time_zone">
                <Form.Control required asChild>
                  <Select.Root required size="3" defaultValue={timeZone} onValueChange={(value) => { setTimeZone(value) }}>
                    <Select.Trigger className="trigger-select">
                      <Flex as="span" align="center" gap="2">
                        <GlobeIcon />
                        {timeZone}
                      </Flex>
                    </Select.Trigger>
                    <Select.Content style={{ marginTop: '3rem' }}>
                      <Select.Item value="Eastern">Eastern</Select.Item>
                      <Select.Item value="Central">Central</Select.Item>
                      <Select.Item value="Mountain">Mountain</Select.Item>
                      <Select.Item value="Pacific">Pacific</Select.Item>
                      <Select.Item value="Alaskan">Alaskan</Select.Item>
                      <Select.Item value="Hawaiian">Hawaiian</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="start_name">
                <Form.Control asChild>
                  <Select.Root size="3" defaultValue={startTime} onValueChange={(value) => { setStartTime(value) }} required>
                    <Select.Trigger onChange={(date: any) => setStartDate(date)} className="trigger-select" onClick={() => { (isStartDateOpen) ? setIsStartDateOpen(false) : setIsStartDateOpen(true) }}>
                      <Flex as="span" align="center" gap="2">
                        <ClockIcon />
                        {startTime}
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="12:00">12:00 PM</Select.Item>
                      <Select.Item value="12:30">12:30 PM</Select.Item>
                      <Select.Item value="13:00">01:00 PM</Select.Item>
                      <Select.Item value="13:30">01:30 PM</Select.Item>
                      <Select.Item value="14:00">02:00 PM</Select.Item>
                      <Select.Item value="14:30">02:30 PM</Select.Item>
                      <Select.Item value="15:00">03:00 PM</Select.Item>
                      <Select.Item value="15:30">03:30 PM</Select.Item>
                      <Select.Item value="16:00">04:00 PM</Select.Item>
                      <Select.Item value="16:30">04:30 PM</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="end_time">
                <Form.Control asChild>
                  <Select.Root name="end_time" size="3" defaultValue={endTime} onValueChange={(value) => { setEndTime(value) }} required>
                    <Select.Trigger className="trigger-select">
                      <Flex as="span" align="center" gap="2">
                        <ClockIcon />
                        {endTime}
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="12:00">12:00 PM</Select.Item>
                      <Select.Item value="12:30">12:30 PM</Select.Item>
                      <Select.Item value="13:00">01:00 PM</Select.Item>
                      <Select.Item value="13:30">01:30 PM</Select.Item>
                      <Select.Item value="14:00">02:00 PM</Select.Item>
                      <Select.Item value="14:30">02:30 PM</Select.Item>
                      <Select.Item value="15:00">03:00 PM</Select.Item>
                      <Select.Item value="15:30">03:30 PM</Select.Item>
                      <Select.Item value="16:00">04:00 PM</Select.Item>
                      <Select.Item value="16:30">04:30 PM</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Form.Control>
              </Form.Field>
            </Grid>
          </div>

          <Form.Field className="FormField" name="description">
            <div className="labelContainer">
              <Form.Label className="FormLabel">Description</Form.Label>
            </div>
            <Form.ValidityState name="description">
              {(validity) => {
                if (validity?.valueMissing || validity?.tooShort) {
                  setCustomError('description', 'add')
                } else {
                  setCustomError('description', 'remove')
                }
                return <Form.Control asChild required>
                  <textarea ref={formRef} minLength={15} onInput={(event: any) => { setDescription(event?.target?.value); }} className="Input" required placeholder="Add event description..." />
                </Form.Control>
              }}
            </Form.ValidityState>

          </Form.Field>

          <Form.Field className="FormField" name="video_link">
            <div className="labelContainer">
              <Form.Label className="FormLabel">Video</Form.Label>
            </div>
            <div className="FormControlWrapper">
              <Link2Icon />
              <Form.ValidityState name="video_link">
                {(validity) => {
                  if (validity?.valueMissing || validity?.tooShort) {
                    setCustomError('video link', 'add')
                  } else {
                    setCustomError('video link', 'remove')
                  }
                  return <Form.Control asChild required>
                    <input onInput={(event: any) => { setVideoLink(event?.target?.value); }} className="Input" type="url" placeholder="Video Link..." />
                  </Form.Control>
                }}
              </Form.ValidityState>
            </div>
          </Form.Field>



          <Form.Field className="FormField" name="email">
            <div className="labelContainer">
              <Form.Label className="FormLabel">Banner Image</Form.Label>
            </div>
            <Form.Control asChild>
              <div className="custom-upload">
                <div className="btn-upload">
                  <label><input type="file" name="" id="banner-image" accept="image/*,.pdf" />
                    <div><Text>Click to upload</Text> or drag and drop<br />
                      SVG, PNG, JPG or GIF (Recommended size 1024x1024)</div>
                  </label>
                </div>
              </div>
            </Form.Control>
          </Form.Field>


          <Form.Submit className="FormSubmit btn" type="submit" onClick={onSubmitForm}>
            Create Event
          </Form.Submit>
          <Form.Submit className="FormCancel btn btn-link" type="reset" onClick={() => { setOpenDialog(true) }}>Cancel</Form.Submit>
        </Form.Root>
      </Box>
      <AlertDialog.Root open={openDialog} onOpenChange={(e) => { setOpenDialog(e) }}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="AlertDialogTitle">Delete Event</AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              You are about to permanently delete this event. This action can't be undone
            </AlertDialog.Description>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'flex-end' }}>
              <AlertDialog.Cancel asChild>
                <button className="Button mauve btn">Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="Button red btn btn-danger">Delete</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <ToastComponent />

    </div>
  );
}