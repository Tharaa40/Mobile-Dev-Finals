import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeCategories({ categories, selectedCategory, fetchCategoryMeals }){
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabs}
        >
            {categories.map((category) => (
                <Button
                    key={category.idCategory}
                    mode={selectedCategory === category.strCategory ? 'contained' : 'outlined'}
                    onPress={() => fetchCategoryMeals(category.strCategory)}
                    style={styles.tab}
                    labelStyle={selectedCategory === category.strCategory ? styles.activeTabText : styles.tabText}
                >
                    {category.strCategory}
                </Button>
            ))}
        </ScrollView>
    );
}

    
const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    tab: {
        marginHorizontal: 5,
    },
    tabText: {
        color: 'black',
    },
    activeTabText: {
        color: 'white',
    },
});


