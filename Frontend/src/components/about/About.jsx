import { Link } from "react-router-dom";

function About() {
  return (
    <div className="start-page">
      <div className="left-side">
        <h2>Welcome to our barcode scanning service!</h2>
        <br />
        <p className="text" id="text">
          Barcode technology is an essential part of the modern supply chain and
          is used in a wide variety of industries. Barcodes are a series of
          parallel lines of varying widths that are used to encode information
          about a product or service. They are typically scanned using a barcode
          reader or a smartphone camera, and the information encoded in the
          barcode can be used to track and manage inventory, identify products,
          and facilitate transactions.
        </p>
        <br />
        <p className="text" id="text">
          Barcodes are an important tool for businesses because they help to
          streamline and automate many of the processes involved in managing
          inventory and supply chain operations. They allow businesses to
          accurately and efficiently track the movement of goods and materials,
          reduce the risk of errors, and improve the overall efficiency of their
          operations.
        </p>
        <br />
        <p className="text" id="text">
          In addition to their practical uses, barcodes also play a critical
          role in consumer safety. Barcodes can be used to track the origin and
          movement of products, allowing businesses to quickly identify and
          recall any products that may be defective or unsafe. This helps to
          ensure that the products that reach consumers are of the highest
          quality and do not pose a risk to public health.
        </p>
        <p className="text" id="text">
          Overall, barcode technology is an important part of the modern
          business world and plays a vital role in the efficient functioning of
          the global supply chain. Its widespread adoption has greatly improved
          the accuracy and efficiency of many business processes and has helped
          to improve the safety and quality of products for consumers.
        </p>
      </div>
      <div className="right-side">
        <object data="About-page.svg" width="500" height="500"></object>
      </div>
    </div>
  );
}

export default About;
