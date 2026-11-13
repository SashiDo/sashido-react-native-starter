import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Parse from './src/parse';
import Auth from './src/Auth';
import Todos from './src/Todos';
import { styles } from './src/styles';

export default function App() {
  const [user, setUser] = useState<Parse.User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // the session saved in AsyncStorage from a previous launch
    Parse.User.currentAsync().then((current) => {
      setUser(current ?? null);
      setReady(true);
    });
  }, []);

  return (
    <View style={styles.screen}>
      {!ready ? <ActivityIndicator /> : user ? <Todos user={user} onLogout={() => setUser(null)} /> : <Auth onLogin={setUser} />}
      <Text style={[styles.muted, { textAlign: 'center', marginTop: 16 }]}>Backend on SashiDo</Text>
      <StatusBar style="dark" />
    </View>
  );
}
