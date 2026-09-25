import { HeartHandshake, Baby, Flower2, Leaf, UsersRound, BookOpen, Smile, MessagesSquare, House, ClipboardList } from "lucide-react";
const icons = { heart: HeartHandshake, baby: Baby, flower: Flower2, leaf: Leaf, family: UsersRound, book: BookOpen, smile: Smile, chat: MessagesSquare, community: House, record: ClipboardList };
export function TopicIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = icons[name as keyof typeof icons] || HeartHandshake;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}

