import { fetchWeatherData } from './src/services/weatherApi.js';

async function runTests() {
  console.log('--- TEST 1: Valid City (Tokyo) ---');
  try {
    const data = await fetchWeatherData('Tokyo');
    console.log('City:', data.city);
    console.log('Temperature:', data.temperature + '°C');
    console.log('Condition:', data.condition);
    console.log('Humidity:', data.humidity + '%');
    console.log('Wind Speed:', data.windSpeed);
    console.log('5-Day Forecast Days:', data.forecastList.map(f => `${f.day}: ${f.tempHigh}/${f.tempLow} (${f.condition})`).join(', '));
  } catch (err) {
    console.error('Test 1 failed:', err.message);
  }

  console.log('\n--- TEST 2: Invalid City (XYZFakeCity123) ---');
  try {
    await fetchWeatherData('XYZFakeCity123');
  } catch (err) {
    console.log('Expected error caught:', err.message);
  }

  console.log('\n--- TEST 3: Empty City Search ---');
  try {
    await fetchWeatherData('   ');
  } catch (err) {
    console.log('Expected error caught:', err.message);
  }
}

runTests();
