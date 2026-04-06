import { useState, type FC } from "react";
import { format } from "date-fns";
import { Schedule, ScheduleType } from "../DayCell/types";
import {
  EditorContainer,
  DateTitle,
  ScheduleList,
  ScheduleItem,
  Time,
  Title,
  Description,
  NoSchedule,
  EditForm,
  Input,
  Select,
  ButtonGroup,
  ScheduleContent,
  AddButton,
  HeaderContainer,
  AddButtonContainer,
  IconButton,
} from "./styles";
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from "react-icons/fi";
import { useCurrentDate } from "../../contexts/CurrentDateContext";
import { useSchedules } from "../../contexts/SchedulesContext";

const scheduleTypes: Record<
  ScheduleType,
  {
    label: string;
    placeholder: { title: string; time?: string; description?: string };
  }
> = {
  training: {
    label: "훈련",
    placeholder: { title: "정기 훈련", time: "14:00" },
  },
  match: {
    label: "매치",
    placeholder: { title: "친선 매치", time: "14:00", description: "w/ " },
  },
  birthday: {
    label: "생일",
    placeholder: { title: "생일 🎂", description: "" },
  },
  other: {
    label: "기타",
    placeholder: { title: "", time: "14:00" },
  },
} as const;

const ScheduleEditor: FC = () => {
  const { currentDate } = useCurrentDate();
  const { schedules, addSchedule, updateSchedule, deleteSchedule } =
    useSchedules();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const currentDateStr = format(currentDate, "yyyy-MM-dd");
  const daySchedules = schedules[currentDateStr] || [];

  const handleEdit = (schedule: Schedule, index: number) => {
    setEditingIndex(index);
    setEditingSchedule(schedule);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingSchedule({
      id: crypto.randomUUID(),
      time: "14:00",
      title: "정기 훈련",
      type: "training",
      month: format(currentDate, "yyyy-MM"),
      date: currentDateStr,
    });
  };

  const handleSave = () => {
    if (!editingSchedule) return;

    if (isAdding) {
      addSchedule(currentDateStr, editingSchedule);
      setIsAdding(false);
    } else if (editingIndex !== null && editingSchedule.id) {
      updateSchedule(currentDateStr, editingSchedule.id, editingSchedule);
      setEditingIndex(null);
    }
    setEditingSchedule(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingSchedule(null);
    setIsAdding(false);
  };

  return (
    <EditorContainer>
      <HeaderContainer>
        <DateTitle>{format(currentDate, "yyyy년 MM월 dd일")}</DateTitle>
      </HeaderContainer>
      <ScheduleList>
        {daySchedules.length > 0
          ? daySchedules.map((schedule, index) => (
              <ScheduleItem key={schedule.id ?? index}>
                {editingIndex === index ? (
                  <EditForm>
                    <Select
                      value={editingSchedule?.type}
                      onChange={(e) => {
                        const nextType = e.target.value as ScheduleType;
                        setEditingSchedule((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            type: nextType,
                            ...scheduleTypes[nextType].placeholder,
                          };
                        });
                      }}
                    >
                      {Object.keys(scheduleTypes).map((type) => (
                        <option key={type} value={type}>
                          {scheduleTypes[type as ScheduleType].label}
                        </option>
                      ))}
                    </Select>
                    {editingSchedule?.type !== "birthday" && (
                      <Input
                        type="time"
                        value={editingSchedule?.time ?? ""}
                        onChange={(e) =>
                          setEditingSchedule((prev) =>
                            prev ? { ...prev, time: e.target.value } : prev,
                          )
                        }
                      />
                    )}
                    <Input
                      value={editingSchedule?.title}
                      onChange={(e) =>
                        setEditingSchedule((prev) =>
                          prev ? { ...prev, title: e.target.value } : prev,
                        )
                      }
                      placeholder="Schedule title"
                    />
                    <Input
                      value={editingSchedule?.description || ""}
                      onChange={(e) =>
                        setEditingSchedule((prev) =>
                          prev
                            ? { ...prev, description: e.target.value }
                            : prev,
                        )
                      }
                      placeholder="Description (optional)"
                    />
                    <ButtonGroup>
                      <IconButton onClick={handleCancel}>
                        <FiX size={18} />
                      </IconButton>
                      <IconButton success onClick={handleSave}>
                        <FiCheck size={18} />
                      </IconButton>
                    </ButtonGroup>
                  </EditForm>
                ) : (
                  <>
                    <ScheduleContent>
                      {schedule.type !== "birthday" && (
                        <Time>{schedule.time}</Time>
                      )}
                      <Title>{schedule.title}</Title>
                      {schedule.description && (
                        <Description>{schedule.description}</Description>
                      )}
                    </ScheduleContent>
                    <ButtonGroup>
                      <IconButton onClick={() => handleEdit(schedule, index)}>
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        danger
                        onClick={() =>
                          schedule.id &&
                          deleteSchedule(currentDateStr, schedule.id)
                        }
                      >
                        <FiTrash2 size={18} />
                      </IconButton>
                    </ButtonGroup>
                  </>
                )}
              </ScheduleItem>
            ))
          : !isAdding && <NoSchedule>No schedules for this day</NoSchedule>}
        {isAdding ? (
          <ScheduleItem>
            <EditForm>
              <Select
                value={editingSchedule?.type}
                onChange={(e) => {
                  const next = e.target.value as
                    | "training"
                    | "match"
                    | "birthday";
                  setEditingSchedule((prev) => {
                    if (!prev) return prev;
                    if (next === "birthday") {
                      return { ...prev, type: next, time: "" };
                    }
                    return {
                      ...prev,
                      type: next,
                      time:
                        prev.type === "birthday" && !prev.time
                          ? "12:00"
                          : prev.time,
                    };
                  });
                }}
              >
                <option value="training">Training</option>
                <option value="match">Match</option>
                <option value="birthday">생일</option>
              </Select>
              {editingSchedule?.type !== "birthday" && (
                <Input
                  type="time"
                  value={editingSchedule?.time ?? ""}
                  onChange={(e) =>
                    setEditingSchedule((prev) =>
                      prev ? { ...prev, time: e.target.value } : prev,
                    )
                  }
                />
              )}
              <Input
                value={editingSchedule?.title}
                onChange={(e) =>
                  setEditingSchedule((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev,
                  )
                }
                placeholder="Schedule title"
              />
              <Input
                value={editingSchedule?.description || ""}
                onChange={(e) =>
                  setEditingSchedule((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev,
                  )
                }
                placeholder="Description (optional)"
              />
              <ButtonGroup>
                <IconButton onClick={handleCancel}>
                  <FiX size={18} />
                </IconButton>
                <IconButton success onClick={handleSave}>
                  <FiCheck size={18} />
                </IconButton>
              </ButtonGroup>
            </EditForm>
          </ScheduleItem>
        ) : (
          <AddButtonContainer>
            <AddButton onClick={handleAdd}>
              <FiPlus size={20} />
              Add New Schedule
            </AddButton>
          </AddButtonContainer>
        )}
      </ScheduleList>
    </EditorContainer>
  );
};

export default ScheduleEditor;
