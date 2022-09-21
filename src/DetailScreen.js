import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const DetailScreen = ({ route }) => {
    const { endlink, cityName, bikeName } = route.params;

    const url = "https://api.citybik.es" + endlink;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        fetchData();
    }, []);

    const fetchData = async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data.network.stations);
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 16 }}>Total Slots: {item.extra.slots}</Text>
                <Text style={{ fontSize: 16 }}>Emplty Slots: {item.empty_slots}</Text>
                <Text style={{ fontSize: 14 }}>Free Bike: {item.free_bikes}</Text>
                <Text style={{ fontSize: 14 }}>Address: {item.extra.address}</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <ActivityIndicator
                size={'large'}
                color={"#000"}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }} /> :
                <>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{cityName}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bike Name: {bikeName}</Text>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{
                            marginHorizontal: 10,
                            height: 0.5,
                            opacity: 0.5,
                            backgroundColor: "#c4c4c4"
                        }} />}
                    />
                </>
            }
        </View>
    );
};

export default DetailScreen;
