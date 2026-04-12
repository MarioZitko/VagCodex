import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { PRCode } from '@/types';
import { EquipmentCard } from './EquipmentCard';
import { colors } from '@/utils/theme';

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
    <View className="bg-surface rounded-xl mb-3 border border-divider overflow-hidden">
      <TouchableOpacity
        className="flex-row items-center justify-between px-4 py-3"
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text
          className="font-semibold text-xs uppercase tracking-wider"
          style={{ color: colors.textSecondary }}
        >
          {CATEGORY_LABELS[category] ?? category}
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="bg-accent-light rounded-md px-2 py-0.5">
            <Text className="text-accent text-xs font-medium">{codes.length}</Text>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={colors.textMuted}
          />
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
