// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import uuid from 'uuid-random';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [authorValues, setAuthor] = useState({
    author: '',
    title: '',
    isAuthorPresent: false,
    poem: [],
  });

  useEffect(() => {
    fetch('https://poetrydb.org/author')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAuthors(data.authors);
      });
    // return () => {
    //   console.log('cleanup');
    // };
  }, []);

  const fetchAuthor = () => {
    setLoading(true);
    setTimeout(() => {
      let author = authors[Math.floor(Math.random() * (authors.length - 1))];
      // setAuthor({
      //   ...authorValues,
      //   author: author,
      // });
      fetch(`https://poetrydb.org/author/${author}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          setAuthor({
            author: author,
            title: data[0].title,
            isAuthorPresent: true,
            poem: data[0].lines,
          });
        });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mainHeader}></View>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>Header</Text>
        </View>
        <View style={styles.mainContainer}>
          {authorValues.isAuthorPresent && (
            <>
              <View>
                <Text>{authorValues.author}</Text>
              </View>
              <ScrollView>
                {authorValues.poem.map((line) => {
                  return <Text key={uuid()}>{line}</Text>;
                })}
              </ScrollView>
            </>
          )}
          <View style={styles.mainButton}>
            <Button
              title="Fetch Love"
              onPress={fetchAuthor}
              color="white"></Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EAE1',
  },
  mainHeader: {
    flex: 0.03,
    padding: 12,
    backgroundColor: '#7D4F50',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainHeaderText: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
  },
  mainButton: {
    backgroundColor: '#7D4F50',
    bottom: 0,
  },
});

export default App;
