import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useDecodeStore } from '@/store/decodeStore';
import { CategorySection } from '@/components/CategorySection';
import { groupByCategory } from '@/services/decoder';

export default function ResultsScreen() {
  const { decodeResult, reset } = useDecodeStore();

  if (!decodeResult) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-400">No results — go back and decode some codes.</Text>
      </SafeAreaView>
    );
  }

  const grouped = groupByCategory(decodeResult.matched);

  const handleDone = () => {
    reset();
    router.dismissAll();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Text className="text-blue-600 text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center font-semibold text-gray-900">Results</Text>
        <TouchableOpacity onPress={handleDone} hitSlop={8}>
          <Text className="text-blue-600 text-base">Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Summary */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
          <Text className="text-3xl font-bold text-gray-900">
            {decodeResult.matched.length}
          </Text>
          <Text className="text-gray-500">
            equipment item{decodeResult.matched.length !== 1 ? 's' : ''} decoded
          </Text>
          {decodeResult.unrecognized.length > 0 && (
            <Text className="text-orange-500 text-sm mt-1">
              {decodeResult.unrecognized.length} unrecognized code
              {decodeResult.unrecognized.length !== 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {/* Equipment by category */}
        {Object.entries(grouped).map(([category, codes]) => (
          <CategorySection key={category} category={category} codes={codes} />
        ))}

        {/* Unrecognized codes */}
        {decodeResult.unrecognized.length > 0 && (
          <View className="bg-orange-50 rounded-2xl p-4 mb-3 border border-orange-100">
            <Text className="font-semibold text-orange-800 mb-1">Unrecognized codes</Text>
            <Text className="text-orange-700 text-sm leading-relaxed">
              {decodeResult.unrecognized.join('  ')}
            </Text>
            <Text className="text-orange-500 text-xs mt-2">
              These may be model-specific or not yet in the database
            </Text>
          </View>
        )}

        {/* CarVertical affiliate */}
        <TouchableOpacity
          className="bg-blue-600 rounded-2xl p-4 mb-3 active:opacity-80"
          onPress={() => Linking.openURL('https://www.carvertical.com')}
        >
          <Text className="text-white font-semibold text-base">
            Check full vehicle history →
          </Text>
          <Text className="text-blue-200 text-sm mt-0.5">
            CarVertical report — accidents, mileage, ownership
          </Text>
        </TouchableOpacity>

        {/* Autodoc affiliate */}
        <TouchableOpacity
          className="bg-white rounded-2xl p-4 border border-gray-100 active:opacity-70"
          onPress={() => Linking.openURL('https://www.autodoc.co.uk')}
        >
          <Text className="text-gray-900 font-semibold text-base">
            Find parts for your VAG →
          </Text>
          <Text className="text-gray-500 text-sm mt-0.5">Autodoc — parts catalogue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
