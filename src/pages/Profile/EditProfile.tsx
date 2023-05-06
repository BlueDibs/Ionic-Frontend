import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { Avatar, Box, Button, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { updateProfile } from './profile.api';
import { updateProfileSchema } from './profile.schema';
import { useAppSelector } from '../../store/hooks';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';
import { config } from '../../config';

export function EditProfile({
  open,
  setModalOpen,
}: {
  open: boolean;
  setModalOpen: (flag: boolean) => void;
}) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<File | string | null>(
    user.avatarPath
      ? `${config.STATIC_FILE_BASE_URL}${user.avatarPath}?alt=media`
      : null
  );

  const editForm = useForm<Zod.infer<typeof updateProfileSchema>>({
    validate: zodResolver(updateProfileSchema),
  });

  const updateProfMut = useMutation({
    mutationFn: (vals: Zod.infer<typeof updateProfileSchema>) => {
      vals.avatar = !!avatar && avatar;
      return updateProfile(vals);
    },
    onSuccess(_, vars) {
      dispatch(setUser({ ...user, ...vars }));
      setModalOpen(false);
    },
  });

  return (
    <IonModal isOpen={open} trigger="open-modal" onWillDismiss={(ev) => ''}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setModalOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={() => {
                updateProfMut.mutate(editForm.values);
              }}
            >
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Box p={'sm'} h={'100%'} component="form">
        <IonItem style={{ height: '100%' }}>
          <Avatar
            src={
              typeof avatar == 'function' ? URL.createObjectURL(avatar) : avatar
            }
            size="xl"
            radius="md"
            ml={'auto'}
            mr={'auto'}
            style={{ width: 100, height: 100 }}
            alt="it's me"
          />
          <IonButton
            style={{
              marginTop: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.onchange = (_) => {
                const [file] = Array.from(fileInput.files);
                setAvatar(file);
              };
              fileInput.click();
            }}
          >
            Change Profile
          </IonButton>

          <IonLabel position="stacked" style={{ marginTop: 20 }}>
            Bio
          </IonLabel>
          <Textarea
            placeholder="Type something here"
            variant="unstyled"
            maxLength={120}
            defaultValue={user.bio}
            w={'100%'}
            {...editForm.getInputProps('bio')}
          ></Textarea>
        </IonItem>
      </Box>
    </IonModal>
  );
}
