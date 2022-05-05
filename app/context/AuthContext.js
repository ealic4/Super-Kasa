import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";
import createDataContext from "./CreateDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };

    case "signin":
      return { errorMessage: "", token: action.payload };

    case "clear":
      return { dodan: "", errorMessage: "" };

    case "signout":
      return { token: null, errorMessage: "" };

    case "dodaj":
      return { errorMessage: "", dodan: "Korisnik uspješno dodan!" };

    case 'list':
          return {...state, list: action.payload};

    case 'edit':
          console.log("DODANO")
          return {...state, edit: action.payload};

    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const korisnik = await AsyncStorage.getItem("korisnik");

  if (token) {
    dispatch({ type: "signin", payload: token });
    if (korisnik) {
      if (korisnik == "Admin") {
        RootNavigation.reset("Admin");
      } else {
        RootNavigation.reset("Korisnik");
      }
    }
  } else {
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear" });
};

const signup =
  (dispatch) =>
  async ({
    email,
    password,
    ime,
    prezime,
    jmbg,
    omiljenaBoja,
    omiljenaZivotinja,
  }) => {
    try {
      const response = await trackerApi.post("/signup", {
        email,
        password,
        ime,
        prezime,
        jmbg,
        omiljenaBoja,
        omiljenaZivotinja,
      });

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("id", response.data.id);
      await AsyncStorage.setItem("email", response.data.email);
      dispatch({ type: "signin", payload: response.data.token });
      await AsyncStorage.setItem("korisnik", "Korisnik");

      RootNavigation.reset("Korisnik");
    } catch (err) {
      dispatch({ type: "add_error", payload: "Doslo je do greske" });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("email", response.data.email);
      await AsyncStorage.setItem("id", response.data.id);
      dispatch({ type: "signin", payload: response.data.token });

      if (email == "admin") {
        await AsyncStorage.setItem("korisnik", "Admin");
        RootNavigation.reset("Admin");
      } else {
        RootNavigation.reset("Korisnik");
        await AsyncStorage.setItem("korisnik", "Korisnik");
      }
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Doslo je do greske",
      });
    }
  };

const signout = (dispatch) => async () => {
  let user = {
    id: await AsyncStorage.getItem("id"),
    email: await AsyncStorage.getItem("email"),
  };

  trackerApi.post("/singout", user);

  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("korisnik");
  await AsyncStorage.removeItem("id");
  await AsyncStorage.removeItem("email");

  dispatch({ type: "signout" });

  RootNavigation.navigate("SignUp");
};

const dodavanje =
  (dispatch) =>
  async ({
    email,
    password,
    ime,
    prezime,
    jmbg,
    omiljenaBoja,
    omiljenaZivotinja,
    value,
  }) => {
    try {
      console.log("tipKor: "+value)

      const response = await trackerApi.post("/dodaj", {
        email,
        password,
        ime,
        prezime,
        jmbg,
        omiljenaBoja,
        omiljenaZivotinja,
        value,
      });

      dispatch({ type: "dodaj", payload: response.data.token });

      console.log("DODANO");
    } catch (err) {
      console.log("NEEE RADI DODAJ");
      console.log(err);

      dispatch({ type: "add_error", payload: "Doslo je do greske" });
        
    }

};

const izmjenaKorisnika = dispatch => async ({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value}) => {

    try {

        const response = await trackerApi.post('/korisnikEdit', {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value});

        //dispatch({type: 'korisnikEdit', payload:response.data.token});

        console.log(email)

        RootNavigation.navigate("Admin");

    
    } catch(err) {
        console.log("NEEE RADI IZMIJENI")
        console.log(err)

        dispatch({type: 'add_error', payload: 'Doslo je do greske'});
    }
    

}


const listaKorisnika = dispatch => async ()=>{

    try {
        
        const response = await trackerApi.get('/korisnici')


        try{
            console.log("1:"+ response.data.lista[0].id )
            dispatch({type: 'list', payload: response.data.lista  })
    
        }
        catch(e){
            
            const response = await trackerApi.get('/korisnici')

            dispatch({type: 'list', payload: response.data.lista  })
            console.log("2: "+ response.data.lista )


        }

        RootNavigation.navigate('ListaK');
     

    } catch (err) {

        console.log("NEEE RADI DODAJ")

        dispatch({type: 'add_error', payload: 'Doslo je do greske'});

    }

};

const korisnikPod = dispatch => async (email)=>{

    try {
        
        const response = await trackerApi.get('/korisnikPodaci/'+ email )        

        try{
        console.log( response.data.user.prezime )
        dispatch({type: 'edit', payload: response.data  })

        }
        catch(e){

            const response = await trackerApi.get('/korisnikPodaci/'+ email )
        
            dispatch({type: 'edit', payload: response.data  })
            console.log("2: "+ response.data.user.prezime )


        }
  
        RootNavigation.navigate('KorisnikEdit');
     
    
    } catch (err) {

        console.log("NEEE RADI DODAJ")

        dispatch({type: 'add_error', payload: 'Doslo je do greske'});
    }
  };


  const obrisiKorisnika = dispatch => async (email)=>{

    try {

      console.log("email: "+email)
        
        const response = await trackerApi.delete('/izbrisi/'+ email );

        RootNavigation.reset('Admin');

        console.log("RADI DODAJ")


    } catch (err) {

      console.log("NEEE RADI DODAJ")

        
        dispatch({type: 'add_error', payload: 'Doslo je do greske'});

    }

};

const korisnikPod2 = dispatch => async ()=>{

  try {
    
      const mail = await AsyncStorage.getItem("email");

      
      const response = await trackerApi.get('/korisnikPodaci/'+ mail )        

      try{
      console.log( response.data.user.prezime )
      dispatch({type: 'edit', payload: response.data  })

      }
      catch(e){

          const response = await trackerApi.get('/korisnikPodaci/'+ mail )
      
          dispatch({type: 'edit', payload: response.data  })
          console.log("2: "+ response.data.user.prezime )


      }

      RootNavigation.navigate('KorisnikS');
   
  
  } catch (err) {

      console.log("NEEE RADI DODAJ")

      dispatch({type: 'add_error', payload: 'Doslo je do greske'});
  }
};

const izmjenaKorisnika2 = dispatch => async ({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value}) => {

  try {

      console.log("PASS "+ password)

      const response = await trackerApi.post('/korisnikEdit', {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value});

      //dispatch({type: 'korisnikEdit', payload:response.data.token});

      console.log(email)

      RootNavigation.navigate("Korisnik");

  
  } catch(err) {
      console.log("NEEE RADI IZMIJENI")
      console.log(err)

      dispatch({type: 'add_error', payload: 'Doslo je do greske'});
  }
  

}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, dodavanje, listaKorisnika, korisnikPod, korisnikPod2, izmjenaKorisnika, izmjenaKorisnika2, obrisiKorisnika, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "", dodan: "", list:null, edit:''}
);
