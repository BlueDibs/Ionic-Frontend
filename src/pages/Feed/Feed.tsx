import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getFeed } from "./feed.api";
import { Flex, LoadingOverlay, Text } from "@mantine/core";
import {
  chatbubbleEllipsesOutline,
  notifications,
  notificationsOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";

import Feeds from "../../components/Feeds";
import { setNotificationUnread } from "../../store/slice/notificationUnreadSlice";

export function Feed() {
  const history = useHistory();
  const user = useAppSelector((state) => state.user);
  const notificationUnrad = useAppSelector((state) => state.NotificationUnread);
  const distpatch = useAppDispatch();

  const getFeedQuery = useQuery({
    queryKey: ["feeds", user.id],
    queryFn: getFeed,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "2px 10px", "--background": "white" }}>
          <Flex justify={"space-between"} style={{ alignItems: "center" }}>
            <Text weight={800} mr={"auto"}>
              Logo
            </Text>
            <IonIcon
              icon={notificationUnrad ? notifications : notificationsOutline}
              onClick={() => {
                distpatch(setNotificationUnread(false));
                history.push("/app/notifications");
              }}
              style={{ fontSize: 25, marginLeft: "auto" }}
            ></IonIcon>
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              onClick={() => history.push("/app/chats")}
              style={{ fontSize: 25, marginLeft: 10 }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ position: "relative", height: "100%" }}>
          <LoadingOverlay visible={getFeedQuery.isLoading} />

          <Feeds feeds={getFeedQuery.data} />
        </div>
      </IonContent>
    </IonPage>
  );
}
