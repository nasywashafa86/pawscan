

















let model;

const classLabels = [
  'Abyssinian', 'Bengal', 'Bombay', 'Birman', 'British Shorthair',
  'Egyptian Mau', 'Maine Coon', 'Persian', 'Ragdoll',
  'Russian Blue', 'Siamese', 'Sphynx'
];

async function loadModel() {
  model = await tf.loadLayersModel('model/model.json');
  console.log('Model berhasil dimuat!');
}

function displayResult(prediction) {
  const maxProb = Math.max(...prediction);
  const maxIndex = prediction.indexOf(maxProb);
  const predictedClass = classLabels[maxIndex];

  document.getElementById('result').innerText = 
    `Prediksi: ${predictedClass} (${(maxProb * 100).toFixed(2)}%)`;

  let resultHTML = '<h3>Skor Setiap Kelas:</h3><ul style="list-style:none; padding:0;">';
  for (let i = 0; i < prediction.length; i++) {
    const percent = (prediction[i] * 100).toFixed(2);
    resultHTML += `
      <li style="margin-bottom:10px;">
        <strong>${classLabels[i]}</strong><br>
        <progress value="${prediction[i]}" max="1" style="width:80%;"></progress> ${percent}%
      </li>
    `;
  }
  resultHTML += '</ul>';
  document.getElementById('resultSlider').innerHTML = resultHTML;
}

