import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import * as scale from 'd3-scale';

const Tab = createBottomTabNavigator();
function HomeScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Bem vindo ao ExpenseTrack!</Text>
        </View>
    );
}

function ExpensesScreen() {
    const ExpenseScreen = () => {
        const [amount, setAmount] = useState('');
        const [description, setDescription] = useState('');
        const [category, setCategory] = useState('Alimentação');
        const [date, setDate] = useState(new Date());
        const [showDatePicker, setShowDatePicker] = useState(false);

        const handleSubmit = () => {
            // Adicione lógica para salvar a despesa
            console.log(`Despesa: ${description}, Categoria: ${category}, Valor: $${amount}, Data: ${date.toISOString()}`);

            // Limpar campos após o envio
            setAmount('');
            setDescription('');
            setCategory('Alimentação');
            setDate(new Date());
        };

        const showDatepicker = () => {
            setShowDatePicker(true);
        };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registrar despesa</Text>
                <TextInputMask
                    style={styles.input}
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                    }}
                    value={amount}
                    onChangeText={text => {
                        setAmount(text);
                    }}
                    placeholder="Valor"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descrição"
                />
                <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                    prompt={"Escolha uma opção"}
                >
                    <Picker.Item label="Alimentação" value="Alimentação" />
                    <Picker.Item label="Transporte" value="Transporte" />
                    <Picker.Item label="Lazer" value="Lazer" />
                    <Picker.Item label="Saúde" value="Saúde" />
                    <Picker.Item label="Outros" value="Outros" />
                </Picker>
                <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                    <Text>{`Data: ${format(date, 'dd/MM/yyyy')}`}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        locale={ptBR}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setShowDatePicker(Platform.OS === 'ios');
                            setDate(currentDate);
                        }}
                    />
                )}
                <Button title="Salvar Despesa" onPress={handleSubmit} />
            </View>
        );
    };
    return <ExpenseScreen />;
}

function Orcamentos() {
    const BudgetsScreen = () => {
        const [foodBudget, setFoodBudget] = useState('');
        const [transportBudget, setTransportBudget] = useState('');
        // Adicione mais estados de orçamento para outras categorias de despesas

        const handleSaveBudgets = () => {
            // Adicione lógica para salvar os orçamentos
            console.log(`Orçamento de Alimentação: $${foodBudget}`);
            console.log(`Orçamento de Transporte: $${transportBudget}`);
            // Adicione lógica para salvar os outros orçamentos

            // Limpar campos após o envio
            setFoodBudget('');
            setTransportBudget('');
            // Limpar os outros campos de orçamento
        };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Definir Orçamentos Mensais</Text>
                <TextInputMask
                    style={styles.input}
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                    }}
                    value={foodBudget}
                    onChangeText={text => {
                        setFoodBudget(text);
                    }}
                    placeholder="Orçamento de Alimentação"
                    keyboardType="numeric"
                />
                <TextInputMask
                    style={styles.input}
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                    }}
                    value={transportBudget}
                    onChangeText={text => {
                        setTransportBudget(text);
                    }}
                    placeholder="Orçamento de Transporte"
                    keyboardType="numeric"
                />
                <Button title="Salvar Orçamentos" onPress={handleSaveBudgets} />
            </View>
        );
    };
    return <BudgetsScreen />;
}

function Resumo() {
    // Dados de exemplo para despesas e orçamentos
    const expensesData = [50, 70, 90, 60, 80]; // Dados de despesas para cada categoria
    const budgetData = [100, 100, 100, 100, 100]; // Dados de orçamento para cada categoria
    const data = [
        { value: 50, label: 'Jan' },
        { value: 70, label: 'Fev' },
        { value: 90, label: 'Mar' },
        { value: 60, label: 'Abr' },
        { value: 80, label: 'Mai' },
    ]; // Dados de despesas com datas

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumo</Text>
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={expensesData}
                    gridMin={0}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={{ top: 30, bottom: 30 }}
                >
                    <Grid />
                </BarChart>
                <BarChart
                    style={{ flex: 1 }}
                    data={budgetData}
                    gridMin={0}
                    svg={{ fill: 'rgba(34, 128, 176, 0.8)' }}
                    contentInset={{ top: 30, bottom: 30 }}
                >
                    <Grid />
                </BarChart>
            </View>
            <XAxis
                style={{ marginHorizontal: -10, marginTop: 10 }}
                data={data}
                scale={scale.scaleBand}
                formatLabel={(value, index) => data[index].label}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: 'black' }}
            />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Início') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Despesas') {
                            iconName = focused ? 'cash' : 'cash-outline';
                        } else if (route.name === 'Orçamentos') {
                            iconName = focused ? 'options' : 'options-outline';
                        } else if (route.name === 'Resumo') {
                            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Início" component={HomeScreen} />
                <Tab.Screen name="Despesas" component={ExpensesScreen} />
                <Tab.Screen name="Orçamentos" component={Orcamentos} />
                <Tab.Screen name="Resumo" component={Resumo} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    texto: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        marginBottom: 10,
    },
    datePicker: {
        padding: 10,
        marginBottom: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
    },
});
