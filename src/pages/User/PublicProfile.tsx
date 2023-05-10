import {
  Avatar,
  Container,
  Flex,
  Text,
  Title,
  createStyles,
  Button,
  Image,
  SimpleGrid,
} from '@mantine/core';
import { useAppSelector } from '../../store/hooks';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { config } from '../../config';
import { IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { fetchUserDetails } from './api.user';
import { fetchPosts } from '../Profile/profile.api';
import { child, get, push, ref, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import CryptoJS from 'crypto-js';

const useStyles = createStyles((theme) => ({
  statusLeft: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: '10px 20px',
    borderEndStartRadius: 20,
    borderTopLeftRadius: 20,
  },
  statusSquare: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: '10px 20px',
    borderLeft: 0,
  },
  statusRight: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: '10px 20px',
    borderLeft: 0,
    borderTopRightRadius: 20,
    borderEndEndRadius: 20,
  },
}));

const Status = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className: any;
}) => (
  <Flex
    wrap={'wrap'}
    direction={'column'}
    justify={'center'}
    className={className}
  >
    <Text
      weight={400}
      size={'sm'}
      align="center"
      color="gray"
      style={{ lineHeight: 1 }}
    >
      {label}
    </Text>
    <Text weight={600} align="center" pt={'xs'} style={{ lineHeight: 0.8 }}>
      {value}
    </Text>
  </Flex>
);

export function PublicProfile() {
  const { classes } = useStyles();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.user);

  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserDetails(userId),
  });

  const fetchPostQry = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts(userQuery.data.id),
    refetchOnWindowFocus: false,
    placeholderData: [] as any,
    enabled: false,
  });

  const fetchRoomFromDorm = async (targetUserId: string) => {
    const dormURI: string = 'dorm/' + user.id + '/' + targetUserId;
    const targetUserDORMURI: string = 'dorm/' + targetUserId + '/' + user.id;

    const rawRoomId =
      user.id < targetUserId
        ? `${user.id}.${targetUserId}`
        : `${targetUserId}.${user.id}`;

    const roomId = CryptoJS.SHA256(rawRoomId).toString();
    console.log(rawRoomId, roomId);
    const userDorm = set(ref(database, dormURI), {
      roomId,
    });
    const targetUserDorm = set(ref(database, targetUserDORMURI), {
      roomId,
    });

    await Promise.all([userDorm, targetUserDorm]);

    history.push(`/app/chat/${roomId}`);
  };

  useEffect(() => {
    if (userQuery.data?.id) fetchPostQry.refetch();
  }, [userQuery.data]);

  if (!userId) return history.goBack();
  if (userQuery.isLoading) return <>Loading...</>;

  return (
    <IonPage style={{ display: 'block' }}>
      <Container p={'lg'}>
        <Flex direction={'column'} gap={'xs'} p={'sm'}>
          <Avatar
            src={
              userQuery.data.avatarPath
                ? `${config.STATIC_FILE_BASE_URL}${userQuery.data.avatarPath}?alt=media`
                : null
            }
            size="xl"
            radius="md"
            style={{ width: 100, height: 100 }}
            alt="it's me"
          />
          <Title order={4} weight={500}>
            {userQuery.data.username}
          </Title>

          <Text size={'sm'}>{userQuery.data.bio}</Text>
        </Flex>
        <Flex align={'center'} justify={'center'} mt={'sm'}>
          <Status
            label="Following"
            value={userQuery.data.followers || 0}
            className={classes.statusLeft}
          />

          <Status
            label="Following"
            value={userQuery.data.following || 0}
            className={classes.statusSquare}
          />
          <Status
            label="Posts"
            value={fetchPostQry.data.length || 0}
            className={classes.statusRight}
          />
        </Flex>
        <Flex gap={'lg'}>
          <Button
            w={'100%'}
            mt={'md'}
            variant="white"
            style={{ borderColor: 'black', color: 'black' }}
          >
            Follow
          </Button>
          <Button
            w={'100%'}
            mt={'md'}
            variant="white"
            style={{ borderColor: 'black', color: 'black' }}
            onClick={() => fetchRoomFromDorm(userId)}
          >
            Message
          </Button>
        </Flex>
      </Container>

      <SimpleGrid
        cols={3}
        style={{
          gap: 0,
          borderColor: '#DADADA',
          borderStyle: 'solid',
          borderWidth: 1,
          borderBottom: 'none',
          boxSizing: 'border-box',
        }}
      >
        {Array.isArray(fetchPostQry.data) &&
          fetchPostQry.data.map((post, i) => (
            <Image
              height={150}
              src={`${config.STATIC_FILE_BASE_URL}${post.path}?alt=media`}
              alt="Random image"
            />
          ))}
      </SimpleGrid>
    </IonPage>
  );
}
