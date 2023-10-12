import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const QuizApp = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.catContainer}>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('Playground', {category: 'world-affairs'})}>
                        <Text style={styles.catTitle}>World Affairs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('Playground', {category: 'science'})}>
                        <Text style={styles.catTitle}>Science & Technology</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('Playground', {category: 'technology'})}>
                        <Text style={styles.catTitle}>Computer Science</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('Playground', {category: 'sports'})}>
                        <Text style={styles.catTitle}>Sports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('Playground', {category: 'literature'})}>
                        <Text style={styles.catTitle}>Literature</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('Playground', {category: 'movies'})}>
                        <Text style={styles.catTitle}>Movies</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default QuizApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    category: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    catTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
    },
});
  