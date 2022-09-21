/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';


const ListScreen = ({ navigation }) => {

    const url = "https://api.citybik.es";

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        fetchData();
    }, []);

    const fetchData = async () => {
        const resp = await fetch(url + "/v2/networks");
        const data = await resp.json();
        setData(data.networks);
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', {
                endlink: item.href,
                cityName: item.location.city,
                bikeName: item.name
            })}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>City: {item.location.city}</Text>
                    <Text style={{ fontSize: 14 }}>Bike: {item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ?
                (<ActivityIndicator
                    size={'large'}
                    color={"#000"}
                    style={styles.loaderStyle} />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{
                            marginHorizontal: 10,
                            height: 0.5,
                            opacity: 0.5,
                            backgroundColor: "#c4c4c4"
                        }}
                        />}
                    />
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loaderStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default ListScreen;
