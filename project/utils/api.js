// NOTE: you need `shared secret key` from me haha :)
const ENCRYPTED_KEY = "U2FsdGVkX19QlQ6B8ajuJjy4wsxB1rcj1hg0yQoikjfyi2Sj4KM3vtoHgmqtt2Yu4xqYCs3S5fC9ZI3HOj5Dsg=="

// Decrypt the API key using AES
function decryptApiKey(secret_key) {
  const bytes = CryptoJS.AES.decrypt(ENCRYPTED_KEY, secret_key).toString(CryptoJS.enc.Utf8);
  console.log(bytes)
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Save the encrypted API key to localStorage
document.getElementById('save-api-key-btn').addEventListener('click', () => {
  const secret_key = document.getElementById('api-key-input').value.trim();
  if (secret_key) {
    console.log('secret key input:', secret_key);

    const api_key = decryptApiKey(secret_key);

    console.log(localStorage.getItem("API_KEY"));

    localStorage.setItem("API_KEY", api_key);
    console.log('api key recovered', localStorage.getItem("API_KEY"));

    alert('API key registered successfully!');
    alert('Now you can use all the features');
  } else {
    alert('Please enter a valid API key.');
  }
});
