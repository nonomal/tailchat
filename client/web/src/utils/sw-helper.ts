import { notification } from 'antd';
import React from 'react';
import _once from 'lodash/once';
import { showErrorToasts, t } from 'tailchat-shared';
import { UpdateNotificationBtn } from '@/components/UpdateNotificationBtn';

type BeforeInstallPromptEvent = Event & {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
};

/**
 * 弹出更新提示框
 */
const handleShowUpdateTip = _once(() => {
  setTimeout(() => {
    // 两秒后再弹出以确保不会出现加载到一半的情况
    notification.open({
      message: t('更新版本'),
      description: t('检测到有新版本, 是否立即刷新以升级到最新内容'),
      duration: 0,
      btn: React.createElement(UpdateNotificationBtn),
    });
  }, 2000);
});

let _serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
let beforeinstallprompt: BeforeInstallPromptEvent;

/**
 * 处理registration相关任务和状态
 */
function handleRegistration(registration: ServiceWorkerRegistration) {
  console.log('registered', registration);
  if (registration.waiting) {
    console.log('updated', registration);
    handleShowUpdateTip();
    return;
  }
  registration.onupdatefound = () => {
    console.log('updatefound', registration);
    const installingWorker = registration.installing;
    if (installingWorker === null) {
      return;
    }

    installingWorker.onstatechange = () => {
      if (installingWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // At this point, the old content will have been purged and
          // the fresh content will have been added to the cache.
          // It's the perfect time to display a "New content is
          // available; please refresh." message in your web app.
          console.log('updated', registration);
          handleShowUpdateTip();
        } else {
          // At this point, everything has been precached.
          // It's the perfect time to display a
          // "Content is cached for offline use." message.
          console.log('cached', registration);
        }
      }
    };
  };
}

/**
 * 初始化ws服务
 */
export function installServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);

          _serviceWorkerRegistration = registration;

          handleRegistration(registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      beforeinstallprompt = e as any;
    });
  }
}

/**
 * 获取SW的Registration
 */
export function getServiceWorkerRegistration(): ServiceWorkerRegistration | null {
  return _serviceWorkerRegistration;
}

/**
 * 显示pwa安装按钮
 */
export function showInstallPrompt() {
  if (!beforeinstallprompt) {
    showErrorToasts(t('无法安装'));
    return;
  }

  beforeinstallprompt.prompt();
}

export function canInstallprompt() {
  return !!beforeinstallprompt;
}
