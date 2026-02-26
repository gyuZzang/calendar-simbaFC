import { useState, type FC } from "react";
import { format } from "date-fns";
import { Schedule } from "../DayCell/types";
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
      time: "12:00",
      title: "",
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
    } else if (editingIndex !== null) {
      updateSchedule(currentDateStr, editingIndex, editingSchedule);
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
              <ScheduleItem key={index}>
                {editingIndex === index ? (
                  <EditForm>
                    <Input
                      type="time"
                      value={editingSchedule?.time}
                      onChange={(e) =>
                        setEditingSchedule((prev) =>
                          prev ? { ...prev, time: e.target.value } : prev
                        )
                      }
                    />
                    <Select
                      value={editingSchedule?.type}
                      onChange={(e) =>
                        setEditingSchedule((prev) =>
                          prev
                            ? {
                                ...prev,
                                type: e.target.value as "training" | "match",
                              }
                            : prev
                        )
                      }
                    >
                      <option value="training">Training</option>
                      <option value="match">Match</option>
                    </Select>
                    <Input
                      value={editingSchedule?.title}
                      onChange={(e) =>
                        setEditingSchedule((prev) =>
                          prev ? { ...prev, title: e.target.value } : prev
                        )
                      }
                      placeholder="Schedule title"
                    />
                    <Input
                      value={editingSchedule?.description || ""}
                      onChange={(e) =>
                        setEditingSchedule((prev) =>
                          prev ? { ...prev, description: e.target.value } : prev
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
                      <Time>{schedule.time}</Time>
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
                        onClick={() => deleteSchedule(currentDateStr, index)}
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
              <Input
                type="time"
                value={editingSchedule?.time}
                onChange={(e) =>
                  setEditingSchedule((prev) =>
                    prev ? { ...prev, time: e.target.value } : prev
                  )
                }
              />
              <Select
                value={editingSchedule?.type}
                onChange={(e) =>
                  setEditingSchedule((prev) =>
                    prev
                      ? {
                          ...prev,
                          type: e.target.value as "training" | "match",
                        }
                      : prev
                  )
                }
              >
                <option value="training">Training</option>
                <option value="match">Match</option>
              </Select>
              <Input
                value={editingSchedule?.title}
                onChange={(e) =>
                  setEditingSchedule((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
                placeholder="Schedule title"
              />
              <Input
                value={editingSchedule?.description || ""}
                onChange={(e) =>
                  setEditingSchedule((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev
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
