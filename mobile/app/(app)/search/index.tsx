import SearchScreen from '@/screens/SearchScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [queryToFetch, setQueryToFetch] = useState('');

  function handleSearch() {
    if (query.trim() !== '') {
      setQueryToFetch(query.trim());
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Поиск...'
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {queryToFetch.length ? (
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <SearchScreen query={queryToFetch} />
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name='search-sharp' size={96} color='#372aac' />
          <Text style={styles.mainText}>Введите запрос</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    gap: 16,
    backgroundColor: '#eee',
  },
  input: {
    marginHorizontal: '5%',
    width: '90%',
    height: 40,
    borderColor: '#9f9c9c',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: 'white',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  mainText: { color: '#372aac', fontSize: 18, fontWeight: '600' },
});

export default SearchInput;
