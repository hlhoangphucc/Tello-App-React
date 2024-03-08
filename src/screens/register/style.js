import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  top: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(111, 111, 111, 1)',
    fontSize: 24,
    fontWeight: '400',
    borderRadius: 20,
    paddingLeft: 40,
    marginTop: 10,
    backgroundColor: 'rgba(253, 253, 253, 0.2)',
    opacity: 0.8,
    shadowColor: '#A0A0A0',
    shadowOpacity: 1,
    elevation: 5,
    color: 'white',
  },
  button_login: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 30,
    width: '30%',
  },
  button_register: {
    backgroundColor: '#268FD3',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    width: '45%',
    marginTop: 30,
  },
  text_login: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  text_register: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  phone: {
    width: 120,
    height: 120,
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  check: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
export default styles;
