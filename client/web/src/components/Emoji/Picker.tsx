import React, { useCallback } from 'react';
import { isValidStr, useColorScheme, useLanguage } from 'tailchat-shared';
import { emojiData } from './const';
import Picker from '@emoji-mart/react';
import type { EmojiData } from './types';
import i18nZh from '@emoji-mart/data/i18n/zh.json';
import i18nEn from '@emoji-mart/data/i18n/en.json';
import spritesUrl from './twitter.png';

import './Picker.less';

interface EmojiPickerProps {
  onSelect: (code: string) => void;
}

/**
 * emoji表情面板
 *
 * Reference: https://www.npmjs.com/package/emoji-mart
 */
export const EmojiPicker: React.FC<EmojiPickerProps> = React.memo((props) => {
  const { isDarkMode } = useColorScheme();
  const { language } = useLanguage();
  const handleSelect = useCallback(
    (emoji: EmojiData) => {
      const code = emoji.shortcodes;
      if (isValidStr(code)) {
        props.onSelect(code);
      }
    },
    [props.onSelect]
  );

  return (
    <div className="emoji-picker">
      <Picker
        set="twitter"
        data={emojiData}
        theme={isDarkMode ? 'dark' : 'light'}
        i18n={language === 'zh-CN' ? i18nZh : i18nEn}
        previewPosition="none"
        skinTonePosition="none"
        onEmojiSelect={handleSelect}
        getSpritesheetURL={() => spritesUrl}
      />
    </div>
  );
});
EmojiPicker.displayName = 'EmojiPicker';
