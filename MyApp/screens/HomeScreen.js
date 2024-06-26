import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import appleLogo from '../assets/apple.png';
import spotifyLogo from '../assets/spotify.png';
import exchangeLogo from '../assets/Money Transfer.png';
import shoppingCartLogo from '../assets/Grocery.png';

const Footer = ({ navigation, isDarkTheme }) => {
  const route = useRoute();
  const currentRoute = route.name;

  const getIconColor = (screen) => {
    return currentRoute === screen ? '#007bff' : (isDarkTheme ? '#fff' : '#000');
  };

  const navigationItems = [
    { name: 'Home', image: require('../assets/Home.png'), screen: 'Home' },
    { name: 'Cards', image: require('../assets/Mycards.png'), screen: 'Cards' },
    { name: 'Stats', image: require('../assets/statistics.png'), screen: 'Stats' },
    { name: 'Settings', image: require('../assets/Settings.png'), screen: 'Settings' },
  ];

  return (
    <View style={[styles.footer, isDarkTheme && styles.darkFooter]}>
      {navigationItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.screen)}
          style={styles.iconContainer}
        >
          <Image source={item.image} style={[styles.iconImage, { tintColor: getIconColor(item.screen) }]} />
          <Text style={[styles.iconLabel, { color: getIconColor(item.screen) }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDarkTheme } = useContext(ThemeContext);

  const actionLogos = {
    Sent: require('../assets/Sent.png'),
    Receive: require('../assets/recieve.png'),
    Loan: require('../assets/Loan.png'),
    Topup: require('../assets/TopUp.png'),
  };

  const transactions = [
    { name: 'Apple Store', category: 'Entertainment', amount: '- $5.99', logo: appleLogo, applyTint: true },
    { name: 'Spotify', category: 'Music', amount: '- $12.99', logo: spotifyLogo, applyTint: false },
    { name: 'Money Transfer', category: 'Transaction', amount: '$300', logo: exchangeLogo, positive: true, applyTint: false, darkModeTint: true },
    { name: 'Grocery', category: 'Shopping', amount: '- $88', logo: shoppingCartLogo, applyTint: false },
  ];

  return (
    <ScrollView style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image style={styles.profileImage} source={require('../assets/profile.png')} />
          <View>
            <Text style={[styles.welcomeText, isDarkTheme && styles.darkText]}>Welcome back,</Text>
            <Text style={[styles.userName, isDarkTheme && styles.darkText]}>Righteous Bidahor Mawudem</Text>
          </View>
        </View>
        <Image source={require('../assets/search.png')} style={[styles.searchIcon, { tintColor: isDarkTheme ? '#fff' : '#000' }]} />
      </View>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={require('../assets/Card.png')} />
      </View>
      <View style={styles.actions}>
        {['Sent', 'Receive', 'Loan', 'Topup'].map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <Image source={actionLogos[action]} style={[styles.actionLogo, isDarkTheme && { tintColor: '#fff' }]} />
            <Text style={[styles.actionText, isDarkTheme && styles.darkText]}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.transactions}>
        <View style={styles.transactionHeader}>
          <Text style={[styles.transactionTitle, isDarkTheme && styles.darkText]}>Transaction</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, isDarkTheme && { color: '#007bff' }]}>See All</Text>
          </TouchableOpacity>
        </View>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transaction}>
            <Image 
              source={transaction.logo} 
              style={[
                styles.transactionLogo, 
                transaction.applyTint && isDarkTheme && { tintColor: '#fff' },
                transaction.darkModeTint && isDarkTheme && { tintColor: '#fff' }
              ]}
            />
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionName, isDarkTheme && styles.darkText]}>{transaction.name}</Text>
              <Text style={[styles.transactionCategory, isDarkTheme && styles.darkText]}>{transaction.category}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                transaction.positive && { color: '#007bff' }, // Specifically apply #007bff color for positive amounts
                isDarkTheme && transaction.positive && { color: '#007bff' }, // Change to light blue in dark mode
                isDarkTheme && !transaction.positive && styles.darkText, // Apply dark text for negative amounts in dark mode
              ]}
            >
              {transaction.amount}
            </Text>
          </View>
        ))}
      </View>

      <Footer navigation={navigation} isDarkTheme={isDarkTheme} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  darkContainer: {
    backgroundColor: '#000435',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 15,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: '#808080', // Default color for light mode
  },
  darkText: {
    color: '#fff', // Default color for dark mode
  },
  userName: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLogo: {
    marginBottom: 20,
  },
  actionText: {
    color: '#050505',
    fontSize: 18,
  },
  transactions: {
    padding: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007bff',
    fontSize: 14,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 20,
  },
  transactionLogo: {
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 23,
    color: '#333',
  },
  transactionCategory: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f0f2f5',
  },
  darkFooter: {
    backgroundColor: '#080E4B',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginTop: 40,
  },
});

export default HomeScreen;
