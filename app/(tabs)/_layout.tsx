import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: IoniconsName, focusedName: IoniconsName) {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons name={focused ? focusedName : name} size={24} color={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: { borderTopColor: '#F3F4F6' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Decode',
          tabBarIcon: tabIcon('scan-outline', 'scan'),
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: 'Garage',
          tabBarIcon: tabIcon('car-outline', 'car'),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: tabIcon('information-circle-outline', 'information-circle'),
        }}
      />
    </Tabs>
  );
}
