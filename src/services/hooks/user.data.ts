import { useService } from '../../services/service.hooks';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { IChatPayload, IClearHistoryPayload, ImageDecodePayload, ISaveFormDetailsPayload, IUserConversationCountPayload, IUserDetailPayload, IUserSaveAnoDetailPayload, IUserSessionPayload } from '../user/user.interfaces';
import { AxiosError } from 'axios';

export const useUserChat = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: IChatPayload) => {
      const response = await UserService.userChat(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};
export const useUserDetail = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: IUserDetailPayload) => {
      const response = await UserService.userDetail(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};
export const useUserSession = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: IUserSessionPayload) => {
      const response = await UserService.userSession(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};
export const useUserClearHistory = () => {
  const UserService = useService('user');
  const mutationFn = useCallback(
    async (payload: IClearHistoryPayload) => {
      const response = await UserService.userClearHistory(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
      }
    },
  });
};
export const useUserconversationCount = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: IUserConversationCountPayload) => {
      const response = await UserService.userConversationCount(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};
export const useUserDetailAnonomous = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: IUserSaveAnoDetailPayload) => {
      const response = await UserService.userSaveAnonomousDetail(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};

export const useSaveUserDetail = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: ISaveFormDetailsPayload) => {
      const response = await UserService.userSaveFormDetails(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};

export const useImageDecode = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: ImageDecodePayload) => {
      const response = await UserService.imageDecode(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};

export const useCallMasterAgent = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async (payload: IChatPayload) => {
      const response = await UserService.callMasterAgent(payload);
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};

export const useListStobayBusiness = () => {
  const UserService = useService('user');

  const mutationFn = useCallback(
    async () => {
      const response = await UserService.listStobayBusiness();
      return response;
    },
    [UserService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // showMessage(error.response?.data?.error, "error");
      }
    },
  });
};

export const useBusinessDetail = () => {
  const StobayBusinessService = useService('user');
  const mutationFn = useCallback(
    async (payload: { bot_username: string }) => {
      const response = await StobayBusinessService.businessDetail(payload);
      return response;
    },
    [StobayBusinessService]
  );

  return useMutation({
    mutationFn,
    onSuccess: (_response) => {
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // Handle Axios error
      }
    },
  });
};