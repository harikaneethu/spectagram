import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostScreen from './PostScreen';
import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.props.navigation.navigate('PostScreen', {
              story: this.props.story,
            });
          }}>
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>
            <SafeAreaView style={styles.droidSafeArea} />
            <View style={styles.cardContainer}>
              <View style={styles.storyImage}>
                <Image
                  source={require('../assets/image_1.jpg')}
                  style={{
                    width: Dimensions.get('window').width - 60,
                    height: 250,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View>
                <View style={styles.titleContainer}>
                  <View style={styles.titleTextContainer}>
                    <View style={styles.storyTitle}>
                      <Text
                        style={
                          this.state.light_theme
                            ? styles.storyTitleTextLight
                            : styles.storyTitleText
                        }>
                        {this.props.story.title}
                      </Text>
                    </View>
                    <View style={styles.storyAuthor}>
                      <Text
                        style={
                          this.state.light_theme
                            ? styles.storyAuthorTextLight
                            : styles.storyAuthorText
                        }>
                        {this.props.story.author}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.captionTextLight
                        : styles.captionText
                    }>
                    {this.props.story.caption}
                  </Text>
                </View>
                <View style={styles.actionConatiner}>
                  <View style={styles.likeButton}>
                    <Ionicons
                      name={'heart'}
                      size={RFValue(30)}
                      color={this.state.light_theme ? 'black' : 'white'}
                      style={{ width: 20, marginLeft: 30, marginTop: 5 }}
                    />
                    <View>
                      <Text
                        style={
                          this.state.light_theme
                            ? styles.likeTextLight
                            : styles.likeText
                        }>
                        120k
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainer: {
    marginTop: -20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 10,
    height: undefined,
    backgroundColor: 'lightblue',
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  storyImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '95%',
    height: RFValue(250),
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleTextContainer: {
    flex: 1,
  },
  storyTitleText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 25,
    color: 'white',
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  storyAuthorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 18,
    color: 'white',
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  descriptionContainer: {
    marginTop: 5,
  },
  captionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'black',
  },
  captionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black"
  },
  actionConatiner: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 160,
    height: 40,
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: '#eb3948',
  },
  likeText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 25,
    marginTop: 6,
    marginLeft: 25,
    color: 'black',
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
