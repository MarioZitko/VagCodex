import { View, Text } from 'react-native';
import type { PRCode } from '@/types';

interface Props {
  item: PRCode;
}

export function EquipmentCard({ item }: Props) {
  return (
    <View className="py-3 flex-row items-start border-b border-divider">
      <Text className="flex-1 text-primary text-sm leading-snug">{item.description}</Text>
      <View className="bg-accent-light rounded-md px-1.5 py-0.5 ml-3 mt-0.5">
        <Text className="text-accent font-mono text-xs font-semibold">{item.code}</Text>
      </View>
    </View>
  );
}
