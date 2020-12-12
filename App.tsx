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
          {!authorValues.isAuthorPresent && (
            <View>
              <Text>Hello</Text>
            </View>
          )}
          {authorValues.isAuthorPresent && (
            <>
              <View style={styles.poemData}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: '#f9eae1'}}>
                  {authorValues.author}
                </Text>
                <Text
                  style={{fontSize: 15, textAlign: 'center', color: '#f9eae1'}}>
                  {authorValues.title}
                </Text>
              </View>

              <ScrollView>
                <View style={styles.poem}>
                  {authorValues.poem.map((line) => {
                    return (
                      <Text
                        style={{
                          fontSize: 16,

                          textAlign: 'center',
                        }}
                        key={uuid()}>
                        {line}
                      </Text>
                    );
                  })}
                </View>
              </ScrollView>
            </>
          )}
        </View>
        <View style={styles.mainButton}>
          <Button
            title="Fetch Love"
            onPress={fetchAuthor}
            color="white"></Button>
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
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  poemData: {
    borderTopEndRadius: 20,
    padding: 10,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#7D4F50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poem: {
    display: 'flex',
    borderBottomEndRadius: 20,
    padding: 20,
    backgroundColor: '#D1BE9C',
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'center',
  },
  mainButton: {
    backgroundColor: '#7D4F50',
    bottom: 0,
  },
});

export default App;
