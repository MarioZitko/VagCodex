import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/theme';

export default function GarageScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>
          Garage
        </Text>
        <Text style={{ fontSize: 15, color: colors.textSecondary, marginTop: 4 }}>
          Saved vehicles
        </Text>
      </View>

      <View className="flex-1 items-center justify-center" style={{ paddingBottom: 80 }}>
        <Ionicons name="car-outline" size={48} color={colors.textMuted} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: colors.textSecondary,
            marginTop: 16,
          }}
        >
          No vehicles saved yet
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: colors.textMuted,
            marginTop: 6,
            textAlign: 'center',
            paddingHorizontal: 40,
          }}
        >
          Decode a vehicle and tap Save to add it here
        </Text>
      </View>
    </SafeAreaView>
  );
}
