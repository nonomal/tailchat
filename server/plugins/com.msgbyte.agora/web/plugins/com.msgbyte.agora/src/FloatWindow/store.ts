import type { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import create from 'zustand';

interface MediaPerm {
  video: boolean;
  audio: boolean;
  screensharing: boolean;
}

interface MeetingState {
  /**
   * 本次会议用户列表
   */
  users: IAgoraRTCRemoteUser[];
  /**
   * 本地媒体权限
   */
  mediaPerm: MediaPerm;
  /**
   * 音量信息
   */
  volumes: {
    /**
     * 音量, 0~100, 一般认为60以上视为正在发言.
     */
    level: number;
    uid: string;
  }[];
  appendUser: (user: IAgoraRTCRemoteUser) => void;
  removeUser: (user: IAgoraRTCRemoteUser) => void;
  /**
   * 更新用户信息
   */
  updateUserInfo: (user: IAgoraRTCRemoteUser) => void;
  setMediaPerm: (perm: Partial<MediaPerm>) => void;

  reset: () => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  users: [],
  mediaPerm: { video: false, audio: false, screensharing: false },
  volumes: [],
  appendUser: (user: IAgoraRTCRemoteUser) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },
  removeUser: (user: IAgoraRTCRemoteUser) => {
    set((state) => {
      return {
        users: state.users.filter((_u) => _u.uid !== user.uid),
      };
    });
  },
  updateUserInfo: (user: IAgoraRTCRemoteUser) => {
    set((state) => {
      const users = [...state.users];
      const targetUserIndex = state.users.findIndex((u) => u.uid === user.uid);
      if (targetUserIndex === -1) {
        return {};
      }

      users[targetUserIndex] = user;

      return {
        users,
      };
    });
  },
  setMediaPerm: (perm: Partial<MediaPerm>) => {
    set((state) => ({
      mediaPerm: {
        ...state.mediaPerm,
        ...perm,
      },
    }));
  },

  reset: () => {
    set({
      users: [],
      mediaPerm: { video: false, audio: false },
    });
  },
}));
