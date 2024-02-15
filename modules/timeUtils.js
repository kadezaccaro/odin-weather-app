export function getTimeAndStartClock(timeZone) {
  const clock = document.querySelector(".clock");

  const updateClock = () => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
    });

    clock.textContent = currentTime;
  };

  setInterval(updateClock, 1000);
  updateClock(); // Update the clock immediately upon function call
}

export function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00Z");
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };

  return date.toLocaleDateString("en-US", options);
}
