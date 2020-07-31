import React, { useState } from 'react';
import { StyleSheet, View , Text , Button } from 'react-native';

export default function DepensesActions(props) {
    const {id , date, montant, lieu, categorie, photoFact, commentaire } = props.data;

    return(
        <View style={{ flexDirection:"row"}}>
            {/* Envoie un event au parent */}
    <Text>date:{ date }     lieux:{ lieu }    commentaire:{ commentaire }   montant:{montant}€  date:{date}</Text>
            <Button title="Suppr" onPress={() => props.onDelete(id) } />
            <Button title=" Edit " onPress={() => props.onEdit(id, date, montant, lieu, categorie, photoFact, commentaire) } />
        </View>
    )
}