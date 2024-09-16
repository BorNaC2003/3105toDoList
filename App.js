import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Tasks from './components/Tasks';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let completedTask = itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setCompletedTasks([...completedTasks, completedTask[0]]);
  }

  const uncompleteTask = (index) => {
    let completedTasksCopy = [...completedTasks];
    let uncompletedTask = completedTasksCopy.splice(index, 1);
    setCompletedTasks(completedTasksCopy);
    setTaskItems([...taskItems, uncompletedTask[0]]);
  }

  const deleteTask = (index, isCompleted) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            if (isCompleted) {
              let completedTasksCopy = [...completedTasks];
              completedTasksCopy.splice(index, 1);
              setCompletedTasks(completedTasksCopy);
            } else {
              let taskItemsCopy = [...taskItems];
              taskItemsCopy.splice(index, 1);
              setTaskItems(taskItemsCopy);
            }
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>To Do List</Text>

          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => completeTask(index)}
                onLongPress={() => deleteTask(index, false)}
              >
                <Tasks text={item} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Completed Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Completed Tasks</Text>

          <View style={styles.items}>
            {completedTasks.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => uncompleteTask(index)}
                onLongPress={() => deleteTask(index, true)}
              >
                <Tasks text={item} completed={true} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          placeholderTextColor="#B0B0B0"  
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', 
    marginTop: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#333',  
    borderRadius: 60,
    borderColor: '#555',  
    borderWidth: 1,
    width: 250,
    color: '#FFF',  
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#333',  
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',  
    borderWidth: 1,
  },
  addText: {
    color: '#FFF',  
  },
});
