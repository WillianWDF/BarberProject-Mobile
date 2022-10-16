import React, { useEffect, useContext } from "react";
import { Text } from "react-native";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";
import BarberLogo from "../../../src/assets/barber.svg";
import { UserContext } from '../../contexts/UserContext';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async() => {
            const token = await AsyncStorage.getItem('token');
            if(token){
                //validação de usuário.               
                let res = await Api.checkToken(token);
                if(res.token){
                    await AsyncStorage.setItem('token', res.token)
                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    });
                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });



                }else{
                    navigation.navigate('SignIn');
                }


            }else{
                //Encaminhar o usuário para a página de Login (SignIn).
                navigation.navigate('SignIn');
            }

        }
        checkToken();

    }, [ ] );



    return(
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}