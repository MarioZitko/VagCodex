import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import type { PRCode } from '@/types';
import { EquipmentCard } from './EquipmentCard';

const CATEGORY_LABELS: Record<string, string> = {
  engine: 'Engine',
  transmission: 'Transmission',
  exterior: 'Exterior',
  wheels: 'Wheels',
  interior: 'Interior',
  safety: 'Safety & Driver Assistance',
  suspension: 'Suspension',
  lighting: 'Lighting',
  comfort: 'Comfort & Technology',
  towing: 'Towing',
  other: 'Other',
};

interface Props {
  category: string;
  codes: PRCode[];
}

export function CategorySection({ category, codes }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View className="bg-white rounded-2xl mb-3 border border-gray-100 overflow-hidden">
      <TouchableOpacity
        className="flex-row items-center justify-between px-4 py-3"
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text className="font-semibold text-gray-900">
          {CATEGORY_LABELS[category] ?? category}
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="bg-gray-100 rounded-full px-2 py-0.5">
            <Text className="text-gray-500 text-xs font-medium">{codes.length}</Text>
          </View>
          <Text className="text-gray-400 text-xs">{expanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View className="px-4 pb-1">
          {codes.map((item) => (
            <EquipmentCard key={item.code} item={item} />
          ))}
        </View>
      )}
    </View>
  );
}
