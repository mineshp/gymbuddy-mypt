import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css'

export default function Timer() {
  const seconds = 60;
    // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      <h1 className={styles.timer}>{
          timeLeft > 0
        ? timeLeft
        : 'Times Up!'
    }</h1>
    </div>
  );
}