import React from "react";

const License = () => {
  const generateLicenseText = () => {
    // Replace "YourCompany" with your actual company name
    const companyName = "TrafficPilot";
    // Generate a unique license ID (you might have your own logic for this)
    const licenseId = generateUniqueLicenseId();
    // Construct the license text with the company name and license ID
    const licenseText = `
      License Agreement

      This license is issued to ${companyName} for the use of TrafficPilot software.

      License ID: ${licenseId}

      Terms and Conditions:
      1. The software provided under this license is for the exclusive use of ${companyName}.
      2. Redistribution or resale of the software is strictly prohibited.
      3. Any modifications to the software must be approved by ${companyName}.

      By downloading and using the software, you agree to abide by the terms and conditions outlined in this license agreement.
    `;
    return licenseText;
  };

  const generateUniqueLicenseId = () => {
    // Generate a unique identifier for the license ID
    // This can be implemented according to your specific requirements
    // For simplicity, let's generate a random alphanumeric ID here
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8;
    let licenseId = "";
    for (let i = 0; i < length; i++) {
      licenseId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return licenseId;
  };

  const downloadLicense = () => {
    const licenseText = generateLicenseText();
    const element = document.createElement("a");
    const file = new Blob([licenseText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "license.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  return (
    <div style={{ height: "40vh", padding: "0 3rem" }}>
      <h2>License Agreement</h2>
      <hr />
      <p>This license is for the use of TrafficPilot software.</p>
      <button onClick={downloadLicense}>Download License</button>
    </div>
  );
};

export default License;
