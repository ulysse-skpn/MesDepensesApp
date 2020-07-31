import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Picker, Button, TextInput } from 'react-native';
import { Depenses } from "../Depenses";
import DepensesActions from "./DepensesActions";


export default function DepensesList() {

    const [ expanseState ,      setExpanseState     ] = useState( Depenses );
    const [ reOrg_ , setReorg ] = useState(false);
    const [ uneDepense ,        setUneDepense       ] = useState("");
    const [ isEdited ,          setIsEdit           ] = useState( false );
    const [ isSorted ,          setIsSorted           ] = useState( false );
    const [ form,               setForm             ] = useState( false );

    const [ idState ,      setId    ] = useState(-1);
    const [ dateState ,         setDateState        ] = useState( "" );
    const [ montantState ,      setMontantState     ] = useState( "" );
    const [ lieuState ,         setLieuState        ] = useState( "" );
    const [ categorieState ,    setCategorieState   ] = useState( "" );
    const [ photoState ,        setPhotoState       ] = useState( "" );
    const [ commentaireState ,  setComentaireState  ] = useState( "" );
    let edition; let forSave;
    

    const addDepense = (id, date, montant, lieu, categorie, photo, commentaire) => {
        let laDepense = { id, date, montant, lieu, categorie, photo, commentaire }
        laDepense.id = (expanseState.length) + 1;
        laDepense.date = dateState;
        laDepense.montant = montantState;
        laDepense.lieu = lieuState;
        laDepense.categorie = categorieState;
        laDepense.photo = photoState;
        laDepense.commentaire = commentaireState;
        setExpanseState([...expanseState, laDepense]);
        setForm(false);
    }

    const deleteDepense = (depenseId) => {
        let filteredDepense = expanseState.filter( expanse => expanse.id !== depenseId );
        setExpanseState(filteredDepense);
    }

    const editDepense = () => {
        let laDepense = expanseState[idState];
        laDepense.date = dateState;
        laDepense.montant = montantState;
        laDepense.lieu = lieuState;
        laDepense.categorie = categorieState;
        laDepense.photo = photoState;
        laDepense.commentaire = commentaireState;
        setUneDepense(laDepense);
        setIsEdit(false);
    }

    const edit = (expanse) => {
        setIsEdit(true);
        setId(expanse);
    }

    const save = (expanse) => {
        setForm(true);
    }

    const reorg = (choix) => {
        let cOrg;
        switch (choix) {
            case "pDate":
                cOrg ="date";
                break;
            case "pLieu":
                cOrg ="lieu";
                break;
            case "pMontant":
                cOrg ="montant";
                break;
            case "pAlpha":
                cOrg ="commentaire";
                break;
        }

        filterDepense(cOrg);
    }

    const filterDepense = (cOrg) => {
        let newExpanseState;
        if(cOrg == "montant")
            {
                newExpanseState = expanseState.sort((a, b) => {return a.montant-b.montant});
                setExpanseState(newExpanseState);
                if(reOrg_)
                    {
                        setReorg(false);
                    }
                else{
                    setReorg(true)
                }
                // console.log(expanseState.sort((a, b) => {return a.montant-b.montant}) );
            }
        if(cOrg == "lieu")
            {
                newExpanseState = expanseState.sort((a, b) => {
                    let nameA=a.lieu.toLowerCase(), nameB=b.lieu.toLowerCase()
                    if (nameA < nameB)
                        return -1 
                    if (nameA > nameB)
                        return 1
                    return 0
                })
                setExpanseState(newExpanseState);
                if(reOrg_)
                    {
                        setReorg(false);
                    }
                else{
                    setReorg(true)
                }
            }
        if(cOrg == "commentaire")
            {
                newExpanseState = expanseState.sort((a, b) => {
                    let nameA=a.commentaire.toLowerCase(), nameB=b.commentaire.toLowerCase()
                    if (nameA < nameB)
                        return -1 
                    if (nameA > nameB)
                        return 1
                    return 0
                })
                setExpanseState(newExpanseState);
                if(reOrg_)
                    {
                        setReorg(false);
                    }
                else{
                    setReorg(true)
                }
            }
        if(cOrg == "date")
            {
                newExpanseState = expanseState.sort((a, b) => { let dateA = new Date(a.date), dateB = new Date(b.date); return dateA-dateB});
                setExpanseState(newExpanseState);
                if(reOrg_)
                    {
                        setReorg(false);
                    }
                else{
                    setReorg(true)
                }
            }
    }

    if(isEdited)
        {
            edition =
                <View>
                    <Text>Date</Text>
                    <TextInput style={styles.textInput} value={ dateState } onChangeText={ date => setDateState(date)} />
                    <Text>Montant</Text>
                    <TextInput style={styles.textInput} value={ montantState } onChangeText={ montant => setMontantState(montant) } />
                    <Text>Lieu</Text>
                    <TextInput style={styles.textInput} value={ lieuState } onChangeText={ lieu => setLieuState(lieu) } />
                    <Text>Categorie</Text>
                    <TextInput style={styles.textInput} value={ categorieState } onChangeText={ categorie => setCategorieState(categorie) } />
                    <Text>Photo</Text>
                    <TextInput style={styles.textInput} value={ photoState } onChangeText={ photo => setPhotoState(photo) } />
                    <Text>Commentaire</Text>
                    <TextInput style={styles.textInput} value={ commentaireState } onChangeText={ commentaire => setComentaireState(commentaire) } />
                    <Button title ="Enregistrer modif" onPress={ editDepense }/>
                </View>;
        }

    if(form)
        {
            forSave =
                <View>
                    <Text>Date</Text>
                    <TextInput style={styles.textInput} value={ dateState } onChangeText={ date => setDateState(date)} />
                    <Text>Montant</Text>
                    <TextInput style={styles.textInput} value={ montantState } onChangeText={ montant => setMontantState(montant) } />
                    <Text>Lieu</Text>
                    <TextInput style={styles.textInput} value={ lieuState } onChangeText={ lieu => setLieuState(lieu) } />
                    <Text>Categorie</Text>
                    <TextInput style={styles.textInput} value={ categorieState } onChangeText={ categorie => setCategorieState(categorie) } />
                    <Text>Photo</Text>
                    <TextInput style={styles.textInput} value={ photoState } onChangeText={ photo => setPhotoState(photo) } />
                    <Text>Commentaire</Text>
                    <TextInput style={styles.textInput} value={ commentaireState } onChangeText={ commentaire => setComentaireState(commentaire) } />
                </View>;
        }


    let btn = expanseState
    .map( expanse => {
        return(
            <DepensesActions onDelete={ deleteDepense } onEdit={ edit } key={ expanse.id } data={expanse}/>
        )
    })


    return(
        <View style={styles.container}>
            <View>
                <Picker style={{ height: 50, width: 150 }} onValueChange={ reorg }>
                        <Picker.Item label="Réorganiser par..." />
                        <Picker.Item label="Par Date" value="pDate" />
                        <Picker.Item label="Par Lieux" value="pLieu" />
                        <Picker.Item label="Par Montant" value="pMontant" />
                        <Picker.Item label="Par ordre alphabétique" value="pAlpha" />
                </Picker>
            </View>
            <Text style={styles.btn}>
                { btn }
            </Text>
            <View>
                { edition }
            </View>
            <View>
                { forSave }
                <Button title={ form ? "Sauvegarder dépense" : "Ajouter dépense" } onPress={  form ? addDepense : save }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    picture: { width: 50, height: 50, borderRadius: 25, marginRight: 18 },
    primaryText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        marginBottom: 4,
    },
    btn: {flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomColor:"black", borderBottomWidth:1},
    textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
});