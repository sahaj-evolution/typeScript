import { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from "./models/reminder"
import ReminderService from "./services/reminder"
import AddReminder from './components/AddReminder';
import Loader from './components/Loader';

function App() {

  const [reminder,setReminder] = useState<Reminder[]>([]);
  const [isLoading,setIsLoading] = useState<Boolean>(false);
  
  useEffect(() => {
    getToDoList();
  },[])

  const getToDoList = async () => {
    const response = await ReminderService.getReminders();
    setReminder(response);
  }

  const deleteReminder = (id:number) => {
    setIsLoading(true);
    setReminder(reminder.filter(item => item.id !== id));
    setIsLoading(false);
  }

  const addReminder = async (title:string) => {
    setIsLoading(true);
    const response = await ReminderService.addReminders(title);
    setReminder([response,...reminder])
    setIsLoading(false);
  }

  return (
    <>
    {isLoading &&  <Loader/>}
    <div className="App">
        <h2 className='text-center'>My Reminder</h2>
        <AddReminder onAddReminder={addReminder} />
        <ReminderList items={reminder} onRemoveReminder={deleteReminder}/>
    </div>
    </>
  );
}

export default App;
