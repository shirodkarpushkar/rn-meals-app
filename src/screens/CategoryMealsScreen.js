import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {CATEGORIES, MEALS} from '../data/dummy-data';
const CategoriesMealsScreen = props => {
  const {categoryId} = props.route.params;
  const category = CATEGORIES.find(el => el.id === categoryId);
  useEffect(() => {
    props.navigation.setOptions({title: category.title});
  });
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const meals = availableMeals.filter(
    el => el.categoryIds.indexOf(categoryId) >= 0
  );
  if (!meals.length) {
    return (
      <View style={styles.screen}>
        <Text style={styles.mealDetailsText}>
          No meals found. Please check your filters.
        </Text>
      </View>
    );
  }

  const renderMealItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => routeTo(props, item)}
        style={styles.mealItem}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground
              source={{uri: item.imageURL}}
              style={styles.bgImage}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetails}}>
            <Text style={styles.mealDetailsText}>{item.duration}m</Text>
            <Text style={styles.mealDetailsText}>
              {item.complexity.toUpperCase()}
            </Text>
            <Text style={styles.mealDetailsText}>
              {item.affordability.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={meals}
        renderItem={renderMealItem}
        style={{width: styles.mealItem.width}}
      />
    </View>
  );
};

const routeTo = (props, item) => {
  props.navigation.navigate('MealDetails', {
    mealId: item.id,
  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  mealHeader: {
    height: '85%',
  },
  mealDetails: {
    paddingHorizontal: 10,
    height: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealDetailsText: {
    fontFamily: 'OpenSans-Regular',
  },
  mealContainer: {},
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});
export default CategoriesMealsScreen;
