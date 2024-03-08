import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  bodyContainer: {
    height: 250,
    backgroundColor: '#272c38',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  bodyTop: {
    height: '70%',
    flexDirection: 'row',
  },
  bodyLeft: {
    width: '30%',
  },
  bodyRight: {
    flex: 1,
    top: 15,
  },
  avtUser: {
    top: 10,
    height: '100%',
    alignItems: 'center',
  },
  avt: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  wrapAvt: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  bodyBottom: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  contentBottom: {
    width: '30%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007FFF',
  },
  textInput: {
    color: 'white',
    fontSize: 15,
  },
  textInputBody: {
    flex: 1,
  },
  radioContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 50,
  },
  textOption: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  saveText: { color: 'white', fontSize: 20, fontWeight: '500' },
  iconsBackContainer: {
    top: 5,
    left: 10,
  },
  textContent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  contentBody: {
    padding: 10,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineBody: {
    height: 2,
    backgroundColor: '#38444d',
  },
});

export default styles;
