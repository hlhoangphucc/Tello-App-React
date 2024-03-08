import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  headerContainer: {
    height: 200,
  },
  bodyContainer: {
    height: '40%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#272c38',
    borderRadius: 20,
  },
  backgroundUser: {
    height: '95%',
  },
  avtUser: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avt: {
    transform: [{ translateX: -150 }, { translateY: -70 }],
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#272c38',
  },
  nameContainer: {
    height: 45,

    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    transform: [{ translateX: 20 }, { translateY: -100 }],
    color: 'white',
    fontSize: 25,
    fontWeight: '400',
    width: '50%',
  },
  textInput: {
    height: '100%',
    backgroundColor: 'red',
  },
  wrapBG: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  wrapAvt: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  contentBody: {
    height: 60,
    padding: 20,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  textContent: {
    marginLeft: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  editContainer: {
    height: '30%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  contentEdit: {
    height: '100%',
    width: '50%',
    padding: 10,
    borderWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  lineBody: {
    height: 2,
    backgroundColor: '#38444d',
  },
  iconsBackContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  radioContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    width: '30%',
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    borderColor: 'black',
  },
  radioButtonSelected: {
    backgroundColor: '#007FFF',
  },
  textOption: {
    marginLeft: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default styles;
