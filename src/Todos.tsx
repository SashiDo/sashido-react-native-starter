import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { FlatList, Pressable, Switch, Text, TextInput, View } from 'react-native';
import Parse, { liveQueriesEnabled } from './parse';
import { styles } from './styles';

type Todo = Parse.Object<{ title: string; done: boolean }>;

export default function Todos({ user, onLogout }: { user: Parse.User; onLogout: () => void }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const input = useRef<ComponentRef<typeof TextInput>>(null);

  useEffect(() => {
    // the ACL set in cloud/main.js means a user only finds their own todos
    const query = new Parse.Query<Todo>('Todo').descending('createdAt').limit(100);
    query.find().then(setTodos, (err: Parse.Error) => setError(err.message));

    if (!liveQueriesEnabled) return;
    let subscription: { unsubscribe: () => unknown } | undefined;
    query.subscribe().then((sub) => {
      subscription = sub;
      const upsert = (todo: Todo) => setTodos((list) => [todo, ...list.filter((t) => t.id !== todo.id)]);
      sub.on('create', upsert);
      sub.on('update', (todo: Todo) => setTodos((list) => list.map((t) => (t.id === todo.id ? todo : t))));
      sub.on('delete', (todo: Todo) => setTodos((list) => list.filter((t) => t.id !== todo.id)));
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  async function add() {
    if (!title.trim()) return;
    try {
      const todo = (await new Parse.Object('Todo', { title: title.trim(), done: false }).save()) as Todo;
      setTodos((list) => [todo, ...list.filter((t) => t.id !== todo.id)]);
      setTitle('');
      input.current?.focus();   // ready for the next one
    } catch (err) {
      setError((err as Parse.Error).message);
    }
  }

  async function toggle(todo: Todo) {
    await todo.save({ done: !todo.get('done') });
    setTodos((list) => [...list]);
  }

  async function remove(todo: Todo) {
    await todo.destroy();
    setTodos((list) => list.filter((t) => t.id !== todo.id));
  }

  async function logout() {
    await Parse.User.logOut();
    onLogout();
  }

  return (
    <View style={[styles.card, { flex: 1 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.get('username')}'s todos</Text>
        <Pressable onPress={logout} accessibilityRole="button"><Text style={styles.link}>Log out</Text></Pressable>
      </View>
      <View style={styles.row}>
        <TextInput ref={input} style={styles.input} placeholder="What needs doing?" value={title} onChangeText={setTitle} onSubmitEditing={add} submitBehavior="submit" accessibilityLabel="New todo" />
        <Pressable style={styles.button} onPress={add} accessibilityRole="button"><Text style={styles.buttonText}>Add</Text></Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id ?? todo._localId ?? ""}
        ListEmptyComponent={<Text style={styles.muted}>Nothing yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={[styles.row, { flexShrink: 1 }]}>
              <Switch value={item.get('done')} onValueChange={() => toggle(item)} accessibilityLabel={`Done: ${item.get('title')}`} />
              <Text style={[styles.itemText, item.get('done') && styles.done]}>{item.get('title')}</Text>
            </View>
            <Pressable onPress={() => remove(item)} accessibilityRole="button" accessibilityLabel={`Delete ${item.get('title')}`}>
              <Text style={styles.link}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
