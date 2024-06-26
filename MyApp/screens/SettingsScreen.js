import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';

const Footer = ({ navigation, isDarkTheme }) => {
  const route = useRoute();

  const getTintColor = (screenName) => {
    return route.name === screenName ? '#007bff' : isDarkTheme ? '#fff' : '#000';
  };

  return (
    <View style={[styles.footer, isDarkTheme && styles.darkFooter]}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/Home.png')}
            style={[styles.footerIcon, { tintColor: getTintColor('Home') }]}
          />
          <Text style={[styles.iconLabel, { color: getTintColor('Home') }]}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cards')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/Mycards.png')}
            style={[styles.footerIcon, { tintColor: getTintColor('Cards') }]}
          />
          <Text style={[styles.iconLabel, { color: getTintColor('Cards') }]}>Cards</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/statistics.png')}
            style={[styles.footerIcon, { tintColor: getTintColor('Stats') }]}
          />
          <Text style={[styles.iconLabel, { color: getTintColor('Stats') }]}>Stats</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/Settings.png')}
            style={[styles.footerIcon, { tintColor: getTintColor('Settings') }]}
          />
          <Text style={[styles.iconLabel, { color: getTintColor('Settings') }]}>Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const getArrowColor = () => {
    return isDarkTheme ? '#fff' : '#000';
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={[styles.contentContainer, isDarkTheme && styles.darkContentContainer]}>
        <Text style={[styles.title, isDarkTheme && styles.darkText]}>Settings</Text>
        {['Language', 'My Profile', 'Contact Us', 'Change Password', 'Privacy Policy'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.setting} onPress={() => console.log(item)}>
            <Text style={[styles.settingText, isDarkTheme && styles.darkText]}>{item}</Text>
            {item !== 'Theme' && (
              <View style={styles.arrowContainer}>
                <Text style={{ color: getArrowColor(), fontSize: 28, fontWeight: 'bold' }}> {'>'} </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        <View style={styles.setting}>
          <Text style={[styles.settingText, isDarkTheme && styles.darkText]}>Theme</Text>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
      </View>
      
      <Footer navigation={navigation} isDarkTheme={isDarkTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#000435',
  },
  title: {
    fontSize: 25,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  darkText: {
    color: '#fff',
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  arrowContainer: {
    width: 60, // Adjust this value to ensure consistent spacing
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    borderTopWidth: 0,
    borderTopColor: '#ccc',
  },
  darkFooter: {
    backgroundColor: '#080E4B',
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default SettingsScreen;
