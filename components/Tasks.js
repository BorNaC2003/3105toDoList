import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Task = (props) => {
    return (
        <View style={[styles.item, props.completed && styles.itemCompleted]}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={[styles.itemText, props.completed && styles.itemTextCompleted]}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#1E1E1E',  
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemCompleted: {
        backgroundColor: '#333',  
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#4CAF50',  
        opacity: 0.6,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        color: '#FFF',  
        maxWidth: '80%',
    },
    itemTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#B0B0B0', 
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#4CAF50',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default Task;
