import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rocket } from 'lucide-react-native';

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Rocket size={100} color="#6C63FF" />
            <Text style={styles.title}>Bem-vindo à VibeTech</Text>
            <Text style={styles.subtitle}>O futuro do e-commerce para a Geração Z.</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default OnboardingScreen;
