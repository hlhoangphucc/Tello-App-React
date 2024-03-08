import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 5,
  },
  buttonSize: {
    width: '20%',
  },
  textHeader: {
    color: '#fff',
  },
  buttonHeader: {
    backgroundColor: 'rgba(30, 151, 253, 0.8)',
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
    flex: 1,
  },

  bodyBody: { flex: 1 },

  imgStatus: {
    width: '100%',
    height: '95%',
    resizeMode: 'contain',
  },

  bottomContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
