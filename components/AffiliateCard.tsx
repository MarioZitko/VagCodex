import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors } from '@/utils/theme';

interface Props {
  title: string;
  description: string;
  ctaLabel: string;
  url: string;
}

export function AffiliateCard({ title, description, ctaLabel, url }: Props) {
  return (
    <View
      className="bg-surface rounded-xl overflow-hidden"
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
      }}
    >
      <View className="p-4">
        <Text className="text-primary font-bold text-base">{title}</Text>
        <Text className="text-secondary text-sm mt-1 leading-relaxed">{description}</Text>
        <TouchableOpacity
          className="bg-accent rounded-xl items-center justify-center mt-4"
          style={{ height: 48 }}
          onPress={() => Linking.openURL(url)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-base">{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
