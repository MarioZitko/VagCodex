import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AffiliateCard } from '@/components/AffiliateCard';
import { colors } from '@/utils/theme';

const BRANDS = ['VW', 'Audi', 'Škoda', 'Seat', 'Cupra', 'Porsche'];

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      >
        {/* Header */}
        <View style={{ paddingTop: 24, paddingBottom: 28 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>
            About
          </Text>
        </View>

        {/* App description */}
        <View
          className="bg-surface rounded-xl p-4"
          style={{ borderWidth: 1, borderColor: colors.border }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 }}>
            VagCodex
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 22 }}>
            Free tool to decode VAG vehicle factory equipment from PR codes found on the sticker
            inside your boot lid. Everything runs on-device — no account or internet required.
          </Text>

          {/* Brand chips */}
          <View className="flex-row flex-wrap" style={{ marginTop: 16, gap: 6 }}>
            {BRANDS.map((brand) => (
              <View
                key={brand}
                className="bg-accent-light rounded-md px-3 py-1"
              >
                <Text style={{ fontSize: 12, fontWeight: '500', color: colors.accent }}>
                  {brand}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Partners section label */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: colors.textMuted,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            marginTop: 28,
            marginBottom: 12,
          }}
        >
          Partners
        </Text>

        {/* CarVertical */}
        <AffiliateCard
          title="CarVertical"
          description="Full vehicle history reports — accidents, mileage, ownership records."
          ctaLabel="Check vehicle history"
          url="https://www.carvertical.com"
        />

        <View style={{ height: 12 }} />

        {/* Autodoc */}
        <AffiliateCard
          title="Autodoc"
          description="Find parts for your VAG vehicle — extensive catalogue with fast delivery."
          ctaLabel="Browse parts catalogue"
          url="https://www.autodoc.co.uk"
        />

        {/* Links */}
        <View
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <TouchableOpacity onPress={() => Linking.openURL('https://www.carvertical.com')}>
            <Text
              style={{
                fontSize: 14,
                color: colors.accent,
                textDecorationLine: 'underline',
                marginBottom: 10,
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 12, color: colors.textMuted }}>
            VagCodex is not affiliated with Volkswagen AG or any VAG brand.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
