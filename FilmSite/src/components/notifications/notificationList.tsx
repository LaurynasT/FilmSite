import NotificationItem from "./notificationItem";
import { useNotificationStore } from "../../store/errorStore";

export default function NotificationList() {
  const { list, remove } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      {list.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          remove={remove}
        />
      ))}
    </div>
  );
}