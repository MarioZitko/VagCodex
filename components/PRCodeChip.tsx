import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  code: string;
  onDelete?: () => void;
}

export function PRCodeChip({ code, onDelete }: Props) {
  return (
    <View className="flex-row items-center bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 mr-2 mb-2">
      <Text className="text-blue-800 font-mono font-semibold text-sm">{code}</Text>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} hitSlop={8} className="ml-1.5">
          <Text className="text-blue-400 text-base leading-none">×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
