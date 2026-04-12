import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  code: string;
  onDelete?: () => void;
}

export function PRCodeChip({ code, onDelete }: Props) {
  return (
    <View className="flex-row items-center bg-accent-light rounded-md px-2.5 mr-2 mb-2" style={{ height: 32 }}>
      <Text className="text-accent font-mono font-semibold text-xs tracking-wide">{code}</Text>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} hitSlop={8} className="ml-2">
          <Text className="text-muted text-base leading-none">×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
