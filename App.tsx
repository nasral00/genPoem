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
  ActivityIndicator,
} from 'react-native';
import uuid from 'uuid-random';
import AnimatedIntroText from './components/AnimatedIntroText';

const App = () => {
  const [isLoading, setLoading] = useState(false);
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
  }, []);

  const fetchAuthor = () => {
    setLoading(true);

    let author = authors[Math.floor(Math.random() * (authors.length - 1))];
    console.log(author);

    fetch(`https://poetrydb.org/author/${author}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let title = Math.floor(Math.random() * (data.length - 1));
        console.log(title);
        setLoading(false);
        setAuthor({
          author: author,
          title: data[title].title,
          isAuthorPresent: true,
          poem: data[title].lines,
        });
      });
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
          {!isLoading && !authorValues.isAuthorPresent && <AnimatedIntroText />}
          {isLoading && (
            <View>
              <ActivityIndicator size="large" color="#7D4F50" />
            </View>
          )}

          {!isLoading && authorValues.isAuthorPresent && (
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
              <View style={styles.poem}>
                <ScrollView>
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
                </ScrollView>
              </View>
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
    backgroundColor: '#D1BE9C',
  },
  mainHeader: {
    flex: 0.03,
    padding: 15,
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poemData: {
    padding: 10,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#7D4F50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poem: {
    display: 'flex',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    backgroundColor: '#AA998F',
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.6,
  },
  mainButton: {
    backgroundColor: '#7D4F50',
    bottom: 0,
  },
});

export default App;
