import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  headerLeft: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    width: '20%',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#fff',
  },
  buttonHeader: {
    backgroundColor: 'blue',
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbuttonHeader: {
    fontSize: 13,
    color: '#fff',
  },
  line: {
    marginTop: 5,
    height: 2,
    backgroundColor: '#38444d',
  },
  bodyContainer: {
    height: '85%',
    paddingTop: 10,
  },
  bodyheader: {
    flexDirection: 'row',
    height: 60,
    paddingLeft: 5,
  },
  bodyheaderLeft: {
    flexDirection: 'row',
    width: 60,
    height: '100%',
    alignItems: 'center',
  },
  bodyheaderRight: {
    justifyContent: 'center',
  },
  wrap: {
    resizeMode: 'cover',
    width: '70%',
    height: '70%',
    borderRadius: 100,
  },
  name: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
  bodyBody: { flex: 1 },
  bodyStatus: {
    height: '30%',
  },
  uploadImg: {
    height: 300,
    alignItems: 'center',
  },
  imgStatus: {
    flex: 1,
    resizeMode: 'contain',
  },
  textInput: {
    height: '100%',
    textAlign: 'center',
    color: 'white',
  },
  bottomContainer: {
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clearImageButtonContainer: {
    width: '100%',
    height: '100%',
  },
  clearImageButtonText: {
    position: 'absolute',
    top: '10%',
    right: 8,
    width: 25,
    height: 25,
    color: 'rgba(248, 248, 248, 0.75)',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
