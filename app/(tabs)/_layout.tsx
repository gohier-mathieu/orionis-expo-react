import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Vous pouvez utiliser n'importe quelle bibliothèque d'icônes

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#222', // Couleur de fond de la navbar
          height: 60,
        },
        tabBarActiveTintColor: '#fd1717', // Couleur des icônes actives
        tabBarInactiveTintColor: '#888',  // Couleur des icônes inactives
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />      
      </Tabs>
  );
}
