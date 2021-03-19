import { getApiLink } from '../../utils';
export const validations = [
  //Postcode
  async (value = '', setInputStatus = () => { }) => {
    let res = await fetch(`https://postcodes.io/postcodes/${value}`)
      .then(res => res.json());

    if (res.error) {
      return setInputStatus({ isValid: false, isError: true, errorMessage: res.error });
    }

    if (res.result.country === 'England') {
      res = await fetch(getApiLink(`user/postcode/${value}`))
        .then(res => res.json());

      if (res.data.free) {
        return setInputStatus({
          isError: false,
          errorMessage: '',
          isValid: true
        });
      } else {
        return setInputStatus({
          isError: true,
          errorMessage: `Postcode ${value} has been already registered.`,
          isValid: false
        });
      }
    } else {
      return setInputStatus({
        isError: true,
        errorMessage: `Sorry, at the moment we don't support ${res.result.country}.`,
        isValid: false
      });
    }
  },
  //Land size
  (value = '', setInputStatus = () => { }) => {
    if (value.length) {
      return setInputStatus({
        isError: false,
        errorMessage: '',
        isValid: true
      });
    } else {
      return setInputStatus({
        isError: true,
        errorMessage: `Please select land size.`,
        isValid: false
      });
    }
  },
  //Land use
  (value = '', setInputStatus = () => { }) => {
    console.log('value: ', value);
    if (value.length) {
      console.log('value: ', true);
      return setInputStatus({
        isError: false,
        errorMessage: '',
        isValid: true
      });
    } else {
      console.log('value: ', false);
      return setInputStatus({
        isError: true,
        errorMessage: `Please select land use.`,
        isValid: false
      });
    }
  },
  //Email
  (value = '', setInputStatus = () => { }) => {
    if (/\S+@\S+\.\S+/.test(value)) {
      return setInputStatus({
        isError: false,
        errorMessage: '',
        isValid: true
      });
    } else {
      return setInputStatus({
        isError: true,
        errorMessage: `Incorrect email format.`,
        isValid: false
      });
    }
  }
]