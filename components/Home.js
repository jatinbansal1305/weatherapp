import {SafeAreaView, StyleSheet, Text, View,FlatList,TouchableOpacity, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Table, TableWrapper, Row, Rows, Col, Cols } from 'react-native-table-component';


const Home = (props) => {
  const navigation=useNavigation();
  console.log("props",props.longitudeList);
  const sz=props.longitudeList[0].length;
  console.log("sz",sz);
  const height=Array(sz).fill(30);
  console.log(height);
  return (

    <SafeAreaView>
       <View style={styles.container}>
       
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={props.latitudeList} flexArr={[1, 1, 1, 1]}  style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={{flex:1}}>
            <Cols data={props.longitudeList} heightArr={height} textStyle={styles.text}/>
          </TableWrapper>

          
        </Table>
      
      </View>
      <TouchableOpacity
        onPress={() => {
         navigation.navigate('FormPage');
        }}
        style={[
          styles.submit,
          {position: 'absolute', top: 650, right: 100, paddingHorizontal: 10},
        ]}
        underlayColor="#fff">
        <Text style={styles.submitText}>Start Over Again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const mapStateToProps= state =>{
    return {
        cityList : state.cityList,
        latitudeList : state.weatherParameterList,
        longitudeList : state.cityNameList
    }
    }
  

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  playerName: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'space-between',
  },

  buttonStyle: {
    flex: 1,
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    shadowOffset: {
      height: 0.4,
      width: 0.4,
    },
    shadowColor: '#2E2E2E',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 24,
  },
  submit: {
    marginRight: 20,
    marginLeft: 200,
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  container: {  padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: {  backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
