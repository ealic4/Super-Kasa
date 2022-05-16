import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation";
import createDataContext from "./CreateDataContext";
import trackerApi from "../api/tracker";
import Proizvod from "../../Server/src/models/Proizvod";

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

    case "list":
      return { ...state, list: action.payload };

    case "edit":
      console.log("DODANO");
      return { ...state, edit: action.payload };

    case "dodajPos":
      console.log("DODANA POSLOVNICA");
      return { errorMessage: "", dodan: "Poslovnica uspješno dodana!" };

    case "dodajPro":
      console.log("DODAN PROIZVOD");
      return { errorMessage: "", dodan: "Proizvod uspješno dodan!" };
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
      } else if (korisnik == "AdminS") {
        RootNavigation.reset("AdminS");
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
      } else if (email == "adminS") {
        await AsyncStorage.setItem("korisnik", "AdminS");
        RootNavigation.reset("AdminS");
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
      console.log("tipKor: " + value);

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

const dodavanjePoslovnice =
  (dispatch) =>
  async ({ naziv, grad, adresa }) => {
    try {
      const response = await trackerApi.post("/dodajPos", {
        naziv,
        grad,
        adresa,
      });
      console.log(response.naziv);
      dispatch({ type: "dodajPos", payload: response.naziv });

      RootNavigation.navigate("AdminS");
    } catch (err) {
      console.log("NE RADI DODAVANJE POSLOVNICE");
      console.log(err);
      dispatch({ type: "add_error", payload: "Doslo je do greske" });
    }
  };

const dodavanjeProizvodaSkladiste =
  (dispatch) =>
  async ({ naziv, kolicina, jedinica }) => {
    try {
      console.log(naziv);
      const response = await trackerApi.post("/dodajProSkladiste", {
        naziv,
        kolicina,
        jedinica,
      });
      console.log(response.data.naziv);
      dispatch({ type: "dodajPro", payload: response.data });
    } catch (err) {
      console.log("NE RADI dodavanjeProizvodaSkladiste");
      console.log(err);
      dispatch({ type: "add_error", payload: "Doslo je do greske" });
    }
  };

const uvediProizvod = (dispatch) => async (naziv_poslovnice, stringparam) => {
  //////////////////////////////////////////////dodjeljivanje proizvoda //////////////////////////////////////////////////////
  try {
    console.log("proizvodi:"+ stringparam +" se uvode u poslovnicu "+ naziv_poslovnice)
    const response = await trackerApi.post("/uvediPro", {
      naziv_poslovnice,
      stringparam
    });
    console.log(response.data.poslovnica.naziv);
    dispatch({ type: "dodajPro", payload: response.data });
  } catch (e) {
    console.log("Ne radi uvođenje proizvoda!");
    console.log(e);
    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const izmjenaKorisnika =
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
      const response = await trackerApi.post("/korisnikEdit", {
        email,
        password,
        ime,
        prezime,
        jmbg,
        omiljenaBoja,
        omiljenaZivotinja,
        value,
      });

      console.log(email);

      RootNavigation.navigate("Admin");
    } catch (err) {
      console.log("NEEE RADI izmjenaKorisnika");
      console.log(err);

      dispatch({ type: "add_error", payload: "Doslo je do greske" });
    }
  };

const izmjenaProizvoda =
  (dispatch) =>
  async ({ nazivS, naziv, kolicina, jedinica }) => {
    try {
      const response = await trackerApi.post("/proizvodEdit", {
        nazivS,
        naziv,
        kolicina,
        jedinica,
      });

      RootNavigation.navigate("AdminS");
    } catch (err) {
      console.log("NEEE RADI izmjenaProizvoda");
      console.log(err);

      dispatch({ type: "add_error", payload: "Doslo je do greske" });
    }
  };

const obrisiProizvod = (dispatch) => async (naziv) => {
  try {
    console.log("proizvod: " + naziv);
    const response = await trackerApi.delete("/izbrisiPro/" + naziv);
    RootNavigation.reset("AdminS");
    console.log("proizvod " + naziv + " izbrisan");
  } catch (err) {
    console.log("NEEE RADI obrisiProizvod");
    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const listaKorisnika = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/korisnici");

    try {
      console.log("1:" + response.data.lista[0].id);
      dispatch({ type: "list", payload: response.data.lista });
    } catch (e) {
      const response = await trackerApi.get("/korisnici");

      dispatch({ type: "list", payload: response.data.lista });
      console.log("2: " + response.data.lista);
    }

    RootNavigation.navigate("ListaK");
  } catch (err) {
    console.log("NEEE RADI listaKorisnika");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const korisnikPod = (dispatch) => async (email) => {
  try {
    const response = await trackerApi.get("/korisnikPodaci/" + email);

    try {
      console.log(response.data.user.prezime);
      dispatch({ type: "edit", payload: response.data });
    } catch (e) {
      const response = await trackerApi.get("/korisnikPodaci/" + email);

      dispatch({ type: "edit", payload: response.data });
      console.log("2: " + response.data.user.prezime);
    }

    RootNavigation.navigate("KorisnikEdit");
  } catch (err) {
    console.log("NEEE RADI korisnikPod");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const proizvodPod = (dispatch) => async (naziv) => {
  try {
    const response = await trackerApi.get("/proizvodPodaci/" + naziv);
    try {
      console.log(response.data.proizvod.kolicina);
      dispatch({ type: "edit", payload: response.data });
    } catch (e) {
      const response = await trackerApi.get("/proizvodPodaci/" + naziv);

      dispatch({ type: "edit", payload: response.data });
      console.log("2: " + response.data.proizvod.kolicina);
    }

    RootNavigation.navigate("ProizvodEdit");
  } catch (err) {
    console.log("NEEE RADI proizvodPod");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }

  console.log(naziv);
};

const obrisiKorisnika = (dispatch) => async (email) => {
  try {
    console.log("email: " + email);

    const response = await trackerApi.delete("/izbrisi/" + email);

    RootNavigation.reset("Admin");

    console.log("RADI DODAJ");
  } catch (err) {
    console.log("NEEE RADI obrisiKorisnika");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const korisnikPod2 = (dispatch) => async () => {
  try {
    const mail = await AsyncStorage.getItem("email");

    const response = await trackerApi.get("/korisnikPodaci/" + mail);

    try {
      console.log(response.data.user.prezime);
      dispatch({ type: "edit", payload: response.data });
    } catch (e) {
      const response = await trackerApi.get("/korisnikPodaci/" + mail);

      dispatch({ type: "edit", payload: response.data });
      console.log("2: " + response.data.user.prezime);
    }

    RootNavigation.navigate("KorisnikS");
  } catch (err) {
    console.log("NEEE RADI korisnikpod2");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const izmjenaKorisnika2 =
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
      console.log("PASS " + password);

      const response = await trackerApi.post("/korisnikEdit", {
        email,
        password,
        ime,
        prezime,
        jmbg,
        omiljenaBoja,
        omiljenaZivotinja,
        value,
      });

      //dispatch({type: 'korisnikEdit', payload:response.data.token});

      console.log(email);

      RootNavigation.navigate("Korisnik");
    } catch (err) {
      console.log("NEEE RADI IZMIJENI");
      console.log(err);

      dispatch({ type: "add_error", payload: "Doslo je do greske" });
    }
  };

const listaProizvoda = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/proizvodi");

    try {
      console.log("1:" + response.data.listaP[0].proizvod.id);

      dispatch({ type: "list", payload: response.data.listaP });
    } catch (e) {
      const response = await trackerApi.get("/proizvodi");

      dispatch({ type: "list", payload: response.data.listaP });
      console.log("2: " + response.data.listaP[0].proizvod.id);
    }

    RootNavigation.navigate("ListaP");
  } catch (err) {
    console.log("NE RADI listaproizvoda!");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const ListaPoslovnica = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/poslovnice");
    try {
      console.log("1:" + response.data.listaPoslovnica[0].poslovnica.id);
      dispatch({ type: "list", payload: response.data.listaPoslovnica });
    } catch (e) {
      const response = await trackerApi.get("/poslovnice");

      dispatch({ type: "list", payload: response.data.listaPoslovnica });
      console.log("2: " + response.data.listaPoslovnica[0].poslovnica.id);
    }

    RootNavigation.navigate("ListaPoslovnica");
  } catch (err) {
    console.log("NEEE RADI listaposlovnica!");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const listaProizvodaPos = (dispatch) => async (naziv_poslovnice) => { ///////////////////////////////////////////////////////////////////////////////////////UVODJENJE PROIZVODA////////////////////////////////////////////////////////////////////////////
  try {
    console.log("otvorili smo poslovnicu "+ naziv_poslovnice)
    const response = await trackerApi.get("/proizvodi");

    try {
      console.log("1:" + response.data.listaP[0].proizvod.id);
      dispatch({ type: "list", payload: response.data.listaP });
    } catch (e) {
      const response = await trackerApi.get("/proizvodi");

      dispatch({ type: "list", payload: response.data.listaP });
      console.log("2: " + response.data.listaP[0].proizvod.id);
    }
    console.log("prosli su zahtjevi sada saljemo " + naziv_poslovnice + " na ekran")

    RootNavigation.navigateParam("PoslovnicaDodajProizvod", naziv_poslovnice);
  } catch (err) {
    console.log(err);

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};



const obrisiPoslovnicu = (dispatch) => async (poslovnicaID) => {
  try {
    const response = await trackerApi.delete("/poslovnice/" + poslovnicaID);
  } catch (err) {
    console.log("NEEE RADI birsanje poslovnice");

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

const proizvodiIzPoslovnice = (dispatch) => async (proizvodi) => {
  try {
    const response = await trackerApi.post("/proizvodi-poslovnice", {
      proizvodi: proizvodi,
    });
    return response.data;
  } catch (err) {
    console.log("Error kod odgovora rute 'proizvodi-poslovnice'");
    console.error(err);

    dispatch({ type: "add_error", payload: "Doslo je do greske" });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    signup,
    dodavanje,
    listaKorisnika,
    korisnikPod,
    korisnikPod2,
    izmjenaKorisnika,
    izmjenaKorisnika2,
    obrisiKorisnika,
    listaProizvoda,
    ListaPoslovnica,
    clearErrorMessage,
    tryLocalSignin,
    dodavanjePoslovnice,
    listaProizvodaPos,
    uvediProizvod,
    proizvodPod,
    izmjenaProizvoda,
    obrisiProizvod,
    obrisiPoslovnicu,
    dodavanjeProizvodaSkladiste,
    proizvodiIzPoslovnice,
  },

  { token: null, errorMessage: "", dodan: "", list: null, edit: "" }
);
