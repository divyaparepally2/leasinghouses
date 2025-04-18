import React, { useState } from 'react';
import styles from './loginStyles.module.css';

function DigitalSign() {
  const [name, setName] = useState('');
  const [signature, setSignature] = useState('');

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    generateSignature(newName);
  };

  const generateSignature = (userName) => {
     // Basic signature generation: capitalize and add a stylized suffix
    const formattedSignature = userName;
    setSignature(formattedSignature);
  };

  return (
    <div>
      <label htmlFor="nameInput">Enter your Name:</label>
      <input
        type="text"
        id="nameInput"
        value={name}
        onChange={handleNameChange}
      />

      {signature && (
        <div>
          <p>Digitally Signed:</p>
          <p className={styles.sign}>{signature}</p>
        </div>
      )}
    </div>
  );
}

export default DigitalSign;


// import React, { useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';

// function SignaturePad({ name }) {
//   const sigCanvas = useRef({});

//   const handleClear = () => {
//     sigCanvas.current.clear();
//   };

//   const handleSave = () => {
//     const signatureDataUrl = sigCanvas.current.toDataURL();
//     // Process the signature data URL (e.g., save to server, display, etc.)
//     console.log(signatureDataUrl);
//   };

//   return (
//     <div>
//       <h2>{name}'s Signature</h2>
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor='black'
//         canvasProps={{ width: 500, height: 200, className: 'sigCanvas', style: { border: '1px solid black' } }}
//       />
//       <button onClick={handleClear}>Clear</button>
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// }

// function DigitalSign() {
//     const people = ["Alice", "Bob", "Charlie"];

//     return (
//         <div>
//             {people.map((person) => (
//                 <SignaturePad key={person} name={person} />
//             ))}
//         </div>
//     );
// }

// export default DigitalSign;