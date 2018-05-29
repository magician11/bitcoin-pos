const magicNumber = 11;
const coreStyles = {
  paper: {
    padding: magicNumber * 2,
    margin: magicNumber
  },
  centerChilden: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  main: {
    marginTop: magicNumber
  },
  input: {
    fontSize: magicNumber * 3
  },
  smallFontSize: {
    fontSize: magicNumber + 1
  },
  inputLabel: {
    fontSize: magicNumber * 2
  },
  logo: {
    width: magicNumber * 4,
    marginRight: magicNumber
  },
  loader: {
    fontSize: magicNumber * 3,
    margin: magicNumber * 2
  },
  button: {
    marginTop: magicNumber
  },
  footer: {
    marginBottom: magicNumber
  }
};

module.exports = { coreStyles };
