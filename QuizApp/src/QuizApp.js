import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

const QuizApp = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#F3DBCE', '#FFCDB2', '#FFB4A2', '#E5989B', '#B5838D', '#6D6875' ]} 
            style={styles.container}
        >
            <View style={styles.catContainer}>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('SkillTest', {category: 'technology'})}>
                        <Text style={styles.catTitle}>Computer Science</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('SkillTest', {category: 'art'})}>
                        <Text style={styles.catTitle}>Arts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('SkillTest', {category: 'sports'})}>
                        <Text style={styles.catTitle}>Sports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('SkillTest', {category: 'science'})}>
                        <Text style={styles.catTitle}>Science & Technology</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('SkillTest', {category: 'world-affairs'})}>
                        <Text style={styles.catTitle}>World Affairs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category}
                    onPress={() => navigation.navigate('SkillTest', {category: 'movies'})}>
                        <Text style={styles.catTitle}>Movies</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default QuizApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
  