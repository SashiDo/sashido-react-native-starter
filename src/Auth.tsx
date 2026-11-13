import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Parse from './parse';
import { styles } from './styles';

export default function Auth({ onLogin }: { onLogin: (user: Parse.User) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError('');
    setBusy(true);
    try {
      const user =
        mode === 'login'
          ? await Parse.User.logIn(username, password)
          : await new Parse.User({ username, password }).signUp();
      onLogin(user);
    } catch (err) {
      setError((err as Parse.Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{mode === 'login' ? 'Log in' : 'Sign up'}</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Username" autoCapitalize="none" value={username} onChangeText={setUsername} accessibilityLabel="Username" />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} onSubmitEditing={submit} accessibilityLabel="Password" />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.button, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy} accessibilityRole="button">
        <Text style={styles.buttonText}>{mode === 'login' ? 'Log in' : 'Create account'}</Text>
      </Pressable>
      <Pressable onPress={() => setMode(mode === 'login' ? 'signup' : 'login')} accessibilityRole="button">
        <Text style={styles.link}>{mode === 'login' ? 'No account yet? Sign up' : 'Have an account? Log in'}</Text>
      </Pressable>
    </View>
  );
}
