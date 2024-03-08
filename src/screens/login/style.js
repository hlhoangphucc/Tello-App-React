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
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'white',
    borderColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(111, 111, 111, 1)',
    fontSize: 24,
    fontWeight: '400',
    borderRadius: 20,
    paddingHorizontal: 45,
    marginTop: 25,
    backgroundColor: 'rgba(253, 253, 253, 0.2)',
    opacity: 0.8,
    shadowColor: '#A0A0A0',
    shadowOpacity: 1,
    elevation: 5,
  },
  content_email: {
    width: '90%',
    flexDirection: 'row',
  },
  content_pass: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  visible: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginBottom: 5,
  },
  button_login: {
    backgroundColor: '#268FD3',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    width: '45%',
    marginTop: 30,
  },
  button_register: {
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
    width: 200,
    height: 200,
  },
  texttop: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
  },
  checkLogin: {
    fontSize: 16,
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
export default styles;
