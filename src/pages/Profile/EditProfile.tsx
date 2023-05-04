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
import { useRef } from 'react';
import { updateProfile } from './profile.api';
import { updateProfileSchema } from './profile.schema';
import { useAppSelector } from '../../store/hooks';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';

export function EditProfile({
  open,
  setModalOpen,
}: {
  open: boolean;
  setModalOpen: (flag: boolean) => void;
}) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const hist = useHistory();

  const editForm = useForm<Zod.infer<typeof updateProfileSchema>>({
    validate: zodResolver(updateProfileSchema),
  });

  const updateProfMut = useMutation({
    mutationFn: updateProfile,
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
            src={null}
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
