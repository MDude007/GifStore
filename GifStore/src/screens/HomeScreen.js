import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import GifComponent from "../components/GifComponent";
import { GIPHY_API_KEY } from "../constants";
import { MasonryFlashList } from "@shopify/flash-list";
import { ThemeContext } from "../../App";
import ThemeChanger from "../components/ThemeChanger";

const HomeScreen = () => {

    const [loading, setLoading] = useState(false);
    const [gifData, setGifData] = useState([]);
    const [colHeight1, setColHeight1] = useState(0);
    const [colHeight2, setColHeight2] = useState(0);
    const [offset, setOffset] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [searchGifs, setSearchGifs] = useState(false);

    const { theme } = useContext(ThemeContext);

    const TRENDING_GIFS_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20&rating=g`;
    const SEARCH_GIFS_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchText}&limit=20&rating=g&lang=en`;

    const apiCall = async (URL) => {
        console.log(offset);
        console.log(URL);
        try {
            await fetch(URL)
                .then((resp) => resp.json())
                .then((resp) => {
                    setLoading(false);
                    addData(resp.data);
                })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const addData = (data) => {
        let height1 = colHeight1;
        let height2 = colHeight2;
        for (let i = 0; i < data.length - 1; i += 2) {
            if (height1 <= height2) {
                if ((data[i].images.original.height / data[i].images.original.width) < (data[i + 1].images.original.height / data[i + 1].images.original.width)) {
                    let temp = data[i];
                    data[i] = data[i + 1];
                    data[i + 1] = temp;
                }
            } else {
                if ((data[i].images.original.height / data[i].images.original.width) > (data[i + 1].images.original.height / data[i + 1].images.original.width)) {
                    let temp = data[i];
                    data[i] = data[i + 1];
                    data[i + 1] = temp;
                }
            }
            height1 += 200 * data[i].images.original.height / data[i].images.original.width;
            height2 += 200 * data[i + 1].images.original.height / data[i + 1].images.original.width;
        }
        setColHeight1(height1);
        setColHeight2(height2);
        if (offset == 0 || searchGifs) {
            setGifData(data);
            setSearchGifs(false);
        }
        else {
            setGifData((curr) => [...curr, ...data]);
        }
        setOffset((curr) => curr + data.length);
    }



    useEffect(() => {
        setLoading(true);
        apiCall(TRENDING_GIFS_URL);
    }, [])

    useEffect(() => {
        if (searchGifs) {
            const getData = setTimeout(() => {
                if (searchText == "") {
                    apiCall(TRENDING_GIFS_URL);
                }
                else {
                    apiCall(SEARCH_GIFS_URL);
                }
            }, 1000);

            return () => clearTimeout(getData);
        }
    }, [searchGifs])

    useEffect(() => {
        setSearchGifs(true);
    }, [searchText])

    return (
        <View style={{ flex: 1, backgroundColor: theme.primary }}>

            <View>
                <ThemeChanger />
            </View>

            <View>
                <TextInput
                    placeholderTextColor={theme.secondary + "77"}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    style={[styles.inputStyle, { color: theme.secondary }]}
                    maxLength={20}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Search GIF"
                />
            </View>
            {
                // searchText == ""
                //     ?
                //     <Text>Showing the trending GIFs</Text>
                //     :
                //     <Text>Showing the search results for "{searchText}"</Text>
            }
            {
                gifData.length != 0
                    ?
                    <MasonryFlashList
                        data={gifData}
                        keyExtractor={(item, index) => item.id + index}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <GifComponent gifItem={item} />
                        }}
                        estimatedItemSize={200}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            let url = '';
                            if (searchText == "") {
                                url = `${TRENDING_GIFS_URL}&offset=${offset}`;
                            }
                            else {
                                url = `${SEARCH_GIFS_URL}&offset=${offset}`;
                            }
                            apiCall(url);
                        }}
                    />
                    :
                    null
            }
            {
                (loading && offset == 0)
                    ?
                    <ActivityIndicator size='large' color={theme.secondary} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                    :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        borderColor: 'gray',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 25,
        marginHorizontal: 20,
        marginBottom: 20,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 16,
        borderWidth: 2
    }
})

export default HomeScreen;