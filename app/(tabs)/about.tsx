import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        <View className="pt-4 pb-6">
          <Text className="text-3xl font-bold text-gray-900">About</Text>
        </View>

        <View className="bg-white rounded-2xl p-4 mb-3 border border-gray-100">
          <Text className="font-semibold text-gray-900 text-base mb-2">VagCodex</Text>
          <Text className="text-gray-600 text-sm leading-relaxed">
            Free tool to decode VAG vehicle factory equipment from PR codes found on
            the sticker inside your boot lid. Supports VW, Audi, Škoda, Seat, Cupra
            and Porsche. Everything runs on-device — no account or internet required.
          </Text>
        </View>

        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 mb-2 mt-2">
          Our Partners
        </Text>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 active:opacity-70"
          onPress={() => Linking.openURL('https://www.carvertical.com')}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold text-gray-900">CarVertical</Text>
              <Text className="text-gray-500 text-sm mt-0.5">
                Full vehicle history reports
              </Text>
            </View>
            <Text className="text-gray-400">→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 border border-gray-100 active:opacity-70"
          onPress={() => Linking.openURL('https://www.autodoc.co.uk')}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold text-gray-900">Autodoc</Text>
              <Text className="text-gray-500 text-sm mt-0.5">
                Find parts for your VAG vehicle
              </Text>
            </View>
            <Text className="text-gray-400">→</Text>
          </View>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 text-xs mt-8">
          VagCodex is not affiliated with Volkswagen AG
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
