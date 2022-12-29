import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {cityNameList, weatherParameter} from '../store/action';
import { useDispatch ,connect} from 'react-redux';

const temp='temperature_80m';
const precp='precipitation';

const winds='windspeed_80m';

const Parameter = (props) => {
    const dispatch=useDispatch();
  const navigation = useNavigation();
  const [Wind, setWind] = useState(false);
  const [Temperature, setTemperature] = useState(false);
  const [Precipitation, setPrecipitation] = useState(false);
  const [Dust, setDust] = useState(false);

  const weatherparameterlist=["Location"];
  const clickhandler=async()=>{
    
    if(Temperature)
    {
        weatherparameterlist.push(temp);

    }
    if(Precipitation)
    weatherparameterlist.push(precp);
    
    if(Wind==true)
    weatherparameterlist.push(winds);
    tablelist.push(citynamelist);
    props.setWeatherParameterList(weatherparameterlist);
    for(var i=1;i<weatherparameterlist.length;i++)
    {
        const col=[];
        for(var j=0;j<props.cityList.length;j++)
        {
            
            const url=`https://api.open-meteo.com/v1/forecast?latitude=${props.cityList[j].lat}&longitude=${props.cityList[j].long}&hourly=${weatherparameterlist[i]}`;
           
            const response=await fetch(url);
            const json=await response.json();
           
            const x=json.hourly[weatherparameterlist[i]];
           
            var sum=0;
            for(var k=0;k<x.length;k++)
            {
                sum+=x[k];
            }
            sum/=x.length;
            col.push(sum.toFixed(2));
        }
        console.log("col",col);
        tablelist.push(col);
    }
     props.setWeatherParameterList(weatherparameterlist);
     props.setCityNameList(tablelist);
     console.log("before",tablelist);
     navigation.navigate('Home');
  }
  const citynamelist=[];
  const tablelist=[];
  console.log(props.cityList);
  useEffect(() => {
    
    for(var i=0;i<props.cityList.length;i++)
    {
      console.log(props.cityList[i].cityname);
      citynamelist.push(props.cityList[i].cityname);
    }
    console.log(citynamelist);
  })
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 28,
            padding: 30,
            paddingLeft: 60,
            fontWeight: 'bold',
          }}>
          Weather Parameters
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.buttonStyle}>
          <CheckBox
            disabled={false}
            value={Wind}
            onValueChange={newValue => setWind(newValue)}
          />

          <View>
            <Text style={styles.playerName}>Wind Speed</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.buttonStyle}>
          <CheckBox
            disabled={false}
            value={Temperature}
            onValueChange={newValue => setTemperature(newValue)}
          />

          <View>
            <Text style={styles.playerName}>Temperature</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.buttonStyle}>
          <CheckBox
            disabled={false}
            value={Precipitation}
            onValueChange={newValue => setPrecipitation(newValue)}
          />

          <View>
            <Text style={styles.playerName}>Precipitation</Text>
          </View>
        </View>
      </View>
     
      <TouchableOpacity
        onPress={clickhandler}
        style={[
            
          styles.submit,
          {position: 'absolute', top: 550, right :116, paddingHorizontal: 24},
        ]}
        underlayColor="#fff">
        <Text style={styles.submitText}>submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {navigation.navigate('FormPage')}}
        style={[
          styles.submit,
          {position: 'absolute', top: 650, right: 220, paddingHorizontal: 24},
        ]}
        underlayColor="#fff">
        <Text style={styles.submitText}>Previous</Text>
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
    cityList : state.cityList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWeatherParameterList: weatherparameterlist =>
      dispatch(weatherParameter(weatherparameterlist)),
      setCityNameList : citynamelist=>dispatch(cityNameList(citynamelist)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Parameter);

const styles = StyleSheet.create({
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
    fontSize: 28,
    paddingLeft: 24,
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
});
