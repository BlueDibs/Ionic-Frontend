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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { config } from '../../config';
import { IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { fetchUserDetails, followUser, unFollowUser } from './api.user';
import { fetchPosts } from '../Profile/profile.api';
import { child, get, push, ref, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { createDorm } from './createDorm';
import { follow, unfollow } from '../../store/slice/userSlice';
import { useDispatch } from 'react-redux';
import { queryClient } from '../../utils/queryClient';

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
  const dispatch = useDispatch();

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

  const followMut = useMutation({
    mutationFn: followUser,
    onSuccess({ data }) {
      userQuery.refetch();
      dispatch(follow(userId));
    },
  });

  const unfollowMut = useMutation({
    mutationFn: unFollowUser,
    onSuccess({ data }) {
      userQuery.refetch();
      dispatch(unfollow(userId));
    },
  });

  const fetchRoomFromDorm = async (targetUserId: string) => {
    await createDorm(user.id, targetUserId);

    history.push(`/app/chat/${targetUserId}`);
  };

  useEffect(() => {
    if (userQuery.data?.id) fetchPostQry.refetch();
  }, [userQuery.data?.id]);

  const userFollowUnfollow = () => {
    if (user.followingIDs.includes(userId)) unfollowMut.mutate(userId);
    else followMut.mutate(userId);
  };

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
            value={userQuery.data?.followersIDs?.length || 0}
            className={classes.statusLeft}
          />

          <Status
            label="Following"
            value={userQuery.data?.followingIDs?.length || 0}
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
            onClick={() => userFollowUnfollow()}
          >
            {user.followingIDs?.includes(userId) ? 'Following' : 'Follow'}
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
