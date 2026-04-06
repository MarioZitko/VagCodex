import { View, Text } from 'react-native';
import type { PRCode } from '@/types';

interface Props {
  item: PRCode;
}

export function EquipmentCard({ item }: Props) {
  return (
    <View className="py-3 flex-row items-start border-b border-gray-100 last:border-0">
      <View className="bg-gray-100 rounded px-1.5 py-0.5 mr-3 mt-0.5">
        <Text className="text-gray-500 font-mono text-xs font-bold">{item.code}</Text>
      </View>
      <Text className="flex-1 text-gray-800 text-sm leading-snug">{item.description}</Text>
    </View>
  );
}
