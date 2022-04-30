import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../RootNavigation';
import createDataContext from "./CreateDataContext";
import trackerApi from '../api/tracker'

const authReducer=(state, action)=>{
 
    switch(action.type){

        case 'add_error':
            return {...state, errorMessage: action.payload};

        case 'signin':
            return {errorMessage:'', token: action.payload};

        case 'clear':
            return {dodan:'', errorMessage:''};
        
        case 'signout':
            return {token:null, errorMessage:''};
        
        case 'dodaj':
            return {errorMessage:'', dodan:'Korisnik uspješno dodan!'};

        default:
            return state;

    }

};

const tryLocalSignin = dispatch => async() => {

    const token = await AsyncStorage.getItem('token');
    const korisnik = await AsyncStorage.getItem('korisnik');

    if(token){

        dispatch({type:'signin', payload: token});
        if (korisnik) {

            if (korisnik=="Admin") {
                RootNavigation.reset('Admin');
            }
            else {
                RootNavigation.reset('Korisnik');
            }

        }
    }
    else{
    }
};


const clearErrorMessage = dispatch => () => {

    dispatch({type:'clear'});
}

const signup = dispatch => async ({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja})=>{

    try {
        
        const response = await trackerApi.post('/signup', {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja});

        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload:response.data.token});
        await AsyncStorage.setItem('korisnik', "Korisnik");

        RootNavigation.reset('Korisnik');



    } catch (err) {
        
        dispatch({type: 'add_error', payload: 'Doslo je do greske'});

    }

};



const signin= dispatch => async ({email, password})=>{

    try {
        
        const response = await trackerApi.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload:response.data.token})

        if (email=='admin') {
            await AsyncStorage.setItem('korisnik', "Admin");
            RootNavigation.reset('Admin');
        }
        else {
            RootNavigation.reset('Korisnik');
            await AsyncStorage.setItem('korisnik', "Korisnik");
        }



       
    } catch (error) {

        dispatch({
            type: 'add_error',
            payload: 'Doslo je do greske'
        });

    }

};



const signout = dispatch => async ()=>{

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('korisnik');

    dispatch({type: 'signout'})

    RootNavigation.navigate('SignUp');


};

const dodavanje = dispatch => async ({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja})=>{

    try {
        
        const response = await trackerApi.post('/dodaj', {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja});

        dispatch({type: 'dodaj', payload:response.data.token});

        console.log("DODANO")


    } catch (err) {
        console.log("NEEE RADI DODAJ")

        dispatch({type: 'add_error', payload: 'Doslo je do greske'});

    }

};


export const {Provider, Context} = createDataContext(

    authReducer,
    {signin, signout, signup, dodavanje, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage:'', dodan:''}

);