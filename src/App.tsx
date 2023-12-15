import { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from "./models/reminder"
import ReminderService from "./services/reminder"
import AddReminder from './components/AddReminder';
import Loader from './components/Loader';
import toast, { Toaster } from 'react-hot-toast'

function App() {

  const [reminder,setReminder] = useState<Reminder[]>([]);
  const [isLoading,setIsLoading] = useState<Boolean>(false);

  const notifyForDeleteReminder = () => toast.success('Your Reminder Is successfully deleted');
  const notifyForAddReminder = () => toast.success('Your Reminder Is successfully added');
  
  useEffect(() => {
    getToDoList();
  },[])

  const getToDoList = async () => {
    setIsLoading(true);
    const response = await ReminderService.getReminders();
    setReminder(response);
    setIsLoading(false);

  }

  const deleteReminder = (id:number) => {
    setIsLoading(true);
    setReminder(reminder.filter(item => item.id !== id));
    setIsLoading(false);
    notifyForDeleteReminder();
  }

  const addReminder = async (title:string) => {
    setIsLoading(true);
    const response = await ReminderService.addReminders(title);
    setReminder([response,...reminder])
    setIsLoading(false);
    notifyForAddReminder();
  }

  return (
    <>
    <Toaster />
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
