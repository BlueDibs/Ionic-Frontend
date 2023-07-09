import {
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { searchUsername } from "./search.api";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Loader,
  Paper,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { config } from "../../config";
import { queryClient } from "../../utils/queryClient";
import { useHistory } from "react-router";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";

export function Search() {
  const history = useHistory();
  const [search, setSearchQuery] = useState("");
  const [isPopoverOpened, setPopoverOpened] = useState(false);
  const [debounced] = useDebouncedValue(search, 200);

  const searchQuery = useQuery({
    queryKey: ["search"],
    queryFn: () => searchUsername(debounced ?? ""),
    refetchOnWindowFocus: false,
    enabled: false,
    placeholderData: [],
  });

  useEffect(() => {
    if (search?.length) {
      searchQuery.refetch();
    } else {
      queryClient.setQueryData(["search"], () => []);
    }
  }, [debounced]);

  useEffect(() => {
    if (queryClient.getQueriesData(["search"])) {
      queryClient.setQueryData(["search"], () => []);
    }

    setPopoverOpened(true);
  }, [history.location]);

  return (
    <IonPage style={{ display: "block", innerHeight: "calc(100% - 50px)" }}>
      <Popover
        withinPortal
        withArrow
        styles={{ dropdown: { width: "90vw !important" } }}
        opened={isPopoverOpened && !!search.length}
        onClose={() => setPopoverOpened(false)}
      >
        <Popover.Target>
          <IonSearchbar
            animated={true}
            onIonInput={(event) => {
              setSearchQuery(event.target.value ?? "");
              event.target.value && setPopoverOpened(true);
            }}
            value={search}
            placeholder="username"
            onIonFocus={() => setPopoverOpened(true)}
            onIonBlur={() => setPopoverOpened(false)}
          ></IonSearchbar>
        </Popover.Target>

        <Popover.Dropdown>
          {searchQuery.isFetching && <Loader m={10} />}

          {!searchQuery.data.length && !searchQuery.isFetching && (
            <Text size="sm" color="dimmed">
              No results found
            </Text>
          )}

          <ScrollArea.Autosize type="always" style={{ maxHeight: "30vh" }}>
            <IonList>
              {Array.isArray(searchQuery.data) &&
                searchQuery.data.map((user) => (
                  <IonItem
                    onClick={() => {
                      setPopoverOpened(false);
                      setSearchQuery("");

                      history.push(`/app/user/${user.id}`);
                    }}
                  >
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
          </ScrollArea.Autosize>
        </Popover.Dropdown>
      </Popover>

      <Box pt="xl" style={{ height: "calc(100% - 60px) " }}>
        <Box px={"md"} mb={"xl"}>
          <Title order={3} mb={"sm"}>
            You May Like
          </Title>
        </Box>

        <ScrollArea style={{ height: "calc(100% - 55px)" }}>
          <Stack spacing={"xs"} px={"md"}>
            <Flex
              align={"center"}
              sx={(theme) => ({
                background: theme.colors.gray[1],
                borderRadius: theme.radius.md,
                padding: 4,
              })}
            >
              <Avatar
                style={{ marginRight: 10, borderRadius: "50%" }}
                src={null}
              />

              <Title order={5}>User Name</Title>
            </Flex>
          </Stack>
        </ScrollArea>
      </Box>
    </IonPage>
  );
}
