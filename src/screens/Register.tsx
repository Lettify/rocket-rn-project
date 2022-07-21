import { Alert } from 'react-native';
import { useState } from 'react';
import { VStack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Erro ao registrar solicitação', 'Informe o n° de patrimônio e a descrição do problema');
    }

    setIsLoading(true)

    firestore()
    .collection('orders')
    .add({
      patrimony, description, status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
      navigation.goBack();
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false)
      Alert.alert('Erro ao registrar', 'Não foi possível criar a solicitação')
    })
  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Nova solicitação' />

      <Input
        placeholder='Número do patrimônio'
        mt={4}
        keyboardType='number-pad'

        onChangeText={setPatrimony}
      />

      <Input
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
        
        onChangeText={setDescription}
      />

      <Button
        title='Criar solicitação' mt={5}
        isLoading={isLoading}

        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}