import { IonIcon } from '@ionic/react';
import { Paper, Flex, Avatar, ActionIcon, Text, Image } from '@mantine/core';
import { motion, useAnimation } from 'framer-motion';
import {
  heart,
  heartOutline,
  chatboxOutline,
  paperPlaneOutline,
} from 'ionicons/icons';
import { imgUrl } from '../utils/media';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { likePost, unLikePost } from '../pages/Feed/feed.api';
import { unLikePostUser, likePostUser } from '../store/slice/userSlice';
import { NotifyUser } from '../utils/notification';
import { useVirtual } from 'react-virtual';
import React from 'react';

function Feeds({ feeds, index }: { feeds: any[]; index?: number | null }) {
  const history = useHistory();
  const user = useAppSelector((state) => state.user);
  const [lastClick, setlastClick] = useState<{ time: Date; id: string } | null>(
    null
  );
  const parentRef = useRef(null);

  const controls = useAnimation();
  const dispatch = useAppDispatch();

  const likePostMut = useMutation({
    mutationFn: likePost,
  });

  const unlikePostMut = useMutation({
    mutationFn: unLikePost,
  });

  const likeTimer = (postId: string, User: any) => {
    if (!lastClick)
      return setlastClick((_) => ({ time: new Date(), id: postId }));
    else if (
      (new Date().getTime() - lastClick?.time?.getTime()) / 1000 < 0.3 &&
      postId == lastClick.id
    ) {
      const liked = user.PostLikedIDs.includes(postId);
      const likeCounter = document.getElementById(`post-like-${postId}`);
      if (!likeCounter) return console.error('no counter found');
      let likes = parseInt(likeCounter?.innerText.split(' ')[0] || '0');
      if (liked) {
        dispatch(unLikePostUser(postId));
        likeCounter.textContent = --likes + ' likes';
        unlikePostMut.mutate(lastClick.id);
        NotifyUser(User.id, {
          message: `${User.username} has liked your post`,
          relativeHref: `/app/user/${User.id}`,
        });
      } else {
        dispatch(likePostUser(postId));
        likeCounter.textContent = ++likes + ' likes';
        likePostMut.mutate(lastClick.id);
      }
      controls.start({
        scale: [0.8, 1, 0.8],
        opacity: [0, 1],
        transition: { duration: 0.2 },
      });
      setTimeout(() => {
        controls.start({ opacity: [1, 0] });
        setlastClick(null);
      }, 500);
      return;
    }
    return setlastClick((_) => ({ time: new Date(), id: postId }));
  };

  const rowVirtualizer = useVirtual({
    size: feeds?.length || 0,
    parentRef,
    estimateSize: React.useCallback(() => 400, []),
    overscan: 10,
  });

  useLayoutEffect(() => {
    if (typeof index == 'number' && feeds.length) {
      rowVirtualizer.scrollToIndex(index, {
        align: 'start',
      });
    }
  }, [feeds, index]);

  return (
    <Flex
      direction={'column'}
      style={{ overflow: 'auto', height: '100%' }}
      ref={parentRef}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          height: rowVirtualizer.totalSize,
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualItem: any) => {
          let isLikedByCurrentUser = user.PostLikedIDs.includes(
            feeds[virtualItem.index].id
          );
          return (
            <Paper
              withBorder
              key={virtualItem.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: virtualItem.size,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <Flex style={{ padding: '7px 10px' }} gap={10} align={'center'}>
                <Avatar
                  src={imgUrl(feeds[virtualItem.index].User.avatarPath)}
                />
                <Text weight={500}>
                  {feeds[virtualItem.index].User.username} {virtualItem.index}
                </Text>
              </Flex>
              <div
                onClick={() =>
                  likeTimer(
                    feeds[virtualItem.index].id,
                    feeds[virtualItem.index].User
                  )
                }
                style={{
                  position: 'relative',
                  transformOrigin: 'center',
                }}
              >
                {lastClick?.id == feeds[virtualItem.index].id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={controls}
                    style={{
                      zIndex: '9999',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      margin: '-50px -50px',
                    }}
                  >
                    <IonIcon
                      icon={heart}
                      style={{
                        zIndex: '99999',
                        fontSize: '100px',
                        position: 'absolute',

                        color: 'white',
                      }}
                    />
                  </motion.div>
                )}
                <Image
                  mx="auto"
                  height={300}
                  style={{ backgroundColor: 'black' }}
                  fit="scale-down"
                  src={imgUrl(feeds[virtualItem.index].path)}
                  withPlaceholder
                ></Image>
              </div>
              <Flex style={{ padding: '4px 15px' }} gap={'sm'} align={'center'}>
                <ActionIcon
                  style={{
                    color: isLikedByCurrentUser ? '#E03131' : 'black',
                  }}
                >
                  <IonIcon
                    size="large"
                    icon={isLikedByCurrentUser ? heart : heartOutline}
                  />
                </ActionIcon>{' '}
                <ActionIcon
                  onClick={() =>
                    history.push(`/app/comments/${feeds[virtualItem.index].id}`)
                  }
                >
                  <IonIcon size="large" icon={chatboxOutline} />
                </ActionIcon>{' '}
                <ActionIcon>
                  <IonIcon size="large" icon={paperPlaneOutline} />
                </ActionIcon>{' '}
                <Text
                  ml={'auto'}
                  size={'sm'}
                  color="#5C5F66"
                  weight={500}
                  id={`post-like-${feeds[virtualItem.index].id}`}
                >
                  {feeds[virtualItem.index].UserLikedIDs.length} likes
                </Text>
              </Flex>
            </Paper>
          );
        })}
      </div>
    </Flex>
  );
}

export default Feeds;
