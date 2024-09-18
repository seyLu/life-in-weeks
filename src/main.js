const LIFESPAN = 89;
const WEEKS_IN_YEAR = 52;

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");

  for (let age = -1; age <= LIFESPAN; age++) {
    const row = document.createElement("div");
    row.classList.add("flex");

    const ageLabel = document.createElement("div");
    ageLabel.classList.add("mr-1", "w-4", "h-2", "text-xs", "text-right");
    if (age % 5 === 0) {
      ageLabel.innerText = age;
    }
    row.append(ageLabel);

    for (let week = 0; week < WEEKS_IN_YEAR; week++) {
      if (age === -1) {
        const weekLabel = document.createElement("div");
        weekLabel.classList.add(
          "mb-0",
          "w-2",
          "h-4",
          "m-[1px]",
          "text-xs",
          "text-right",
        );
        if (week % 5 === 0) {
          if (week === 0) {
            week += 1;
          }
          weekLabel.innerText = week;
        }
        row.append(weekLabel);
      } else {
        const box = document.createElement("div");
        box.classList.add(
          "w-2",
          "h-2",
          "m-[1px]",
          "border-solid",
          "border",
          "border-sky-500",
        );
        row.append(box);
      }
    }

    canvas.append(row);
  }
});
