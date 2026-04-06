import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GarageScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pt-6 pb-4">
        <Text className="text-3xl font-bold text-gray-900">Garage</Text>
        <Text className="text-gray-400 mt-1">Saved vehicles</Text>
      </View>

      <View className="flex-1 items-center justify-center pb-20">
        <Text className="text-5xl mb-4">🚗</Text>
        <Text className="text-gray-700 font-semibold text-base">No vehicles saved yet</Text>
        <Text className="text-gray-400 text-sm mt-1">
          Decode a vehicle and tap Save to add it here
        </Text>
      </View>
    </SafeAreaView>
  );
}
