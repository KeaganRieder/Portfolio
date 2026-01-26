import { useState, useEffect } from 'react';

import '../../styles/desktop/Desktop.css';



const TaskBar: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {

            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <div id='taskbar' className='taskbar'>

                <section id='taskbar-shortcuts' className='taskbar-shortcuts-container'>
                    
                </section>

                <section className='clock'>
                    <div className='time'>{formatTime(currentTime)}</div>
                    <div className='date'>{formatDate(currentTime)}</div>
                </section>


            </div>
        </>
    )
}

export default TaskBar
