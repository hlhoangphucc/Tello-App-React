import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  headerContainer: {
    height: 350,
  },
  backgroundUser: {
    height: '65%',
  },
  avtUser: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avt: {
    top: '50%',
    left: '20%',
    transform: [{ translateX: -75 }, { translateY: -90 }],
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    top: 20,
    left: '20%',
    transform: [{ translateX: -75 }, { translateY: -50 }],
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
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
  contentContainer: {
    height: '60%',
  },
  iconsContainer: {
    right: 25,
  },
  iconsBackContainer: {
    flexDirection: 'row',
    height: 50,
    left: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  namePage: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    height: 40,
    width: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  line: {
    height: 1,
    marginTop: 25,
    backgroundColor: '#38444d',
  },
});
export default styles;
