import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Schedule } from "../components/DayCell/types";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "schedules"));

    getDocs(q)
      .then((docs) => {
        setSchedules(
          docs.docs.map((docSnap) => {
            const data = docSnap.data() as Schedule;
            return { ...data, id: data.id ?? docSnap.id };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return { schedules, loading };
};

export const useUpdateSchedule = () => {
  const [loading, setLoading] = useState(false);

  const updateSchedule = async (id: string, schedule: Schedule) => {
    setLoading(true);
    try {
      const q = query(collection(db, "schedules"), where("id", "==", id));
      const docsSnap = await getDocs(q);

      if (!docsSnap.empty) {
        await setDoc(docsSnap.docs[0].ref, schedule);
      } else {
        await setDoc(doc(db, "schedules", id), schedule);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { updateSchedule, loading };
};

export const useAddSchedule = () => {
  const [loading, setLoading] = useState(false);

  const addSchedule = async (schedule: Schedule) => {
    setLoading(true);
    addDoc(collection(db, "schedules"), schedule).then(() => {
      setLoading(false);
    });
  };

  return { addSchedule, loading };
};

export const useDeleteSchedule = () => {
  const [loading, setLoading] = useState(false);

  const deleteSchedule = async (id: string) => {
    setLoading(true);
    try {
      const q = query(collection(db, "schedules"), where("id", "==", id));
      const docsSnap = await getDocs(q);

      if (!docsSnap.empty) {
        await deleteDoc(docsSnap.docs[0].ref);
      } else {
        await deleteDoc(doc(db, "schedules", id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteSchedule, loading };
};
