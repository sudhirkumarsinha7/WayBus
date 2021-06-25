import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Platform } from 'react-native';
import Colors from '../../theme/colors'
import Fonts from '../../theme/fonts'
import Images from '../../theme/images'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from 'react-native-modal'
/** 
        *  This class return filter modal with list.
     */
export default class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedValue: "",
        }
    }

    componentDidMount() {
        const { data, selectedValue } = this.props
        this.setState({ data, selectedValue: selectedValue })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { selectedValue, data } = this.props
        if(selectedValue != nextProps.selectedValue){
            this.setState({ selectedValue: nextProps.selectedValue })
        }
        if(nextProps.data && data != nextProps.data.length && data != nextProps.data.length) {
            this.setState({ data: nextProps.data })
        }
    }
/** 
        *  This function used for select the value among the list.
     */
    onSelectValue(item) {
        const { closeModal, onSelectValue } = this.props
        onSelectValue(item)
        closeModal()                                             
    }
/** 
        *  This function used for clear the selected value among the list.
     */
    onClearPressed() {
        const { clearPressed, closeModal} = this.props
        clearPressed()
        closeModal()                                             
    }
/** 
        *  This function used for close the modal.
     */
    closeButtonPressed(){
        const { closeModal, selectedValue, } = this.props
        this.setState({ selectedValue: selectedValue })
        closeModal()
    }
/** 
        *  This function return the list in the modal.
     */
    renderListItem = ({ item, index }) => {
        const { selectedValue } = this.state
        const { idKey, key, listTestID, appendName } = this.props

        let listTitle = styles.listTitleUnselected
        let listContent = (index !== 0) ? styles.listContentUnselected : [styles.listContentUnselected,{borderTopWidth: 1}]
        if(selectedValue[idKey] === item[idKey]) {
            listTitle = styles.listContent =  styles.listTitleSelected
            listContent =  styles.listContentSelected
        }
        item.index = index
        return (
            <TouchableOpacity key={index} testID={listTestID} accessibilityLabel={listTestID} nativeID={listTestID}  style={listContent} onPress={() => this.onSelectValue(item)}>
                <Text numberOfLines={1} style={listTitle}>{(appendName) ? `${item[idKey]} (${item.firstname})` : item[idKey]}</Text>
                {
                    (selectedValue[idKey] === item[idKey]) &&
                        <Image source={Images.rightTickIcon} style={styles.checkIcon} resizeMode={"contain"}/>
                }
            </TouchableOpacity>
        )
    }

    render() {
        const { title, visible, idKey, closeTestID} = this.props
        const { data } = this.state
        return (
            <Modal
            style={{ margin: 0,}}
            isVisible={visible}
            >
                <View style={styles.container}>
                    <TouchableOpacity testID={closeTestID} accessibilityLabel={closeTestID} nativeID={closeTestID}  style={styles.closeButton} onPress={() => this.closeButtonPressed()} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                        <Image source={Images.closeIcon} style={styles.closeIcon} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.title}>{'Select'}</Text>
                         <FlatList
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => `${index.toString()}`}
                            contentContainerStyle={styles.flatListContainer}
                            data={data}
                            renderItem={this.renderListItem}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}
export  class FilterModal1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedValue: "",
        }
    }

    componentDidMount() {
        const { data, selectedValue } = this.props
        this.setState({ data, selectedValue: selectedValue })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { selectedValue, data } = this.props
        if(selectedValue != nextProps.selectedValue){
            this.setState({ selectedValue: nextProps.selectedValue })
        }
        if(nextProps.data && data != nextProps.data.length && data != nextProps.data.length) {
            this.setState({ data: nextProps.data })
        }
    }
/** 
        *  This function used for select the value among the list.
     */
    onSelectValue(item) {
        const { closeModal, onSelectValue } = this.props
        onSelectValue(item)
        closeModal()                                             
    }
/** 
        *  This function used for clear the selected value among the list.
     */
    onClearPressed() {
        const { clearPressed, closeModal} = this.props
        clearPressed()
        closeModal()                                             
    }
/** 
        *  This function used for close the modal.
     */
    closeButtonPressed(){
        const { closeModal, selectedValue, } = this.props
        this.setState({ selectedValue: selectedValue })
        closeModal()
    }
/** 
        *  This function return the list in the modal.
     */
    renderListItem = ({ item, index }) => {
        const { selectedValue } = this.state
        const { idKey, key, listTestID, appendName } = this.props

        let listTitle = styles.listTitleUnselected
        let listContent = (index !== 0) ? styles.listContentUnselected : [styles.listContentUnselected,{borderTopWidth: 1}]
        if(selectedValue[idKey] === item[idKey]) {
            listTitle = styles.listContent =  styles.listTitleSelected
            listContent =  styles.listContentSelected
        }
        item.index = index
        return (
            <TouchableOpacity key={index} testID={listTestID} accessibilityLabel={listTestID} nativeID={listTestID}  style={listContent} onPress={() => this.onSelectValue(item)}>
                <Text numberOfLines={1} style={listTitle}>{(appendName) ? `${item[idKey]} (${item.firstname})` : item[idKey]}</Text>
                {
                    (selectedValue[idKey] === item[idKey]) &&
                        <Image source={Images.rightTickIcon} style={styles.checkIcon} resizeMode={"contain"}/>
                }
            </TouchableOpacity>
        )
    }

    render() {
        const { title, visible, idKey, closeTestID} = this.props
        const { data } = this.state
        return (
            <Modal
            style={{ margin: 0,}}
            isVisible={visible}
            >
                <View style={styles.container}>
                    {/* <TouchableOpacity testID={closeTestID} accessibilityLabel={closeTestID} nativeID={closeTestID}  style={styles.closeButton} onPress={() => this.closeButtonPressed()} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                        <Image source={Images.closeIcon} style={styles.closeIcon} resizeMode={'contain'} />
                    </TouchableOpacity> */}
                    <View style={styles.content}>
                    <TouchableOpacity testID={closeTestID} accessibilityLabel={closeTestID} nativeID={closeTestID}  style={styles.closeButton} onPress={() => this.closeButtonPressed()} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                        <Image source={Images.closeIcon} style={styles.closeIcon} resizeMode={'contain'} />
                    </TouchableOpacity>
                        <Text style={styles.title}>{'Select'}</Text>
                         <FlatList
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => `${index.toString()}`}
                            contentContainerStyle={styles.flatListContainer}
                            data={data}
                            renderItem={this.renderListItem}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(24/375*100),
    },
    closeButton: {
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 15 : 0,
        right: 0,
        paddingVertical: wp(24/375*100),
        paddingHorizontal: wp(16/375*100)
    },
    closeIcon: {
        height: wp(20/375*100),
        width: wp(20/375*100)
    },
    content: {
        marginVertical:hp(15),
        backgroundColor: Colors.whiteFF,
        width: "100%",
        paddingHorizontal: wp(4),
        paddingTop: hp(3.8),
        paddingBottom: hp(2.248),
        borderRadius: 3
    },
    title: {
        // fontFamily: Fonts.type.light,
        fontSize: Fonts.size.font22,
        color: Colors.black36,
        marginBottom: hp(2.998)
    },
    flatListContainer: {
        borderColor: Colors.whiteFF,
        borderTopWidth: 1
    },
    listContentUnselected: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.greyE8,
        height: hp(5.547),
        justifyContent: 'center'
    },
    listContentSelected: {
        borderBottomWidth: 1,
        borderColor: Colors.whiteFF,
        backgroundColor: Colors.blueTheme, 
        height: hp(5.547),
        width:'100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    listTitleSelected: {
        fontSize: Fonts.size.font16,
        // fontFamily: Fonts.type.bold,
        color: Colors.whiteFF,
        marginLeft: wp(4.266),
    },
    listTitleUnselected: {
        fontSize: Fonts.size.font16,
        // fontFamily: Fonts.type.regular,
        color: Colors.black34,
        marginHorizontal: wp(4.266)
    },
    okButton: {
        marginTop: hp(6.146),
        paddingHorizontal: wp(1.333)
    },
    checkIcon: {
        height: wp(5.4),
        width: wp(5.4),
        marginRight: wp(4.266),
    }
})