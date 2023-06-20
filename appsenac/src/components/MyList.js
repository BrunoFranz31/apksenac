import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class MyList extends Component {
  state = {
    loading: false,
    data: [],
    current_page: 1,
    error: null,
    hasMore: true,
  };

  componentDidMount() {
    this.getListOfPictures();
  }

  getListOfPictures = () => {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    let newData = [];
    newData.push({
      title: 'Lorem ipsum',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in congue risus, non viverra tellus. Nam faucibus ligula non metus ultrices mollis. Cras dolor purus, hendrerit eu eros quis, dignissim eleifend mi. In tincidunt mi in diam egestas congue ac ut purus. Nulla semper libero vitae blandit vehicula.',
      image: require('../../src/images/img1.png'),
      id: this.state.data.length,
    });
    newData.push({
      title: 'Curabitur vulputate',
      text: 'Curabitur vulputate enim in lacus imperdiet, a convallis odio posuere. Nulla id ex et purus sodales rutrum non eu eros. Ut consequat est lacus.',
      image: require('../../src/images/img2.png'),
      id: this.state.data.length + 1,
    });
    newData.push({
      title: 'Proin hendrerit',
      text: 'Proin hendrerit nisl id turpis bibendum, sit amet scelerisque augue elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a blandit sapien.',
      image: require('../../src/images/img3.png'),
      id: this.state.data.length + 2,
    });
    this.setState((prevState) => ({
      hasMore: true,
      data: [...prevState.data, ...newData],
      loading: false,
      current_page: prevState.current_page + 1,
    }));
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };

  renderList = () => {
    return this.state.data.map((u) => (
      <TouchableOpacity key={u.id} style={styles.itemContainer}>
        <Image source={u.image} style={styles.image} />
        <Text style={styles.title}>{u.title}</Text>
        <Text style={styles.text}>{u.text}</Text>
      </TouchableOpacity>
    ));
  };

  render() {
    return (
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
            this.getListOfPictures();
          }
        }}
      >
        {this.renderList()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: '#DBF227',
    marginBottom: 8,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  title: {
    fontSize: 8,
    fontWeight: 'semi-bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    color: '#e2d9c2',
  },
});