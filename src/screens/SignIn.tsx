import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    function handleSignIn() {
        if (!email || !password) {
            return Alert.alert('Erro ao entrar', 'Informe e-mail e senha');
        }

        setIsLoading(true)

        auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)

            if (err.code === 'auth/invalid-email') {
                return Alert.alert('Erro ao entrar', 'E-mail inválido.');
            }

            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                return Alert.alert('Erro ao entrar', 'E-mail ou senha incorretos.');
            }

            return Alert.alert('Erro ao entrar', 'Não foi possível acessar.');
        })
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder='E-mail'
                mb={4}
                InputLeftElement={<Icon as={ <Envelope color={colors.gray[300]} /> } ml={4} />}

                onChangeText={setEmail}
            />
            <Input
                mb={8}
                placeholder='Senha'
                InputLeftElement={<Icon as={ <Key color={colors.gray[300]} /> } ml={4} />}
                secureTextEntry

                onChangeText={setPassword}
            />

            <Button
            title='Entrar'
            w='full'
            isLoading={isLoading}
            
            onPress={handleSignIn}
            />

        </VStack>
    );
}