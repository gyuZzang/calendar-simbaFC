import { format } from "date-fns";
import {
  Cell,
  ScheduleItem,
  Time,
  ScheduleTitle,
  ScheduleDescription,
} from "./styles";
import { DayCellProps } from "./types";

const DayCell = ({
  date,
  isCurrentMonth,
  hasSchedule,
  schedules,
  onDateClick,
}: DayCellProps) => {
  const sortedSchedules = schedules?.sort((a, b) => {
    if (a.type === "birthday") return -1;
    if (a.time < b.time) return -1;
    return 0;
  });

  return (
    <Cell
      isCurrentMonth={isCurrentMonth}
      hasSchedule={hasSchedule}
      onClick={() => onDateClick?.(date)}
    >
      <span className="chonburi">{format(date, "d")}</span>
      {sortedSchedules?.map((schedule, index) => (
        <ScheduleItem key={index}>
          {schedule.type !== "birthday" && <Time>{schedule.time}</Time>}
          <ScheduleTitle $isBirthday={schedule.type === "birthday"}>
            {schedule.title}
          </ScheduleTitle>
          {schedule.description && (
            <ScheduleDescription>{schedule.description}</ScheduleDescription>
          )}
        </ScheduleItem>
      ))}
    </Cell>
  );
};

export default DayCell;
