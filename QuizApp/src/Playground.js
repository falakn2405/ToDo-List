import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { firebase } from '../config'

const Playground = ({ route }) => {
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState({});
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const { category } = route.params

    useEffect(() => {
        getQuestions()
    }, [])

    const getQuestions = async() => {
        setOptions({});
        setResult(false);
        const db = firebase.firestore();
        const questionsRef = db.collection('question');
        const snapshot = await questionsRef.where('category', '==', category).get()
        if(snapshot.empty) {
            console.log('No matching documnts..');
            return;
        }
        const allQuestions = snapshot.docs.map(doc => doc.data());
        const shuffleQues = allQuestions.sort(() => 0.5 - Math.random());
        setQuestions(shuffleQues.slice(0,10));
    }

    const handleOptions = (questionIndex, option) => {
        setOptions({
            ...options,
            [questionIndex]: option,
        });
    }

    const handleSubmit = () => {
        let correctAnswer = 0;
        questions.forEach((question, index) => {
            if(options[index] === question.correctOption) {
                correctAnswer++;
            }
        });
        setScore(correctAnswer);
        setResult(true);
    }

    return (
        <LinearGradient colors={['#419197', '#78D6C6', '#F5FCCD']}
            style={styles.container}
        >
            <FlatList data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                    <View style={styles.quesContainer}>
                        <Text style={styles.question}>
                            {item.question}
                        </Text>
                        <TouchableOpacity style={[styles.option,
                            options[index] === 1 && styles.selected,
                            result && item.correctOption === 1 && styles.correct,
                            result && options[index] === 1 && options[index] !== item.correctOption && styles.wrong,
                            ]} 
                            onPress={() => handleOptions(index, 1)} 
                            disabled={result}>
                                <Text>{item.option1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option,
                            options[index] === 2 && styles.selected,
                            result && item.correctOption === 2 && styles.correct,
                            result && options[index] === 2 && options[index] !== item.correctOption && styles.wrong,
                            ]} 
                            onPress={() => handleOptions(index, 2)} 
                            disabled={result}>
                                <Text>{item.option2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option,
                            options[index] === 3 && styles.selected,
                            result && item.correctOption === 3 && styles.correct,
                            result && options[index] ===  3 && options[index] !== item.correctOption && styles.wrong,
                            ]} 
                            onPress={() => handleOptions(index, 3)} 
                            disabled={result}>
                                <Text>{item.option3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option,
                            options[index] === 4 && styles.selected,
                            result && item.correctOption === 4 && styles.correct,
                            result && options[index] === 4 && options[index] !== item.correctOption && styles.wrong,
                            ]} 
                            onPress={() => handleOptions(index, 4)} 
                            disabled={result}>
                                <Text>{item.option4}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button}
                onPress={handleSubmit}
                disabled={result}>
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
                    <Text style={styles.btnText}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>
            { result && (
                <View style={styles.result}>
                    <Text style={styles.resText}>
                        You scored {score} out of {questions.length}
                    </Text>
                    <TouchableOpacity style={styles.tryButton}
                        onPress={getQuestions}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.tryButton}>
                            <Text style={styles.tryAgain}>Try Again</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </LinearGradient>
    )
}

export default Playground

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quesContainer: {
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.48,
        elevation: 5,
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    option: {
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    selected: {
        backgroundColor: '#949494',
    },
    correct: {
        backgroundColor: '#56e356',
    },
    wrong:{
        backgroundColor: '#f74d4d',
    },
    button: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
    result: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    resText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tryButton: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    tryAgain: {
        color: '#fff',
        fontSize: 20,
    },
});
  