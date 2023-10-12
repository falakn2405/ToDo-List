import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';

export default class AddListModal extends React.PureComponent {
    backgroundColors = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559']
    state = { 
        name: '', 
        color: this.backgroundColors[0] 
    }
    createTodo = () => {
        const { name, color } = this.state;
        const list = { name, color };
        this.props.addList(list);
        this.setState({name: ''});
        this.props.closeModal();
    }
    renderColors() {
        return this.backgroundColors.map(color => {
            return(
                <TouchableOpacity key={color}
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={() => this.setState({ color })} />
            )
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../img/create.png')} resizeMode='cover' style={styles.image}>
                
                    <TouchableOpacity style={{ position: 'absolute', top: 62, right: 30}} 
                        onPress={this.props.closeModal}>
                        <AntDesign name="close" size={30} color={colors.black} />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'stretch', marginHorizontal: 38}}>
                        <Text style={styles.title}>Create Todo List</Text>
                        
                        <TextInput style={styles.input} placeholder="List Name?" 
                            onChangeText={text => this.setState({name:text})} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                            {this.renderColors()}</View>

                        <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]}
                            onPress={this.createTodo}>
                            <Text style={{ color: colors.white, fontWeight: '600' }}>Create!</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 35,
    },
    input: {
        borderWidth: 3,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        paddingHorizontal: 25,
        fontSize: 20,
        fontWeight: '400'
    },
    create:{
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect: {
        paddingTop: 15,
        width: 30,
        height: 30,
        borderRadius: 4,
    },
})