import {
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { searchUsername } from "./search.api";
import { useEffect, useRef, useState } from "react";
import { Avatar, Loader } from "@mantine/core";
import { config } from "../../config";
import { queryClient } from "../../utils/queryClient";
import { useHistory } from "react-router";
import { useDebouncedState } from "@mantine/hooks";

export function Search() {
  const history = useHistory();
  const [search, setSearchQuery] = useState("");

  const searchQuery = useQuery({
    queryKey: ["search"],
    queryFn: () => searchUsername(search ?? ""),
    refetchOnWindowFocus: false,
    enabled: false,
    placeholderData: [],
  });

  useEffect(() => {
    if (search?.length) {
      searchQuery.refetch();
    } else {
      queryClient.setQueryData(["search"], []);
    }
  }, [search]);

  useEffect(() => {
    if (queryClient.getQueriesData(["search"])) {
      queryClient.setQueryData(["search"], []);
    }
  }, [history.location]);

  return (
    <IonPage style={{ display: "block" }}>
      <IonSearchbar
        debounce={200}
        onIonClear={() => queryClient.setQueryData(["search"], [])}
        onIonChange={(ev) => {
          searchQuery.refetch();
        }}
        animated={true}
        onIonInput={(event) => setSearchQuery(event.target.value ?? "")}
        placeholder="username"
      ></IonSearchbar>

      {searchQuery.isFetched && <Loader my="md" />}

      <IonList>
        {Array.isArray(searchQuery.data) &&
          searchQuery.data.map((user) => (
            <IonItem onClick={() => history.push(`/app/user/${user.id}`)}>
              <Avatar
                style={{ marginRight: 10, borderRadius: "50%" }}
                src={
                  user.avatarPath
                    ? `${config.STATIC_FILE_BASE_URL}${user.avatarPath}?alt=media`
                    : null
                }
              />
              <IonLabel>{user.username}</IonLabel>
            </IonItem>
          ))}
      </IonList>
    </IonPage>
  );
}
