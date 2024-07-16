import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './ToasterComponent.css';

const ToastComponent = () => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="Button large violet"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);
        }}
      >
        Add to calendar
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Description asChild>
          <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            Event Created on {prettyDate(eventDateRef.current)}! <span className='green'>edit event</span>
          </time>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText='x'>
          <button className="Button small green">X</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

function oneWeekAway(date?:any) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date?:any) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
}

export default ToastComponent;
