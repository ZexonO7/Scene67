export interface Project {
  id: string;
  title: string;
  description: string;
  creator: string;
  creatorAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'gif';
  reactions: {
    skull: number;
    cry: number;
    fire: number;
    mindblown: number;
    rainbow: number;
  };
  timestamp: string;
  isTrending?: boolean;
}

export type ReactionType = 'skull' | 'cry' | 'fire' | 'mindblown' | 'rainbow';

export const reactionEmojis: Record<ReactionType, string> = {
  skull: '💀',
  cry: '😭',
  fire: '🔥',
  mindblown: '🤯',
  rainbow: '🌈',
};
