import { StyleSheet } from 'react-native';

export const colors = { text: '#1f2a44', muted: '#8a93a6', line: '#eef1f6', blue: '#0092ff', red: '#d93025' };

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f6fa', padding: 16, paddingTop: 64 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: '600', color: colors.text },
  input: { borderWidth: 1, borderColor: '#d6dbe6', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, flex: 1 },
  button: { backgroundColor: colors.blue, borderRadius: 6, paddingHorizontal: 16, paddingVertical: 11, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  link: { color: colors.blue, fontSize: 15, padding: 4, textAlign: 'center' },
  error: { color: colors.red },
  muted: { color: colors.muted },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.line },
  itemText: { fontSize: 16, color: colors.text, flexShrink: 1 },
  done: { textDecorationLine: 'line-through', color: colors.muted },
});
