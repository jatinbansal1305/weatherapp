import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {cityList, weatherParameter, longitudeList} from '../store/action';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FormPage = props => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC8pPOmaj0OT8ZZK6evRzfxD9T_Wtnh-1Y';
  const navigation = useNavigation();
  const [city, setcityname] = useState({
    cityname : "",
    lat : "",
    long : "",

  });
  const [citylist, setcityList] = useState([]);
  const [latitude, setLatitude] = useState();
  const [latitudelist, setlatitudeList] = useState([]);
  const [longitude, setLongitude] = useState();
  const [longitudelist, setlongitudeList] = useState([]);
  // const [x,setX]=useState("");
  // const [y,setY]=useState("");
  // const [z,setZ]=useState("");

  const clickhandler = () => {
    props.setCityList(citylist);
   
    navigation.navigate('Parameter');
  };
  const removeGoal = goalId => {
    
    
    setcityList(courseGoals => {
      return courseGoals.filter((goal,index) => index.toString() !== goalId);
    });
  };
  var x = city;
  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        placeholder="Type city..."
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        onPress={(data, details = null) => {
          
          setcityname({
            cityname : data.description,
            lat : details.geometry.location.lat,
            long : details.geometry.location.lng,
          });
          setLatitude(details.geometry.location.lat);
          setLongitude(details.geometry.location.lng);
        }}
        fetchDetails={true}
        returnKeytype={'search'}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={4}
      />

      <TouchableOpacity
        onPress={() => {
          setcityList([...citylist, city]);
          setlatitudeList([...latitudelist, latitude]);
          setlongitudeList([...longitudelist, longitude]);
        }}
        style={styles.submit}
        underlayColor="#fff">
        <Text style={styles.submitText}>Add Location </Text>
      </TouchableOpacity>

      <FlatList
        data={citylist}
        keyExtractor = {(item, index) => index.toString() }
        renderItem={({item,index}) => (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.buttonStyle}>
              <View>
                <Text style={styles.playerName}>{item.cityname}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=>removeGoal(index.toString())} style={[{padding:16},styles.removebutton]}>
              <Text style={[styles.submitText,{color:'white'}]}>remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => {
          setcityList([]);
          setlatitudeList([]);
          setlongitudeList([]);
        }}
        style={[
          styles.submit,
          {position: 'absolute', top: 650, right: 250, paddingHorizontal: 24},
        ]}
        underlayColor="#fff">
        <Text style={styles.submitText}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clickhandler}
        style={[
          styles.submit,
          {position: 'absolute', top: 650, left: 50, paddingHorizontal: 24},
        ]}
        underlayColor="#fff">
        <Text style={styles.submitText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCityList: citylist => dispatch(cityList(citylist)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submit: {
    marginRight: 20,
    marginLeft: 220,
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
    marginHorizontal: 16,
    
  },
  removebutton : {

    marginVertical: 20,
    paddingVertical :16,
    backgroundColor: 'red',
    borderRadius: 200,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
