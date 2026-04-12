import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDecodeStore } from '@/store/decodeStore';
import { CategorySection } from '@/components/CategorySection';
import { AffiliateCard } from '@/components/AffiliateCard';
import { groupByCategory } from '@/services/decoder';
import { colors } from '@/utils/theme';

export default function ResultsScreen() {
  const { decodeResult, reset } = useDecodeStore();

  if (!decodeResult) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text style={{ color: colors.textMuted, fontSize: 15 }}>
          No results — go back and decode some codes.
        </Text>
      </SafeAreaView>
    );
  }

  const grouped = groupByCategory(decodeResult.matched);

  const handleDone = () => {
    reset();
    router.dismissAll();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View
        className="flex-row items-center bg-surface"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} hitSlop={8} className="flex-row items-center gap-1">
          <Ionicons name="chevron-back" size={18} color={colors.accent} />
          <Text style={{ color: colors.accent, fontSize: 15 }}>Back</Text>
        </TouchableOpacity>
        <Text
          className="flex-1 text-center"
          style={{ fontWeight: '600', color: colors.textPrimary, fontSize: 16 }}
        >
          Results
        </Text>
        <TouchableOpacity onPress={handleDone} hitSlop={8}>
          <Text style={{ color: colors.accent, fontSize: 15 }}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      >
        {/* Summary row */}
        <View
          className="bg-surface rounded-xl flex-row items-center"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            padding: 16,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View className="flex-1">
            <Text style={{ fontSize: 28, fontWeight: '700', color: colors.textPrimary }}>
              {decodeResult.matched.length}
            </Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 2 }}>
              equipment item{decodeResult.matched.length !== 1 ? 's' : ''} decoded
            </Text>
          </View>
          {decodeResult.unrecognized.length > 0 && (
            <View
              className="rounded-md px-3 py-1.5"
              style={{ backgroundColor: '#FFF8F7', borderWidth: 1, borderColor: '#F5C6C2' }}
            >
              <Text style={{ fontSize: 12, fontWeight: '500', color: colors.danger }}>
                {decodeResult.unrecognized.length} unrecognized
              </Text>
            </View>
          )}
        </View>

        {/* Equipment by category */}
        {Object.entries(grouped).map(([category, codes]) => (
          <CategorySection key={category} category={category} codes={codes} />
        ))}

        {/* Unrecognized codes */}
        {decodeResult.unrecognized.length > 0 && (
          <View
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFF8F7',
              borderWidth: 1,
              borderColor: '#F5C6C2',
              marginBottom: 16,
            }}
          >
            <Text style={{ fontWeight: '600', color: colors.danger, fontSize: 14, marginBottom: 6 }}>
              Unrecognized codes
            </Text>
            <Text style={{ color: colors.danger, fontSize: 13, lineHeight: 20 }}>
              {decodeResult.unrecognized.join('  ')}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 8 }}>
              These may be model-specific or not yet in the database
            </Text>
          </View>
        )}

        {/* Affiliate cards */}
        <View style={{ marginTop: 8, gap: 12 }}>
          <AffiliateCard
            title="CarVertical"
            description="Check full vehicle history — accidents, mileage, ownership records."
            ctaLabel="Check vehicle history →"
            url="https://www.carvertical.com"
          />
          <AffiliateCard
            title="Autodoc"
            description="Find OEM and aftermarket parts for your VAG vehicle."
            ctaLabel="Find parts for your VAG →"
            url="https://www.autodoc.co.uk"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
