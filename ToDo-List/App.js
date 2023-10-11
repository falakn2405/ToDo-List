import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import TodoList from './components/ToDoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default class App extends React.Component {
  state ={ 
    addTodoVisible: false,
    lists: [],
    loading: true,
  }
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        console.error("Firebase initialization error:", error);
        return alert('Uh oh, something went wrong during Firebase initialization!');
      }
  
      firebase.getLists(lists => {
        if (lists === null) {
          console.error("Error fetching lists from Firebase or lists are empty.");
        } else {
          this.setState({ lists, loading: false });
        }
      });
    });
  }
  
  componentWillUnmount() {
    firebase.detach();
  }
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = list => { 
    return <TodoList list={list} updateList={this.updateList} />
  } 
  addList = list => { 
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: []
    })
  }
  updateList = list => {
    firebase.updateList(list);
  }

  render() {
    if(this.state.loading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator size='large' color={colors.black} />
        </View>
      )
    }
    return (
      <GestureHandlerRootView style={{flex:1}}>
        <View style={styles.container}> 

          <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
            <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
          </Modal>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.divider} />
            <Text style={styles.title}>
              Todo <Text style={{ fontWeight: '300', color: colors.blue}}>Lists</Text>
            </Text>
            <View style={styles.divider} />
          </View>
    
          <View style={{ marginVertical: 48 }}>
            <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
              <AntDesign name='plus' size={16} color={colors.blue} />
            </TouchableOpacity>
            <Text style={styles.add}>Add List</Text>
          </View>
    
          <View style={{ height: 275, paddingLeft: 32}}>
            <FlatList 
              data={this.state.lists}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => this.renderList(item) }
              keyboardShouldPersistTaps='always'
            />
          </View>

        </View>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
